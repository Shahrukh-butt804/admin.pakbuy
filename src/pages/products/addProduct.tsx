import React, { useState } from "react";
import { useAddProductMutation } from "../../redux/services/productSlice";
import Swal from "sweetalert2";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";
import Spinner from "../../components/spinner";
import { useGetAllCollectionsQuery } from "../../redux/services/collectionSlice";

const AddProduct = () => {
    const navigate = useNavigate();
    // const [images, setImages] = useState<File[]>([]);
    const [image, setImage] = useState<File | null>(null);
    const [showValidation, setShowValidation] = useState(false)
    const [form, setForm] = useState({
        name: "",
        codes: "",
        description: "",
        tax: false,
        categories: [] as string[],
        stock: "",
        price: "",
        products: [
            { name: "", price: "", description: "", image: null as File | null },
        ],
    });


    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const { data } = useGetAllCollectionsQuery({});
    const [addProduct, { isLoading }] = useAddProductMutation()

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type, checked }: any = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    };

    // const handleProductChange = (
    //     index: number,
    //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    // ) => {
    //     const { name, value } = e.target;
    //     const updatedProducts = [...form.products];
    //     updatedProducts[index] = { ...updatedProducts[index], [name]: value };
    //     setForm({ ...form, products: updatedProducts });
    // };

    // const handleProductImageChange = (
    //     index: number,
    //     e: React.ChangeEvent<HTMLInputElement>
    // ) => {
    //     if (e.target.files && e.target.files[0]) {
    //         const updatedProducts = [...form.products];
    //         updatedProducts[index] = {
    //             ...updatedProducts[index],
    //             image: e.target.files[0],
    //         };
    //         setForm({ ...form, products: updatedProducts });
    //         setImages([...images, e.target.files[0]]);
    //     }
    // };

    // const addProductField = () => {
    //     setForm({
    //         ...form,
    //         products: [
    //             ...form.products,
    //             { name: "", price: "", description: "", image: null },
    //         ],
    //     });
    // };

    // const removeProductField = (index: number) => {
    //     const updatedProducts = form.products.filter((_, i) => i !== index);
    //     setForm({ ...form, products: updatedProducts });
    // };


    const toggleCategory = (categoryId: string) => {
        setSelectedCategories((prev) =>
            prev.includes(categoryId)
                ? prev.filter((id) => id !== categoryId) 
                : [...prev, categoryId]
        );
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();

        const isEmpty = Object.values(form).some((value) => value === '');
        if (isEmpty) {
            setShowValidation(true)
            return;
        }

        if (selectedCategories.length < 1) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: 'Select at least one category',
            })
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


        // formData.append("tax", "true");

        formData.append("name", form.name);
        formData.append("codes", JSON.stringify(codes));
        formData.append("description", form.description);
        formData.append("stock", form.stock);
        formData.append("price", form.price);
        // formData.append("products", JSON.stringify(form.products));
        formData.append("collectionIds", JSON.stringify(selectedCategories));

        if (image) {
            formData.append("image", image);
        } else {
            return Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: 'Product Image is required',
            })
        }

        // if (images.length > 0) {
        //     images.forEach((image) => {
        //         formData.append("images", image);
        //     })
        // } else {
        //     return Swal.fire({
        //         icon: 'error',
        //         title: 'Oops!',
        //         text: 'product Image is required',
        //     })
        // }

        try {
            const res: any = await addProduct(formData)
            console.log("🚀 ~ handleSubmit ~ res:", res)
            if (res?.data?.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: res?.data?.message || 'something went wrong!',
                })
                navigate(-1)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops!',
                    text: res?.error?.data?.message || res?.error?.data?.errors[0]?.msg || 'something went wrong!',
                });
            }
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: error?.error?.data?.message || error?.message || error?.data?.message || 'something went wrong!',
            })

        }

    };


    return (
        <div className="md:p-4 glass text-white rounded-xl shadow-lg max-w-7xl mx-2 md:mx-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2"><ChevronLeft className='cursor-pointer w-7 h-7' onClick={() => navigate(-1)} />  Add Product</h2>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:mt-6"
            >
                {/* Left Side */}
                <div>
                    <label className="block mb-2 text-sm font-semibold">Product Name <span className="text-red-500 font-bold ">*</span></label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter product name"
                        className={`w-full p-4 rounded-lg bg-[#1a2236] border border-gray-600 focus:outline-none ${showValidation && !form.name && 'border-red-500'}`}
                    />

                    <label className="block mt-5 mb-2 text-sm font-semibold">
                        Codes <span className="text-red-500 font-bold ">* </span>{`( comma separated )`}
                    </label>

                    <textarea
                        name="codes"
                        value={form.codes}
                        onChange={handleChange}
                        rows={5}
                        required
                        style={{ resize: "none" }}
                        placeholder={`Enter ${form.stock || ""} Codes`}
                        className={`w-full p-4 rounded-lg border border-gray-600 focus:outline-none ${showValidation && !form.stock && 'border-red-500'}`}
                    />
                    {/* 
                    <div className="flex items-center mt-4">
                        <input
                            type="checkbox"
                            name="tax"
                            checked={form.tax}
                            onChange={handleChange}
                            className="mr-2"

                        />
                        <span className="ml-2">Add tax for this product</span>
                    </div> */}

                    <label className="block mt-1 mb-2 text-sm font-semibold">Price <span className="text-red-500 font-bold ">*</span></label>
                    <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="Enter Price"
                        required
                        className={`w-full p-4 rounded-lg bg-[#1a2236] border border-gray-600 focus:outline-none ${showValidation && !form.price && 'border-red-500'}`}
                    />


                </div>

                {/* Right Side */}
                <div>

                    <label className="block mb-3 text-sm font-semibold">Stock <span className="text-red-500 font-bold ">*</span></label>
                    <input
                        type="number"
                        name="stock"
                        value={form.stock}
                        onChange={handleChange}
                        placeholder="Enter stock quantity"
                        required
                        className={`w-full p-4 rounded-lg bg-[#1a2236] border border-gray-600 focus:outline-none ${showValidation && !form.stock && 'border-red-500'}`}
                    />

                    <label className="block mt-4 mb-2 text-sm font-semibold">
                        Description <span className="text-red-500 font-bold ">*</span>
                    </label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={5}
                        required
                        style={{ resize: "none" }}
                        placeholder="Write description..."
                        className={`w-full p-4 rounded-lg border border-gray-600 focus:outline-none ${showValidation && !form.description && 'border-red-500'}`}
                    />

                    <label className="block mt-2 mb-2 text-sm font-semibold">Product Image <span className="text-red-500 font-bold ">*</span></label>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        accept="image/*"
                        className="w-full px-4 py-3.5 rounded-lg bg-[#1a2236] border border-gray-600"
                    />
                    <div className="flex flex-wrap gap-4 mt-2">
                        {image?.name && (
                            <span className="px-2 py-1 text-xs bg-gray-700 rounded-lg" >
                                {image?.name || ""}
                            </span>
                        )}

                    </div>
                </div>

                <div className="glass flex flex-col gap-4 text-white p-4 rounded-xl xl:w-80 shadow-lg mb-10 lg:mb-0">
                    <h3 className="text-xl font-bold ">Categories</h3>
                    <ul className="space-y-4 ">
                        {data?.collections.map((category: any, index: number) => (
                            <li key={index} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(category._id)}
                                    onChange={() => toggleCategory(category._id)}
                                    className="accent-[#F0CDCA] w-4 h-4 rounded"
                                />
                                <span className="font-extralight text-md ml-2">{category.name}</span>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={() => navigate("/add-collection")}
                        className="mt-4 bgPink blackText font-semibold"
                    >
                        Create New
                    </button>
                </div>
            </form>

            {/* Nested Products */}
            {/* <div className="mt-6">
                <h3 className="text-lg font-bold mb-4">Products <span className="text-red-500 font-bold ">*</span></h3>
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
                            className={`w-full mb-2 p-3 rounded-lg border border-gray-500 focus:outline-none ${showValidation && !product.name && 'border-red-500'}`}
                        />
                        <input
                            type="text"
                            name="price"
                            value={product.price}
                            onChange={(e) => handleProductChange(index, e)}
                            required
                            placeholder="Product Price"
                            className={`w-full mb-2 p-3 rounded-lg border border-gray-500 focus:outline-none ${showValidation && !product.price && 'border-red-500'}`}
                        />
                        <textarea
                            name="description"
                            style={{ resize: "none" }}
                            value={product.description}
                            onChange={(e) => handleProductChange(index, e)}
                            required
                            placeholder="Product Description"
                            className={`w-full p-3 rounded-lg border border-gray-500 focus:outline-none ${showValidation && !product.description && 'border-red-500'}`}
                            rows={3}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleProductImageChange(index, e)}
                            className={`w-full p-3 rounded-lg border border-gray-500 focus:outline-none ${showValidation && !product.image && 'border-red-500'}`}
                        />
                        {product.image && (
                            <span className="px-2 py-1 text-xs bg-gray-700 rounded-lg">
                                {product.image.name}
                            </span>
                        )}
                        {form.products.length > 1 && (
                            <div className="my-4">
                                <button
                                    type="button"
                                    onClick={() => removeProductField(index)}
                                    className="w-full md:w-xs bgPink blackText font-semibold rounded-lg transition-colors"
                                >
                                    Remove
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div> */}
            <div className="flex justify-between items-center m-2">
                {/* <button
                        type="button"
                        onClick={addProductField}
                        className="w-full md:w-xs bgPink blackText font-semibold rounded-lg transition-colors"
                    >
                        + Add Product
                    </button> */}

                <button
                    disabled={isLoading}
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full md:w-xs bgPink blackText font-semibold rounded-lg transition-colors"
                >
                    {isLoading ? <Spinner /> : "Add Product"}
                </button>
            </div>
        </div>
    );
};

export default AddProduct;
