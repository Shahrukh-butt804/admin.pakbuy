import { ChevronLeft } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useAddCouponMutation } from "../../redux/services/couponSlice";
import Spinner from "../../components/spinner";

const AddCoupon = () => {
    const navigate = useNavigate();
    const [showValidation, setShowValidation] = useState(false)
    const [form, setForm] = useState({
        code: "",
        value: "",
        description: "",
        type: "amount",
        expiryDate: "",
        limit: "",
        perUserLimit: "",

    });

    const [addCoupon, { isLoading }] = useAddCouponMutation()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
            const res: any = await addCoupon(form)
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
                    text: res?.error?.data?.message || res?.error?.data?.errors[0].msg || 'something went wrong!',
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
        <div className="md:p-4 glass text-white rounded-xl shadow-lg max-w-7xl mx-2 md:mx-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2"><ChevronLeft className='cursor-pointer w-7 h-7' onClick={() => navigate(-1)} />  Add Coupon</h2>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {/* Left Side */}
                <div>
                    <label className="block mb-2 text-sm font-semibold">Code <span className="text-red-500 font-bold ">*</span></label>
                    <input
                        type="text"
                        name="code"
                        value={form.code}
                        onChange={handleChange}
                        // required
                        placeholder="Enter code"
                        className={`w-full p-4 rounded-lg bg-[#1a2236] border border-gray-600 focus:outline-none ${showValidation && !form.code && 'border-red-500'}`}
                    />

                    <label className="block mt-4 mb-2 text-sm font-semibold">
                        value <span className="text-red-500 font-bold ">*</span>
                    </label>
                    <input
                        type="number"
                        name="value"
                        value={form.value}
                        onChange={handleChange}
                        // required
                        placeholder="Enter Value"
                        className={`w-full p-4 rounded-lg bg-[#1a2236] border border-gray-600 focus:outline-none ${showValidation && !form.value && 'border-red-500'}`}
                    />
                    <label className="block mt-4 mb-2 text-sm font-semibold">
                        Limit <span className="text-red-500 font-bold ">*</span>
                    </label>
                    <input
                        type="number"
                        name="limit"
                        value={form.limit}
                        onChange={handleChange}
                        // required
                        placeholder="Enter Limit"
                        className={`w-full p-4 rounded-lg bg-[#1a2236] border border-gray-600 focus:outline-none ${showValidation && !form.limit && 'border-red-500'}`}
                    />
                    <label className="block mt-4 mb-2 text-sm font-semibold">
                        Per User Limit <span className="text-red-500 font-bold ">*</span>
                    </label>
                    <input
                        type="number"
                        name="perUserLimit"
                        value={form.perUserLimit}
                        onChange={handleChange}
                        // required
                        placeholder="Enter Per User Limit"
                        className={`w-full p-4 rounded-lg bg-[#1a2236] border border-gray-600 focus:outline-none ${showValidation && !form.perUserLimit && 'border-red-500'}`}
                    />


                </div>

                {/* Right Side */}
                <div>


                    <label className="block  text-sm font-semibold">
                        Description <span className="text-red-500 font-bold ">*</span>
                    </label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={1}
                        // required
                        style={{ resize: "none" }}
                        placeholder="Write description..."
                        className={`w-full p-4 rounded-lg border border-gray-600 focus:outline-none ${showValidation && !form.description && 'border-red-500'}`}
                    />

                    <label className="block mt-4 mb-2 text-sm font-semibold">
                        Type <span className="text-red-500 font-bold">*</span>
                    </label>
                    <select
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        // required
                        className={`w-full p-4 rounded-lg  border border-gray-600 focus:outline-none ${showValidation && !form.type && 'border-red-500'
                            }`}
                    >
                        <option className="text-black" value="amount">Amount</option>
                        <option className="text-black" value="percentage">Percentage</option>
                    </select>
                    <label className="block mt-4 mb-2 text-sm font-semibold">
                        Expiry Date <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                        type="date"
                        name="expiryDate"
                        value={form.expiryDate}
                        onChange={handleChange}
                        // required
                        className={`w-full p-4 rounded-lg bg-[#1a2236] border border-gray-600 focus:outline-none ${showValidation && !form.expiryDate && 'border-red-500'}`}
                    />

                </div>
                <button
                    disabled={isLoading}
                    type="submit"
                    className="px-4 py-2 bgPink blackText font-semibold rounded-lg transition-colors whitespace-nowrap"
                >
                    {isLoading ? <Spinner /> : "Add Coupon"}
                </button>
            </form>

        </div>
    );
};

export default AddCoupon;
