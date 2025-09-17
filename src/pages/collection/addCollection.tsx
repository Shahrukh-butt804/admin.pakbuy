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
        description: "",
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
        formData.append("description", form.description);

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

                    <label className="block mt-4 mb-2 text-sm font-semibold">
                       Collection Description <span className="text-red-500 font-bold ">*</span>
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

                </div>

            </form>


            <div className="flex justify-between items-center m-2">

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
