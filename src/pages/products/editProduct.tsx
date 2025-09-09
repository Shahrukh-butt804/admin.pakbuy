import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { useGetProductByIdQuery, useUpdateProductMutation } from "../../redux/services/productSlice";
import { UPLOADS_URL } from "../../constants/api";
import { ChevronLeft } from "lucide-react";
import Spinner from "../../components/spinner";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: pkg } = useGetProductByIdQuery(id, { skip: !id });
    const [updateProduct, { isLoading }] = useUpdateProductMutation();

    const [showValidation, setShowValidation] = useState(false);
    const [collectionImage, setCollectionImage] = useState<File | null | any>(null);
    const [form, setForm] = useState({
        name: "",
        codes: "",
        description: "",
        tax: false,
        categories: [] as string[],
        stock: "",
        products: [{ name: "", price: "", description: "", image: null as File | string | null }],
    });

    useEffect(() => {
        if (pkg?._id) {
            setForm({
                name: pkg.name || "",
                codes: pkg.codes.join(",") || "",
                description: pkg.description || "",
                tax: pkg.tax || false,
                categories: pkg.categories || [],
                stock: pkg.stock?.toString() || "",
                products:
                    pkg.products?.map((p: any) => ({
                        name: p.name || "",
                        price: p.price?.toString() || "",
                        description: p.description || "",
                        image: p.image || null, // string path from DB
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


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setCollectionImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        const isEmpty = !form.name ||
            //  !form.discountPrice || 
            !form.description || !form.stock;
        if (isEmpty) {
            setShowValidation(true);
            return;
        }


        const codes = form.codes.split(",");


        if (codes.length < Number(form.stock)) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: `Enter ${Number(form.stock) - codes.length} more codes`,
            })
        }

        
        if (codes.length > Number(form.stock)) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: `remove ${codes.length - Number(form.stock)} codes`,
            })
        }


        if (Number(form.stock) < 1) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: 'Stock should be greater than 0',
            })
        }




        formData.append("name", form.name);
        formData.append("codes", JSON.stringify(codes));
        formData.append("description", form.description);
        formData.append("stock", form.stock);

        // ✅ send product JSON *without images*
        const productsPayload = form.products.map((p) => ({
            name: p.name,
            price: p.price,
            description: p.description,
        }));
        formData.append("products", JSON.stringify(productsPayload));


        if (collectionImage) {
            formData.append("collectionImage", collectionImage);
        }


        // ✅ attach each product’s image with an indexed field name
        form.products.forEach((p, index) => {
            if (p.image instanceof File) {
                formData.append(`products[${index}][image]`, p.image);
            }
        });

        try {
            const res: any = await updateProduct({ id, body: formData });
            if (res?.data?.success) {
                Swal.fire({
                    icon: "success",
                    title: "Updated!",
                    text: res?.data?.message || "Product updated successfully.",
                });
                navigate("/products");
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops!",
                    text: res?.error?.data?.message || "Something went wrong!",
                });
            }
        } catch (error: any) {
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: error?.message || "Something went wrong!",
            });
            console.error("🚀 ~ handleSubmit ~ error:", error);
        }
    };

    return (
        <div className="md:p-4 glass text-white rounded-xl shadow-lg max-w-7xl mx-2 md:mx-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2"><ChevronLeft className='cursor-pointer w-7 h-7' onClick={() => navigate(-1)} />  Edit Product</h2>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 "
            >
                {/* Left Side */}
                <div className="flex flex-col">
                    <label className="block mb-2 text-sm font-semibold">Product Name *</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className={`w-full p-3 sm:p-4 rounded-lg bg-[#1a2236] border ${showValidation && !form.name ? "border-red-500" : "border-gray-600"
                            }`}
                    />
                    <label className="block mt-4 mb-2 text-sm font-semibold">
                        Codes <span className="text-red-500 font-bold ">* </span>{`( comma separated )`}
                    </label>
                    <input
                        type="text"
                        name="codes"
                        value={form.codes}
                        onChange={handleChange}
                        required
                        placeholder={`Enter ${form.stock || ""} Codes`}
                        className={`w-full p-4 rounded-lg bg-[#1a2236] border border-gray-600 focus:outline-none ${showValidation && !form.codes && 'border-red-500'}`}
                    />

                    {/* <div className="flex items-center mt-4">
                        <input
                            type="checkbox"
                            name="tax"
                            checked={form.tax}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        <span className="ml-2 text-sm sm:text-base">Add tax for this product</span>
                    </div> */}



                    <label className="block mt-4 mb-2 text-sm font-semibold">Collection Image</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        accept="image/*"
                        className="w-full p-4 rounded-lg bg-[#1a2236] border border-gray-600"
                    />

                    {collectionImage ? (

                        <img
                            src={URL.createObjectURL(collectionImage)}
                            alt="new-existing"
                            crossOrigin="anonymous"
                            className="h-24 w-24 rounded-lg object-cover"
                        />
                    ) : (

                        <img
                            src={UPLOADS_URL + pkg?.image}
                            alt="existing-image"
                            crossOrigin="anonymous"
                            className="h-24 w-24 rounded-lg object-cover"
                        />
                    )}


                </div>

                {/* Right Side */}
                <div className="flex flex-col">
                    <label className="block mb-2 text-sm font-semibold">Stock *</label>
                    <input
                        type="number"
                        name="stock"
                        value={form.stock}
                        onChange={handleChange}
                        required
                        className={`w-full p-3 sm:p-4 rounded-lg bg-[#1a2236] border ${showValidation && !form.stock ? "border-red-500" : "border-gray-600"
                            }`}
                    />

                    <label className="block mt-4 mb-2 text-sm font-semibold">Description *</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={4}
                        required
                        style={{ resize: "none" }}
                        className={`w-full p-3 sm:p-4 rounded-lg border ${showValidation && !form.description ? "border-red-500" : "border-gray-600"
                            }`}
                    />
                </div>

                {/* Nested Products */}
                <div className="col-span-1 md:col-span-2 mt-6">
                    <h3 className="text-lg font-bold mb-4">Products *</h3>
                    {form.products.map((product, index) => (
                        <div
                            key={index}
                            className="mb-4 p-4 border border-gray-600 rounded-lg flex flex-col gap-4"
                        >
                            <input
                                type="text"
                                name="name"
                                value={product.name}
                                onChange={(e) => handleProductChange(index, e)}
                                required
                                placeholder="Product Name"
                                className={`w-full p-3 rounded-lg border ${showValidation && !product.name ? "border-red-500" : "border-gray-500"
                                    }`}
                            />
                            <input
                                type="number"
                                name="price"
                                value={product.price}
                                onChange={(e) => handleProductChange(index, e)}
                                required
                                placeholder="Product Price"
                                className={`w-full p-3 rounded-lg border ${showValidation && !product.price ? "border-red-500" : "border-gray-500"
                                    }`}
                            />
                            <textarea
                                name="description"
                                value={product.description}
                                onChange={(e) => handleProductChange(index, e)}
                                required
                                placeholder="Product Description"
                                rows={3}
                                className={`w-full p-3 rounded-lg border ${showValidation && !product.description ? "border-red-500" : "border-gray-500"
                                    }`}
                            />

                            {/* File Upload */}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleProductImageChange(index, e)}
                                className="w-full p-3 rounded-lg border border-gray-500"
                            />

                            {/* Preview */}
                            {product.image && (
                                <>
                                    {product.image instanceof File ? (
                                        <img
                                            src={URL.createObjectURL(product.image)}
                                            alt="preview"
                                            className="h-24 w-24 rounded-lg object-cover"
                                        />
                                    ) : (
                                        <img
                                            src={UPLOADS_URL + product.image}
                                            alt="existing"
                                            crossOrigin="anonymous"
                                            className="h-24 w-24 rounded-lg object-cover"
                                        />
                                    )}
                                </>
                            )}

                            {form.products.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeProductField(index)}
                                    className="w-full sm:w-32 bgPink blackText font-semibold rounded-lg transition-colors"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}

                    <div className="flex flex-col sm:flex-row justify-between gap-4 items-center m-2">
                        <button
                            type="button"
                            onClick={addProductField}
                            className="w-full sm:w-auto px-6 py-2 bgPink blackText font-semibold rounded-lg transition-colors"
                        >
                            + Add Product
                        </button>
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="w-full sm:w-auto px-6 py-2 bgPink blackText font-semibold rounded-lg transition-colors"
                        >
                            {isLoading ? <Spinner /> : "Save Changes"}

                        </button>
                    </div>
                </div>
            </form>

        </div>
    );
};

export default EditProduct;
