import { useState, useEffect } from "react";
import axios from "axios";

const FormModal = ({ isVisible, onClose, onSubmit, formData, isEdit }) => {
    const [formValues, setFormValues] = useState({id:"", titre: "", description: "", prix: "", status: true, category: "" });
    const [categories, setCategories] = useState([]);
    const token = localStorage.getItem("token");

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API2}/api/prestataire/categories`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCategories(response.data);
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        };
        fetchCategories();
    }, []);

    // Pre-fill form when editing or reset when adding
    useEffect(() => {
        if (formData) {
            console.log("Editing data:", formData);
            setFormValues(formData);
        } else {
            console.log("Adding new service");
            setFormValues({ titre: "", description: "", prix: "", status: true, image: null, category: "" });
        }
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormValues((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    const toggleStatus = () => {
        setFormValues((prev) => ({ ...prev, status: !prev.status }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const selectedCategory = categories.find(cat => cat.id == formValues.category);
            const formDataToSend = new FormData();
            formDataToSend.append("file", formValues.image);
            formDataToSend.append("service", JSON.stringify({
                titre: formValues.titre,
                description: formValues.description,
                prix: parseFloat(formValues.prix),
                status: formValues.status,
                category: selectedCategory
            }));

            if (isEdit) {
                console.log("data sent is: ", formDataToSend)
                await axios.put(
                    `${import.meta.env.VITE_API2}/api/prestataire/service/update`,
                    formDataToSend,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );


            } else {
                console.log("data sent is: ", formDataToSend)
                await axios.post(`${import.meta.env.VITE_API2}/api/prestataire/service/add`, formDataToSend, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                });
            }
            onClose();
        } catch (err) {
            console.error("Error submitting form:", err);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative">
                <h2 className="text-2xl font-bold mb-4">{isEdit ? "Edit Service" : "Add New Service"}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Titre</label>
                        <input
                            type="text"
                            name="titre"
                            value={formValues.titre}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                            name="description"
                            value={formValues.description}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Prix</label>
                        <input
                            type="number"
                            name="prix"
                            value={formValues.prix}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Image</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleFileChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Category</label>
                        <select
                            name="category"
                            value={formValues.category}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select a category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            {isEdit ? "Update" : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormModal;
