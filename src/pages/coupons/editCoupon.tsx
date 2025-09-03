import { ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import Editor from "../../components/editor";
import Spinner from "../../components/spinner";
import { useGetResourceByIdQuery, useUpdateResourceMutation } from "../../redux/services/resourceSlice";

const EditCoupon = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [showValidation, setShowValidation] = useState(false);
    const [form, setForm] = useState({
        name: "",
        content: "",
    });

    const { data: resource, isLoading: isFetching } = useGetResourceByIdQuery(id);
    const [updateResource, { isLoading }] = useUpdateResourceMutation();

    useEffect(() => {
        if (resource) {
            setForm({
                name: resource.name || "",
                content: resource.content || "",
            });
        }
    }, [resource]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value }: any = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const isEmpty = Object.values(form).some((value) => value === "");
        if (isEmpty) {
            setShowValidation(true);
            return;
        }

        try {
            const res: any = await updateResource({
                id,
                body: { name: form.name, content: form.content },
            }).unwrap();

            if (res?.success) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: res?.message || "Resource updated successfully!",
                });
                navigate(-1);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops!",
                    text:
                        res?.error?.data?.message ||
                        res?.message ||
                        "Something went wrong!",
                });
            }
        } catch (error: any) {
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text:
                    error?.error?.data?.message ||
                    error?.message ||
                    error?.data?.message ||
                    "Something went wrong!",
            });
        }
    };

    if (isFetching) {
        return (
            <div className="flex items-center justify-center h-64">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="p-2 md:p-6 glass text-white rounded-xl shadow-lg max-w-7xl mx-4 md:mx-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <ChevronLeft
                    className="cursor-pointer w-7 h-7"
                    onClick={() => navigate(-1)}
                />{" "}
                Edit Coupon
            </h2>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                <div>
                    <label className="block mb-2 text-sm font-semibold">
                        Coupon Code <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter resource name"
                        className={`w-full p-4 rounded-lg bg-[#1a2236] border border-gray-600 focus:outline-none ${showValidation && !form.name && "border-red-500"
                            }`}
                    />

                    <label className="block mt-4 mb-2 text-sm font-semibold">
                        Resource Content <span className="text-red-500 font-bold">*</span>
                    </label>
                    <Editor content={form.content} setContent={setForm} />

                    <div className="flex justify-between items-center m-2">
                        <button
                            disabled={isLoading}
                            type="submit"
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

export default EditCoupon;
