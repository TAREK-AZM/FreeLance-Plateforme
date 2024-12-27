import { useState, useEffect } from "react";
import axios from "axios";

const FormModal = ({ isVisible, onClose, onSubmit, formData, isEdit }) => {
    const [formValues, setFormValues] = useState({ title: "", description: "", price: "", status: true });

    // Pre-fill form when editing or reset when adding
    useEffect(() => {
        if (formData) {
            console.log("Editing data:", formData); // Debugging
            setFormValues(formData);
        } else {
            console.log("Adding new service"); // Debugging
            setFormValues({ title: "", description: "", price: "", status: true });
        }
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const toggleStatus = () => {
        setFormValues((prev) => ({ ...prev, status: !prev.status }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {

                await axios.put(`${import.meta.env.VITE_API}/services/${formValues.id}`, formValues);

            } else {
                await axios.post(`${import.meta.env.VITE_API}/services`, formValues);

            }
            onClose(); // Close modal after success
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
                        <label className="block text-sm font-medium">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formValues.title}
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
                        <label className="block text-sm font-medium">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formValues.price}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex items-center">
                        <label className="text-sm font-medium mr-3">Active:</label>
                        <div
                            onClick={toggleStatus}
                            className={`relative w-10 h-5 rounded-full cursor-pointer flex items-center ${
                                formValues.status ? "bg-green-500" : "bg-gray-300"
                            }`}
                        >
                            <div
                                className={`absolute h-4 w-4 bg-white rounded-full transition-transform ${
                                    formValues.status ? "translate-x-5" : "translate-x-0"
                                }`}
                            />
                        </div>
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
