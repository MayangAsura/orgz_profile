import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import supabase from "../../configs/supabase";
import { toast } from "react-toastify";
import { Id } from "../../utils/auth/users";
import { formatCurrency } from "../../utils/formatCurrency";

const ORGZ_ID = process.env.REACT_APP_ORGZ_ID;

export default function GalleryEdit() {
  const { orgzId } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    type: "",
    title: "",
    slug: "",
    Gallery: null,           // will hold a File object if new image chosen, else null
    price: "",
    subcategory_id: "",
    orgz_program_id: "",
    promote_text: [],
    description: "",
  });

  const [previewUrl, setPreviewUrl] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Fetch Gallery data and dropdowns on mount
  useEffect(() => {
    fetchGallery();
    
  }, [id]);

  const fetchGallery = async () => {
    const { data, error } = await supabase
      .from("orgz_galleries")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      toast.error("Failed to load gallery: " + error.message);
      return;
    }

    setForm({
      name: data.name || "",
      file_id: null,                // keep null so we know no new file selected yet
      held_at: data.held_at,
      orgz_program_id: data.orgz_program_id || "",
      promote_text: data.promote_text || [],
      description: data.description || "",
    });
    setPreviewUrl(data.file_id || "");
  };

  const handleInputChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, file_id: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const path = `/galleries/${orgzId || ORGZ_ID}-${fileName}`;

    const { error } = await supabase.storage
      .from("backpage")
      .upload(path, file, { contentType: file.type, upsert: true });
    if (error) throw error;

    const { data } = supabase.storage.from("backpage").getPublicUrl(path);
    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.orgz_program_id || !form.held_at) {
      toast.warn("Name, Program, and Held At are required.");
      return;
    }

    setUploading(true);
    try {
      let fileURL = null;
      if (form.image) {
        fileURL = await uploadImage(form.image);
      }

      const { error } = await supabase.from("orgz_galleries").insert([
        {
          orgz_id: orgzId || ORGZ_ID,
          name: form.name,
          file_id: fileURL,
          held_at: form.held_at,
          orgz_program_id: form.orgz_program_id || null,
          description: form.description,
          created_by: Id,
        },
      ]);

      if (error) throw error;
      toast.success("Gallery edit successfully!");
      navigate("/admin/galleries");

    } catch (error) {
      toast.error("Failed to edit gallery: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-wrap">
      <div className="w-full px-4">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <h6 className="text-blueGray-700 text-xl font-bold">Edit Gallery</h6>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap mt-3">
                {/* Left Column */}
                <div className="w-full lg:w-6/12 px-4">

                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Nama Gallery *
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Gallery name"
                      value={form.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Held At *
                    </label>
                    <input
                      type="date"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      value={form.held_at}
                      onChange={(e) => handleInputChange("held_at", e.target.value)}
                      required
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Program
                    </label>
                    <select
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      value={form.orgz_program_id}
                      onChange={(e) => handleInputChange("orgz_program_id", e.target.value)}
                    >
                      <option value="">None</option>
                      {programs.map((prog) => (
                        <option key={prog.id} value={prog.id}>
                          {prog.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Right Column */}
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Image
                    </label>
                    {previewUrl && (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="mb-2 w-40 h-32 object-cover rounded"
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Description
                    </label>
                    <textarea
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      rows="5"
                      placeholder="Gallery description..."
                      value={form.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                    />
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