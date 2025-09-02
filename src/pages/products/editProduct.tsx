import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { useGetProductByIdQuery, useUpdateProductMutation } from "../../redux/services/productSlice";
import { UPLOADS_URL } from "../../constants/api";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: pkg } = useGetProductByIdQuery(id, { skip: !id });
    const [updateProduct] = useUpdateProductMutation();


    const [images, setImages] = useState<File[]>([]);
    const [showValidation, setShowValidation] = useState(false);
    const [form, setForm] = useState({
        name: "",
        discountPrice: "",
        description: "",
        tax: false,
        categories: [] as string[],
        stock: "",
        products: [{ name: "", price: "", description: "", image: null as File | null }],
    });


    useEffect(() => {
        if (pkg?._id) {
            setForm({
                name: pkg.name || "",
                discountPrice: pkg.discountPrice?.toString() || "",
                description: pkg.description || "",
                tax: pkg.tax || false,
                categories: pkg.categories || [],
                stock: pkg.stock?.toString() || "",
                products: pkg.products?.map((p: any) => ({
                    name: p.name || "",
                    price: p.price?.toString() || "",
                    description: p.description || "",
                    image: null, // keep empty for now, only new uploads handled
                })) || [],
            });
        }
    }, [pkg]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked }: any = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleProductChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const updatedProducts = [...form.products];
        updatedProducts[index] = { ...updatedProducts[index], [name]: value };
        setForm({ ...form, products: updatedProducts });
    };

    const handleProductImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const updatedProducts = [...form.products];
            updatedProducts[index] = { ...updatedProducts[index], image: e.target.files[0] };
            setForm({ ...form, products: updatedProducts });
            setImages([...images, e.target.files[0]]);
        }
    };

    const addProductField = () => {
        setForm({
            ...form,
            products: [...form.products, { name: "", price: "", description: "", image: null }],
        });
    };

    const removeProductField = (index: number) => {
        const updatedProducts = form.products.filter((_, i) => i !== index);
        setForm({ ...form, products: updatedProducts });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        const isEmpty = !form.name || !form.discountPrice || !form.description || !form.stock;
        if (isEmpty) {
            setShowValidation(true);
            return;
        }

        formData.append("name", form.name);
        formData.append("discountPrice", form.discountPrice);
        formData.append("description", form.description);
        formData.append("stock", form.stock);
        formData.append("tax", String(form.tax));
        formData.append("products", JSON.stringify(form.products));

        if (images.length > 0) {
            images.forEach((image) => formData.append("images", image));
        }

        try {
            const res: any = await updateProduct({ id, body: formData });
            if (res?.data?.success) {
                Swal.fire({ icon: "success", title: "Updated!", text: res?.data?.message || "Product updated successfully." });
                navigate(-1)
            } else {
                Swal.fire({ icon: "error", title: "Oops!", text: res?.error?.data?.message || "Something went wrong!" });
            }
        } catch (error: any) {
            Swal.fire({ icon: "error", title: "Update Failed", text: error?.message || "Something went wrong!" });
            console.error("🚀 ~ handleSubmit ~ error:", error);
        }
    };

    return (
        <div className="p-6 glass text-white rounded-xl shadow-lg max-w-7xl mx-12">
            <h2 className="text-2xl font-bold mb-6">Edit Product</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Side */}
                <div>
                    <label className="block mb-2 text-sm font-semibold">Product Name *</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className={`w-full p-4 rounded-lg bg-[#1a2236] border ${showValidation && !form.name ? "border-red-500" : "border-gray-600"}`}
                    />

                    <label className="block mt-4 mb-2 text-sm font-semibold">Discount Price *</label>
                    <input
                        type="number"
                        name="discountPrice"
                        value={form.discountPrice}
                        onChange={handleChange}
                        required
                        className={`w-full p-4 rounded-lg bg-[#1a2236] border ${showValidation && !form.discountPrice ? "border-red-500" : "border-gray-600"}`}
                    />

                    <div className="flex items-center mt-4">
                        <input type="checkbox" name="tax" checked={form.tax} onChange={handleChange} className="mr-2" />
                        <span className="ml-2">Add tax for this product</span>
                    </div>
                </div>

                {/* Right Side */}
                <div>
                    <label className="block mt-4 mb-2 text-sm font-semibold">Stock *</label>
                    <input
                        type="number"
                        name="stock"
                        value={form.stock}
                        onChange={handleChange}
                        required
                        className={`w-full p-4 rounded-lg bg-[#1a2236] border ${showValidation && !form.stock ? "border-red-500" : "border-gray-600"}`}
                    />

                    <label className="block mt-4 mb-2 text-sm font-semibold">Description *</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={4}
                        required
                        className={`w-full p-4 rounded-lg border ${showValidation && !form.description ? "border-red-500" : "border-gray-600"}`}
                    />
                </div>
            </form>

            {/* Nested Products */}
            <div className="mt-6">
                <h3 className="text-lg font-bold mb-4">Products *</h3>
                {form.products.map((product, index) => (
                    <div key={index} className="mb-4 p-4 border border-gray-600 rounded-lg flex flex-col gap-4">
                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={(e) => handleProductChange(index, e)}
                            required
                            placeholder="Product Name"
                            className={`w-full mb-2 p-3 rounded-lg border ${showValidation && !product.name ? "border-red-500" : "border-gray-500"}`}
                        />
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={(e) => handleProductChange(index, e)}
                            required
                            placeholder="Product Price"
                            className={`w-full mb-2 p-3 rounded-lg border ${showValidation && !product.price ? "border-red-500" : "border-gray-500"}`}
                        />
                        <textarea
                            name="description"
                            value={product.description}
                            onChange={(e) => handleProductChange(index, e)}
                            required
                            placeholder="Product Description"
                            rows={3}
                            className={`w-full p-3 rounded-lg border ${showValidation && !product.description ? "border-red-500" : "border-gray-500"}`}
                        />
                        <input type="file" accept="image/*" onChange={(e) => handleProductImageChange(index, e)} className="w-full p-3 rounded-lg border border-gray-500" />
                        {product.image ? (
                            <span className="px-2 py-1 text-xs bg-gray-700 rounded-lg">{product.image.name}</span>
                        ) : pkg?.products?.[index]?.image ? (
                            <img src={UPLOADS_URL + pkg.products[index].image} alt="image" crossOrigin="anonymous" className="h-24 w-24 rounded-lg object-cover" />
                        ) : null}
                        {form.products.length > 1 && (
                            <button type="button" onClick={() => removeProductField(index)} className="bgPink blackText font-semibold rounded-lg transition-colors">
                                Remove
                            </button>
                        )}
                    </div>
                ))}
                <div className="flex justify-between items-center m-2">
                    <button type="button" onClick={addProductField} className="bgPink blackText font-semibold rounded-lg transition-colors">
                        + Add Product
                    </button>
                    <button type="submit" onClick={handleSubmit} className="bgPink blackText font-semibold rounded-lg transition-colors">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
