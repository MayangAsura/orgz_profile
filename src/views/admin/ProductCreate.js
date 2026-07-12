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
    thumbnail: null,
    price: "",
    subcategory_id: "",
    program_id: "",
    promote_text: [],
    description: "",
  });
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
      .is("deleted_at", null);
    if (!error) setSubcategories(data);
    else toast.error("Failed to load subcategories.");
  };

  const fetchPrograms = async () => {
    const { data, error } = await supabase
      .from("orgz_programs")
      .select("id, title")
      .is("deleted_at", null);
    if (!error) setPrograms(data);
    else toast.error("Failed to load programs.");
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, thumbnail: file }));
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

  const uploadThumbnail = async (file) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const path = `/products/${orgzId || ORGZ_ID}-${fileName}`;

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
    if (!formData.title || !formData.type || !formData.price) {
      toast.warn("Title, type, and price are required.");
      return;
    }

    setUploading(true);
    try {
      let thumbnailUrl = null;
      if (formData.thumbnail) {
        thumbnailUrl = await uploadThumbnail(formData.thumbnail);
      }

      const { error } = await supabase.from("orgz_products").insert([
        {
          type: formData.type,
          title: formData.title,
          slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, "-"),
          thumbnail: thumbnailUrl,
          price: parseFloat(formData.price),
          subcategory_id: formData.subcategory_id || null,
          program_id: formData.program_id || null,
          promote_text: formData.promote_text.filter(Boolean),
          description: formData.description,
          created_by: Id,
        },
      ]);

      if (error) throw error;
      toast.success("Product created successfully!");
      navigate("/admin/products");

    } catch (error) {
      toast.error("Failed to create product: " + error.message);
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
              <h6 className="text-blueGray-700 text-xl font-bold">Create New Product</h6>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap mt-3">
                  {/* Left Column */}
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Type *
                      </label>
                      <select
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={formData.type}
                        onChange={(e) => handleInputChange("type", e.target.value)}
                        required
                      >
                        <option value="">Select type</option>
                        <option value="course">Course</option>
                        <option value="ebook">Ebook</option>
                        <option value="webinar">Webinar</option>
                        <option value="physical">Physical</option>
                      </select>
                    </div>

                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Product title"
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        required
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Slug
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Auto-generated if empty"
                        value={formData.slug}
                        onChange={(e) => handleInputChange("slug", e.target.value)}
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Price *
                      </label>
                      <input
                        type="number"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="0"
                        value={formData.price}
                        onChange={(e) => handleInputChange("price", e.target.value)}
                        required
                      />
                      {formData.price && (
                        <span className="text-xs text-blueGray-500">
                          {formatCurrency(parseFloat(formData.price), "IDR")}
                        </span>
                      )}
                    </div>

                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Subcategory
                      </label>
                      <select
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        value={formData.subcategory_id}
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
                        value={formData.program_id}
                        onChange={(e) => handleInputChange("program_id", e.target.value)}
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
                        Thumbnail
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      />
                      {formData.thumbnail && (
                        <img
                          src={URL.createObjectURL(formData.thumbnail)}
                          alt="Preview"
                          className="mt-2 w-32 h-32 object-cover rounded"
                        />
                      )}
                    </div>

                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Promote Text
                      </label>
                      {formData.promote_text.map((text, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <input
                            type="text"
                            className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                            placeholder={`Promote text ${index + 1}`}
                            value={text}
                            onChange={(e) => handlePromoteTextChange(index, e.target.value)}
                          />
                          <button
                            type="button"
                            className="ml-2 text-red-500 hover:text-red-700"
                            onClick={() => handlePromoteTextRemove(index)}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="text-lightBlue-500 hover:text-lightBlue-700 text-sm font-bold"
                        onClick={handlePromoteTextAdd}
                      >
                        + Add promote text
                      </button>
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