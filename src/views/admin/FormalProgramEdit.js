import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import supabase from "../../configs/supabase";
import { toast } from "react-toastify";
import { Id } from "../../utils/auth/users";

const ORGZ_ID = process.env.REACT_APP_ORGZ_ID;

export default function FormalProgramEdit() {
  const { orgzId } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    thumbnail: null,
    submission_start: "",
    submission_end: "",
    status: "opened",
  });
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProgram();
  }, [id]);

  const fetchProgram = async () => {
    const { data, error } = await supabase
      .from("orgz_formal_programs")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      toast.error("Failed to load program: " + error.message);
      return;
    }

    setForm({
      title: data.title,
      slug: data.slug,
      thumbnail: null,
      submission_start: data.submission_start?.split("T")[0] || "",
      submission_end: data.submission_end?.split("T")[0] || "",
      status: data.status || "opened",
    });
    setPreviewUrl(data.thumbnail || "");
  };

  const handleInputChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, thumbnail: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const path = `/formal-programs/${orgzId || ORGZ_ID}-${fileName}`;

    const { error } = await supabase.storage
      .from("backpage")
      .upload(path, file, { contentType: file.type, upsert: true });
    if (error) throw error;

    const { data } = supabase.storage.from("backpage").getPublicUrl(path);
    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.submission_start || !form.submission_end) {
      toast.warn("Name, start date, and end date are required.");
      return;
    }
    if (form.submission_start > form.submission_end) {
      toast.warn("Start date cannot be after end date.");
      return;
    }

    setUploading(true);
    try {
      let imageUrl = previewUrl;
      if (form.thumbnail instanceof File) {
        imageUrl = await uploadImage(form.thumbnail);
      }

      const payload = {
        title: form.title,
        slug: form.slug || form.title.toLowerCase().replace(/\s+/g, "-"),
        thumbnail: imageUrl,
        submission_start: form.submission_start,
        submission_end: form.submission_end,
        status: form.status,
        updated_at: new Date().toISOString(),
        updated_by: Id,
      };

      const { error } = await supabase
        .from("orgz_formal_programs")
        .update(payload)
        .eq("id", id);
      if (error) throw error;

      toast.success("Program updated!");
      navigate("/admin/formal-programs");
    } catch (error) {
      toast.error("Error: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-wrap">
      <div className="w-full px-4">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <h6 className="text-blueGray-700 text-xl font-bold">Edit Formal Program</h6>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap mt-3">
                <div className="w-full lg:w-6/12 px-4">
                  {/* Image Upload */}
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                    />
                    {previewUrl && (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="mt-2 w-40 h-32 object-cover rounded"
                      />
                    )}
                  </div>

                  {/* Name */}
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Program name"
                      value={form.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      required
                    />
                  </div>

                  {/* Slug */}
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Slug
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Auto‑generated if left empty"
                      value={form.slug}
                      onChange={(e) => handleInputChange("slug", e.target.value)}
                    />
                  </div>
                </div>

                <div className="w-full lg:w-6/12 px-4">
                  {/* Submission Date Range */}
                  <div className="flex gap-4">
                    <div className="relative w-1/2 mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Submission Start *
                      </label>
                      <input
                        type="date"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        value={form.submission_start}
                        onChange={(e) => handleInputChange("submission_start", e.target.value)}
                        required
                      />
                    </div>
                    <div className="relative w-1/2 mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Submission End *
                      </label>
                      <input
                        type="date"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        value={form.submission_end}
                        onChange={(e) => handleInputChange("submission_end", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Submission Status */}
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Submission Status
                    </label>
                    <select
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      value={form.status}
                      onChange={(e) => handleInputChange("status", e.target.value)}
                    >
                      <option value="opened">Opened</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>

                  {/* Detail Pendaftaran Button */}
                  <div className="relative w-full mb-3">
                    <button
                      type="button"
                      className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none"
                      onClick={() => navigate(`/admin/formal-programs/${id}/registrations`)}
                    >
                      Detail Pendaftaran
                    </button>
                  </div>
                </div>
              </div>

              <hr className="mt-6 border-b-1 border-blueGray-300" />
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  disabled={uploading}
                  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                >
                  {uploading ? "Saving..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}