import { ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import Spinner from "../../components/spinner";
import { UPLOADS_URL } from "../../constants/api";
import { useGetCollectionByIdQuery, useUpdateCollectionMutation } from "../../redux/services/collectionSlice";
import Editor from "../../components/editor";

const EditCollection = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: collection, isLoading: isLoadingProduct } = useGetCollectionByIdQuery(id, { skip: !id, refetchOnMountOrArgChange: true });
    const [updateCollection, { isLoading }] = useUpdateCollectionMutation();

    const [showValidation, setShowValidation] = useState(false);
    const [productImage, setProductImage] = useState<File | null | any>(null);


    const [form, setForm] = useState({
        name: "",
        title: "",
        slogan: "",
        description: [{ heading: "", text: "" }],
    });
    const [about, setAbout] = useState({
        name: "",
        content: "",
    });

    useEffect(() => {
        if (collection?._id) {
            setForm({
                name: collection.name || "",
                title: collection.title || "",
                slogan: collection.slogan || "",
                description: Array.isArray(collection.description)
                    ? collection.description
                    : [{ heading: "", text: "" }],
            });

            setAbout({
                name: "about",
                content: collection.about || "",
            });
        }
    }, [collection]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked }: any = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setProductImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        const isEmpty = !form.name || !form.description

        if (isEmpty) {
            setShowValidation(true);
            return;
        }


        formData.append("name", form.name);
        formData.append("description", JSON.stringify(form.description));
        formData.append("slogan", form.slogan);
        formData.append("about", about.content);
        formData.append("title", form.title);

        if (productImage) {
            formData.append("collectionImage", productImage);
        }

        try {
            const res: any = await updateCollection({ id, body: formData });
            if (res?.data?.success) {
                Swal.fire({
                    icon: "success",
                    title: "Updated!",
                    text: res?.data?.message || "Collection updated successfully.",
                });
                navigate("/collections");
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops!",
                    text: res?.error?.data?.message || res?.error?.data?.errors[0]?.msg || "Something went wrong!",
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



    const handleDescriptionChange = (
        index: number,
        field: "heading" | "text",
        value: string
    ) => {
        const newDesc = [...form.description];
        newDesc[index] = {
            ...newDesc[index],    // clone the object
            [field]: value,       // update field
        };
        setForm({ ...form, description: newDesc });
    };

    const addDescriptionBlock = () => {
        setForm({
            ...form,
            description: [...form.description, { heading: "", text: "" }],
        });
    };

    const removeDescriptionBlock = (index: number) => {
        const newDesc = form.description.filter((_, i) => i !== index);
        setForm({ ...form, description: newDesc });
    };


    if (isLoadingProduct) {
        return (
            <div className='grid place-content-center'>
                <Spinner size='lg' />
            </div>
        )
    }


    return (
        <div className="md:p-4 glass text-white rounded-xl shadow-lg max-w-7xl mx-2 md:mx-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2"><ChevronLeft className='cursor-pointer w-7 h-7' onClick={() => navigate(-1)} />  Edit Collection</h2>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-1 gap-6 md:mt-6 "
            >
                {/* Left Side */}
                <div className="flex flex-col">
                    <label className="block my-3 text-sm font-semibold">Collection Name <span className="text-red-500 font-bold ">*</span></label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter Collection name"
                        className={`w-full p-4 rounded-lg bg-[#1a2236] border border-gray-600 focus:outline-none ${showValidation && !form.name && 'border-red-500'}`}
                    />
                    <label className="block my-3 text-sm font-semibold">Collection Title <span className="text-red-500 font-bold ">*</span></label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        placeholder="Enter Collection title"
                        className={`w-full p-4 rounded-lg bg-[#1a2236] border border-gray-600 focus:outline-none ${showValidation && !form.title && 'border-red-500'}`}
                    />

                    <label className="block my-3 text-sm font-semibold">Collection Slogan <span className="text-red-500 font-bold ">*</span></label>
                    <input
                        type="text"
                        name="slogan"
                        value={form.slogan}
                        onChange={handleChange}
                        required
                        placeholder="Enter Collection slogan"
                        className={`w-full p-4 rounded-lg bg-[#1a2236] border border-gray-600 focus:outline-none ${showValidation && !form.slogan && 'border-red-500'}`}
                    />


                    <label className="block mt-3 mb-2 text-sm font-semibold">Collection Image</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        accept="image/*"
                        className="w-full px-4 py-3.5 rounded-lg bg-[#1a2236] border border-gray-600"
                    />


                    <label className={`block my-3 text-sm font-semibold ${showValidation && !about.content && 'text-red-500'}`}>Collection About <span className="text-red-500 font-bold ">*</span></label>
                    {/* <input
                        type="text"
                        name="about"
                        value={form.about}
                        onChange={handleChange}
                        required
                        placeholder="Enter About Collection"
                        className={`w-full p-4 rounded-lg bg-[#1a2236] border border-gray-600 focus:outline-none ${showValidation && !form.about && 'border-red-500'}`}
                    /> */}

                    <Editor content={about.content} setContent={setAbout} />


                    {productImage ? (

                        <img
                            src={URL.createObjectURL(productImage)}
                            alt="new-existing"
                            crossOrigin="anonymous"
                            className="h-24 w-24 mt-2 rounded-lg object-cover"
                        />
                    ) : (

                        <img
                            src={UPLOADS_URL + collection?.image}
                            alt="existing-image"
                            crossOrigin="anonymous"
                            className="h-24 w-24 mt-2 rounded-lg object-cover"
                        />
                    )}


                    <label className="block mt-4 mb-2 text-sm font-semibold">
                        Collection Description <span className="text-red-500 font-bold">*</span>
                    </label>

                    {form.description.map((desc, index) => (
                        <div
                            key={index}
                            className="my-3 p-4 rounded-lg border border-gray-600 glass"
                        >
                            <input
                                type="text"
                                placeholder="Heading"
                                value={desc.heading}
                                onChange={(e) =>
                                    handleDescriptionChange(index, "heading", e.target.value)
                                }
                                className="w-full mb-2 p-2 rounded-lg border border-gray-500 focus:outline-none"
                            />
                            <textarea
                                style={{ resize: "none" }}
                                placeholder="Text"
                                value={desc.text}
                                onChange={(e) =>
                                    handleDescriptionChange(index, "text", e.target.value)
                                }
                                rows={3}
                                className="w-full p-2 rounded-lg border border-gray-500 focus:outline-none"
                            />
                            {form.description.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeDescriptionBlock(index)}
                                    className="mt-2 text-sm bgPink blackText underline"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addDescriptionBlock}
                        className="px-3 py-1 w-full md:w-xs bgPink blackText rounded-lg text-sm "
                    >
                        + Add another section
                    </button>

                </div>


                <div className="flex justify-between items-center ">
                    <button
                        disabled={isLoading}
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full md:w-xs bgPink blackText font-semibold rounded-lg transition-colors"
                    >
                        {isLoading ? <Spinner /> : "Save Changes"}
                    </button>
                </div>



            </form>


        </div>
    );
};

export default EditCollection;
