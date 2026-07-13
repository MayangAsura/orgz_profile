import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import supabase from "../../configs/supabase";
import { formatCurrency } from "utils/formatCurrency";
import { toast } from "react-toastify";
import { Id } from "../../utils/auth/users";

const ORGZ_ID = process.env.REACT_APP_ORGZ_ID;

export default function FormalProgramCreate() {
  const { orgzId } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([
    {
      code: 'kids',
      name: 'Anak-Anak'
    },
    {
      code: 'teenagers',
      name: 'Remaja'
    },
    {
      code: 'public',
      name: 'Umum'
    },
    {
      code: 'akhawat',
      name: 'Muslimah'
    }
  ]);
  const [subcategories, setSubcategories] = useState([]);
  const [programs, setPrograms] = useState([]);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    thumbnail: null,
    quota: 0,
    price: 0,
    category:"",
    subcategory_id: "",
    description: "",
    submission_start: "",
    submission_end: "",
    status: "opened",
  });
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchSubcategories();
    fetchPrograms();
  }, []);

  const fetchSubcategories = async () => {
    const { data, error } = await supabase
      .from("orgz_subcategory")
      .select("id, name")
      .eq('orgz_id', ORGZ_ID || orgzId)
      .is("deleted_at", null);
    if (!error) setSubcategories(data);
    else toast.error("Failed to load subcategories.");
  };

  const fetchPrograms = async () => {
    const { data, error } = await supabase
      .from("orgz_programs")
      .select("id, title")
      .eq('organization_id', ORGZ_ID || orgzId)
      .is("deleted_at", null);
    if (!error) setPrograms(data);
    else toast.error("Failed to load programs.");
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

    if (!form.title || !form.started_at || !form.ended_at) {
      toast.warn("Name, start date, and end date are required.");
      return;
    }
    if (form.started_at > form.ended_at) {
      toast.warn("Start date cannot be after end date.");
      return;
    }

    setUploading(true);
    try {
      let imageUrl = null;
      if (form.thumbnail instanceof File) {
        imageUrl = await uploadImage(form.thumbnail);
      }

      const payload = {
        title: form.title,
        slug: form.slug || form.title.toLowerCase().replace(/\s+/g, "-"),
        thumbnail: imageUrl,
        started_at: form.started_at,
        ended_at: form.ended_at,
        status: form.status,
        quota: form.quota,
        price: parseFloat(form.price),
        subcategory_id: form.subcategory_id || null,
        orgz_program_id: form.orgz_program_id || null,
        description: form.description,
        created_by: Id,
      };

      const { error } = await supabase.from("orgz_formal_programs").insert([payload]).select();
      if (error) throw error;

      toast.success("Program created!");
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
            <h6 className="text-blueGray-700 text-xl font-bold">Create Formal Program</h6>
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

                  {/* Price */}
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Harga *
                    </label>
                    <input
                      type="number"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="0"
                      value={form.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      required
                    />
                    {form.price && (
                      <span className="text-xs text-blueGray-500">
                        {formatCurrency(parseFloat(form.price), "IDR")}
                      </span>
                    )}
                  </div>

                  {/* Quota */}
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Kuota *
                    </label>
                    <input
                      type="number"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Kuota"
                      value={form.quota}
                      onChange={(e) => handleInputChange("quota", e.target.value)}
                      required
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Kategori
                    </label>
                    <select
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      value={form.category}
                      onChange={(e) => handleInputChange("category", e.target.value)}
                    >
                      <option value="">None</option>
                      {categories.map((sub) => (
                        <option key={sub.code} value={sub.code}>
                          {sub.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Sub Kategori
                    </label>
                    <select
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      value={form.subcategory_id}
                      onChange={(e) => handleInputChange("subcategory_id", e.target.value)}
                    >
                      <option value="">None</option>
                      {subcategories.map((sub) => (
                        <option key={sub.id} value={sub.id}>
                          {sub.name}
                        </option>
                      ))}
                    </select>
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
                        value={form.started_at}
                        onChange={(e) => handleInputChange("started_at", e.target.value)}
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
                        value={form.ended_at}
                        onChange={(e) => handleInputChange("ended_at", e.target.value)}
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
                </div>
              </div>

              <hr className="mt-6 border-b-1 border-blueGray-300" />
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  disabled={uploading}
                  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                >
                  {uploading ? "Saving..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}