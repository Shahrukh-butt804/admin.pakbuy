import { ChevronLeft } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import Spinner from "../../components/spinner";
import { useAddCollectionMutation } from "../../redux/services/collectionSlice";

const AddCollection = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState<File | null>(null);
    const [showValidation, setShowValidation] = useState(false)
    const [form, setForm] = useState({
        name: "",
        title: "",
        slogan: "",
        description: [
            { heading: "", text: "" }
        ],
    });

    const [addCollection, { isLoading }] = useAddCollectionMutation()

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


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();

        const isEmpty = Object.values(form).some((value) => value === '');
        if (isEmpty) {
            setShowValidation(true)
            return;
        }

        formData.append("name", form.name);
        formData.append("description", JSON.stringify(form.description));
        formData.append("slogan", form.slogan);
        formData.append("title", form.title);

        if (image) {
            formData.append("collectionImage", image);
        } else {
            return Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: 'Collection Image is required',
            })
        }

        try {
            const res: any = await addCollection(formData)
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



    const handleDescriptionChange = (index: number, field: "heading" | "text", value: string) => {
        const newDesc = [...form.description];
        newDesc[index][field] = value;
        setForm({ ...form, description: newDesc });
    };

    // add a new block
    const addDescriptionBlock = () => {
        setForm({
            ...form,
            description: [...form.description, { heading: "", text: "" }],
        });
    };

    // remove a block
    const removeDescriptionBlock = (index: number) => {
        const newDesc = form.description.filter((_, i) => i !== index);
        setForm({ ...form, description: newDesc });
    };


    return (
        <div className="md:p-4 glass text-white rounded-xl shadow-lg max-w-7xl mx-2 md:mx-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2"><ChevronLeft className='cursor-pointer w-7 h-7' onClick={() => navigate(-1)} />  Add Collection</h2>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-6 md:mt-6"
            >
                {/* Left Side */}
                <div>
                    <label className="block mb-2 text-sm font-semibold">Collection Name <span className="text-red-500 font-bold ">*</span></label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter Collection name"
                        className={`w-full p-4 rounded-lg bg-[#1a2236] border border-gray-600 focus:outline-none ${showValidation && !form.name && 'border-red-500'}`}
                    />
                    <label className="block mb-2 text-sm font-semibold">Collection Title <span className="text-red-500 font-bold ">*</span></label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        placeholder="Enter Collection title"
                        className={`w-full p-4 rounded-lg bg-[#1a2236] border border-gray-600 focus:outline-none ${showValidation && !form.title && 'border-red-500'}`}
                    />

                    <label className="block mb-2 text-sm font-semibold">Collection Slogan <span className="text-red-500 font-bold ">*</span></label>
                    <input
                        type="text"
                        name="slogan"
                        value={form.slogan}
                        onChange={handleChange}
                        required
                        placeholder="Enter Collection slogan"
                        className={`w-full p-4 rounded-lg bg-[#1a2236] border border-gray-600 focus:outline-none ${showValidation && !form.slogan && 'border-red-500'}`}
                    />


                    <label className="block mt-2 mb-2 text-sm font-semibold">Collection Image <span className="text-red-500 font-bold ">*</span></label>
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



                    <label className="block mt-4 mb-2 text-sm font-semibold ">
                        Collection Description <span className="text-red-500 font-bold">*</span>
                    </label>

                    {form.description.map((desc, index) => (
                        <div key={index} className="mb-4 p-4 rounded-lg  border border-gray-600 glass">
                            <input
                                type="text"
                                placeholder="Heading"
                                value={desc.heading}
                                onChange={(e) => handleDescriptionChange(index, "heading", e.target.value)}
                                className="w-full mb-2 p-2 rounded-lg  border border-gray-500 focus:outline-none"
                            />
                            <textarea
                                style={{ resize: "none" }}
                                placeholder="Text"
                                value={desc.text}
                                onChange={(e) => handleDescriptionChange(index, "text", e.target.value)}
                                rows={3}
                                className="w-full p-2 rounded-lg  border border-gray-500 focus:outline-none"
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
                        className="px-3 py-1 bgPink blackText rounded-lg text-sm "
                    >
                        + Add another section
                    </button>





                </div>

            </form>
            <div className="flex justify-between items-center  mt-10">
                <button
                    disabled={isLoading}
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full md:w-xs bgPink blackText font-semibold rounded-lg transition-colors"
                >
                    {isLoading ? <Spinner /> : "Add Collection"}
                </button>
            </div>


        </div>
    );
};

export default AddCollection;
