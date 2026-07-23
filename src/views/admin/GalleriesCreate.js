import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import supabase from "../../configs/supabase";
import { toast } from "react-toastify";
import { Id } from "../../utils/auth/users";
import { formatCurrency } from "../../utils/formatCurrency";

const ORGZ_ID = process.env.REACT_APP_ORGZ_ID;

export default function ProductCreate() {
  const { orgzId } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: "",
    title: "",
    slug: "",
    Gallery: null,
    price: "",
    category: "",
    subcategory_id: "",
    orgz_program_id: "",
    promote_text: [],
    description: "",
  });
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
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGalleryChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, Gallery: file }));
    }
  };

  const handlePromoteTextAdd = () => {
    setFormData((prev) => ({
      ...prev,
      promote_text: [...prev.promote_text, ""],
    }));
  };

  const handlePromoteTextChange = (index, value) => {
    const updated = [...formData.promote_text];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, promote_text: updated }));
  };

  const handlePromoteTextRemove = (index) => {
    const updated = formData.promote_text.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, promote_text: updated }));
  };

  const uploadImage = async (file) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const path = `/galleries/${orgzId || ORGZ_ID}-${fileName}`;

    const { error } = await supabase.storage
      .from("backpage")
      .upload(path, file, {
        contentType: file.type,
        upsert: true,
      });
    if (error) throw error;

    const { data } = supabase.storage.from("backpage").getPublicUrl(path);
    return data.publicUrl

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.orgz_program_id || !formData.held_at) {
      toast.warn("Name, Program, and Held At are required.");
      return;
    }

    setUploading(true);
    try {
      let fileURL = null;
      if (formData.image) {
        fileURL = await uploadImage(formData.image);
      }

      const { error } = await supabase.from("orgz_galleries").insert([
        {
          orgz_id: orgzId || ORGZ_ID,
          name: formData.name,
          file_id: fileURL,
          held_at: formData.held_at,
          orgz_program_id: formData.orgz_program_id || null,
          description: formData.description,
          created_by: Id,
        },
      ]);

      if (error) throw error;
      toast.success("Gallery created successfully!");
      navigate("/admin/Galleries");

    } catch (error) {
      toast.error("Failed to create gallery: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <h6 className="text-blueGray-700 text-xl font-bold">Create New Gallery</h6>
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
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Program
                      </label>
                      <select
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        value={formData.orgz_program_id}
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
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleGalleryChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      />
                      {formData.gallery && (
                        <img
                          src={URL.createObjectURL(formData.gallery)}
                          alt="Preview"
                          className="mt-2 w-32 h-32 object-cover rounded"
                        />
                      )}
                    </div>

                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Description
                      </label>
                      <textarea
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        rows="5"
                        placeholder="Product description..."
                        value={formData.description}
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
                    {uploading ? "Creating..." : "Create Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}