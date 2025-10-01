import { ChevronLeft } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useAddResourceMutation } from "../../redux/services/resourceSlice";
import Spinner from "../../components/spinner";
import Editor from "../../components/editor";

const AddResource = () => {
    const navigate = useNavigate();
    const [showValidation, setShowValidation] = useState(false)
    const [form, setForm] = useState({
        name: "",
        content: "",
    });

    const [addResource, { isLoading }] = useAddResourceMutation()

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value }: any = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const isEmpty = Object.values(form).some((value) => value === '');
        if (isEmpty) {
            setShowValidation(true)
            return;
        }

        try {
            const res: any = await addResource({ name: form.name, content: form.content }).unwrap();
            console.log("🚀 ~ handleSubmit ~ res:", res)
            if (res?.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: res?.message || 'something went wrong!',
                })
                navigate(-1)

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops!',
                    text: res?.error?.data?.message || res?.message || 'something went wrong!',
                });
            }
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: error?.error?.data?.message || error?.message || error?.data?.message || 'something went wrong!',
            })
            console.log("🚀 ~ handleSubmit ~ error:", error)

        }

    };


    return (
        <div className="p-2 md:p-6 glass text-white rounded-xl shadow-lg max-w-7xl mx-4 md:mx-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2"><ChevronLeft className='cursor-pointer w-7 h-7' onClick={() => navigate(-1)} />  Add Resource</h2>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-6"
            >
                <div>
                    <label className="block mb-2 text-sm font-semibold">Resource Name <span className="text-red-500 font-bold ">*</span></label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter product name"
                        className={`w-full p-4 rounded-lg bg-[#1a2236] border border-gray-600 focus:outline-none ${showValidation && !form.name && 'border-red-500'}`}
                    />

                    <label className="block mt-4 mb-2 text-sm font-semibold">
                        Resource Content <span className="text-red-500 font-bold ">*</span>
                    </label>
                    <Editor content={form.content} setContent={setForm} />

                    <div className="flex justify-between items-center m-2">
                        <button
                            disabled={isLoading}
                            type="submit"
                            onClick={handleSubmit}
                            className="w-full md:w-xs bgPink blackText font-semibold rounded-lg transition-colors"
                        >
                            {isLoading ? <Spinner /> : "Save"}

                        </button>
                    </div>
                </div>



            </form>


        </div>
    );
};

export default AddResource;
