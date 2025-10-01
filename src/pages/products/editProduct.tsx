import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { useGetProductByIdQuery, useUpdateProductMutation } from "../../redux/services/productSlice";
import { UPLOADS_URL } from "../../constants/api";
import { ChevronLeft } from "lucide-react";
import Spinner from "../../components/spinner";
import { useGetAllCollectionsQuery } from "../../redux/services/collectionSlice";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: collection, isLoading: isLoadingProduct } = useGetProductByIdQuery(id, { skip: !id, refetchOnMountOrArgChange: true });
    const [updateProduct, { isLoading }] = useUpdateProductMutation();

    const [showValidation, setShowValidation] = useState(false);
    const [productImage, setProductImage] = useState<File | null | any>(null);




    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const { data, isLoading: isLoadingCollection } = useGetAllCollectionsQuery({});

    const [form, setForm] = useState({
        name: "",
        codes: "",
        rating: "",
        review: "",
        description: "",
        tax: false,
        categories: [] as string[],
        stock: "",
        price: "",
    });

    useEffect(() => {
        if (collection?._id) {
            setForm({
                name: collection.name || "",
                codes: collection.codes.join(",") || "",
                rating: collection.rating?.toString() || "",
                review: collection.review?.toString() || "",
                description: collection.description || "",
                tax: collection.tax || false,
                categories: collection.categories || [],
                stock: collection.stock?.toString() || "",
                price: collection.price?.toString() || "",

            });
            collection.collections.forEach((category: any) => {
                setSelectedCategories((prev) => [...prev, category._id]);
            });

        }
    }, [collection]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked }: any = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    // const handleProductChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     const { name, value } = e.target;
    //     const updatedProducts = [...form.products];
    //     updatedProducts[index] = { ...updatedProducts[index], [name]: value };
    //     setForm({ ...form, products: updatedProducts });
    // };

    // const handleProductImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files && e.target.files[0]) {
    //         const updatedProducts = [...form.products];
    //         updatedProducts[index] = { ...updatedProducts[index], image: e.target.files[0] };
    //         setForm({ ...form, products: updatedProducts });
    //     }
    // };

    // const addProductField = () => {
    //     setForm({
    //         ...form,
    //         products: [...form.products, { name: "", price: "", description: "", image: null }],
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



    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setProductImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        const isEmpty = !form.name || !form.description || !form.stock;


        if (form.rating) {
            const ratingNum = Number(form.rating);
            if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
                return Swal.fire({
                    icon: 'error',
                    title: 'Oops!',
                    text: 'Rating must be a number between 1 and 5',
                })
            }
        }

        if (isEmpty) {
            setShowValidation(true);
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

        let realLength = form.codes.split(",").map(c => c.trim()).filter(c => c !== "")


        if (realLength.length > 0 && codes.length < Number(form.stock)) {
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


        if (realLength.length > 0) {
            formData.append("codes", JSON.stringify(codes));
        }

        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("stock", form.stock);
        formData.append("price", form.price);
        formData.append("collectionIds", JSON.stringify(selectedCategories));
        formData.append("rating", form.rating);
        formData.append("review", form.review);


        // ✅ send product JSON *without images*
        // const productsPayload = form.products.map((p) => ({
        //     name: p.name,
        //     price: p.price,
        //     description: p.description,
        // }));
        // formData.append("products", JSON.stringify(productsPayload));


        if (productImage) {
            formData.append("image", productImage);
        }


        // ✅ attach each product’s image with an indexed field name
        // form.products.forEach((p, index) => {
        //     if (p.image instanceof File) {
        //         formData.append(`products[${index}][image]`, p.image);
        //     }
        // });

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



    if (isLoadingCollection || isLoadingProduct) {
        return (
            <div className='grid place-content-center'>
                <Spinner size='lg' />
            </div>
        )
    }


    return (
        <div className="md:p-4 glass text-white rounded-xl shadow-lg max-w-7xl mx-2 md:mx-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2"><ChevronLeft className='cursor-pointer w-7 h-7' onClick={() => navigate(-1)} />  Edit Product</h2>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 md:mt-6 "
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


                    <label className="block my-2  text-sm font-semibold">Product Rating <span className="text-red-500 font-bold ">*</span></label>
                    <input
                        type="number"
                        name="rating"
                        value={form.rating}
                        onChange={handleChange}
                        required
                        placeholder="Enter product rating out of 5"
                        className={`w-full p-4 rounded-lg bg-[#1a2236] border border-gray-600 focus:outline-none ${showValidation && !form.rating && 'border-red-500'}`}
                    />


                    <label className="block mt-4 mb-2 text-sm font-semibold">
                        Codes
                        {/* <span className="text-red-500 font-bold ">* </span> */}
                        {`( comma separated )`}
                    </label>

                    <textarea
                        name="codes"
                        value={form.codes}
                        onChange={handleChange}
                        rows={5}
                        // required
                        style={{ resize: "none" }}
                        className={`w-full p-3 sm:p-4 rounded-lg border ${showValidation && !form.codes ? "border-red-500" : "border-gray-600"
                            }`}
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

                    <label className="block mt-2 mb-2 text-sm font-semibold">Product Price *</label>
                    <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        required
                        className={`w-full p-3 sm:p-4 rounded-lg bg-[#1a2236] border ${showValidation && !form.price ? "border-red-500" : "border-gray-600"
                            }`}
                    />
                </div>

                {/* Right Side */}
                <div className="flex  flex-col">
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

                    <label className="block my-2 text-sm font-semibold">Product Review <span className="text-red-500 font-bold ">*</span></label>
                    <input
                        type="number"
                        name="review"
                        value={form.review}
                        onChange={handleChange}
                        required
                        placeholder="Enter product review"
                        className={`w-full p-4 rounded-lg bg-[#1a2236] border border-gray-600 focus:outline-none ${showValidation && !form.review && 'border-red-500'}`}
                    />

                    <label className="block mt-4 mb-2 text-sm font-semibold">Description *</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={5}
                        required
                        style={{ resize: "none" }}
                        className={`w-full p-3 sm:p-4 rounded-lg border ${showValidation && !form.description ? "border-red-500" : "border-gray-600"
                            }`}
                    />

                    <label className="block mt-3 mb-2 text-sm font-semibold">Collection Image</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        accept="image/*"
                        className="w-full px-4 py-3.5 rounded-lg bg-[#1a2236] border border-gray-600"
                    />

                    {productImage ? (

                        <img
                            src={URL.createObjectURL(productImage)}
                            alt="new-existing"
                            crossOrigin="anonymous"
                            className="h-24 w-24 rounded-lg object-cover"
                        />
                    ) : (

                        <img
                            src={UPLOADS_URL + collection?.image}
                            alt="existing-image"
                            crossOrigin="anonymous"
                            className="h-24 w-24 rounded-lg object-cover"
                        />
                    )}

                </div>

                <div className="glass flex flex-col gap-4 text-white p-4 rounded-xl xl:w-80 shadow-lg mb-10 lg:mb-0">
                    <h3 className="text-xl font-bold ">Collections</h3>
                    <ul className="space-y-4 ">
                        {data?.collections?.map((category: any, index: number) => (
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

                <div className="flex flex-col sm:flex-row justify-between gap-4 items-center m-2">
                    {/* <button
                        type="button"
                        onClick={addProductField}
                        className="w-full sm:w-auto px-6 py-2 bgPink blackText font-semibold rounded-lg transition-colors"
                    >
                        + Add Product
                    </button> */}
                    <button
                        disabled={isLoading}
                        type="submit"
                        className="w-full sm:w-auto px-6 py-2 bgPink blackText font-semibold rounded-lg transition-colors"
                    >
                        {isLoading ? <Spinner /> : "Save Changes"}

                    </button>
                </div>
            </form>


        </div>
    );
};

export default EditProduct;
