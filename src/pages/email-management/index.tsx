import { useState, useEffect } from "react";
import { Save, RotateCcw } from "lucide-react";
import Swal from "sweetalert2";
import Spinner from "../../components/spinner";
import { useGetEmailTemplateQuery, useUpdateEmailTemplateMutation } from "../../redux/services/emailSlice";

export default function EmailManagement() {
    const [template, setTemplate] = useState("");
    const [templateId, setTemplateId] = useState("");

    const { data, isLoading, refetch } = useGetEmailTemplateQuery({});
    const [updateEmailTemplate, { isLoading: isUpdating }] = useUpdateEmailTemplateMutation();

    useEffect(() => {
        if (data) {
            setTemplate(data.body || "");
            setTemplateId(data._id || "");
        }
    }, [data]);

    const handleSave = async () => {
        if (!template.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Empty Template',
                text: 'Please enter a template before saving.',
            });
            return;
        }

        try {
            const res: any = await updateEmailTemplate({
                id: templateId,
                body: { body: template }
            });

            if (res?.data?.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: res?.data?.message || 'Email template updated successfully!',
                });
                refetch();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops!',
                    text: res?.error?.data?.message || 'Failed to update template.',
                });
            }
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: error?.message || 'Failed to update template. Please try again.',
            });
        }
    };

    const handleReset = () => {
        Swal.fire({
            title: 'Reset Template?',
            text: 'This will restore the original template from the server. Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, reset it!'
        }).then((result) => {
            if (result.isConfirmed) {
                if (data) {
                    setTemplate(data.body);
                    Swal.fire(
                        'Reset!',
                        'Template has been reset to original.',
                        'success'
                    );
                }
            }
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6 glass text-white rounded-xl shadow-lg max-w-7xl mx-2 md:mx-12">
            <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2">Email Template Editor</h2>
                <p className="text-gray-400 text-sm">
                    Customize your order confirmation email template.
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
                <button
                    onClick={handleSave}
                    disabled={isUpdating}
                    className="flex items-center gap-2 px-4 py-2 bgPink blackText rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isUpdating ? <Spinner /> : <Save className="w-4 h-4" />}
                    Save Template
                </button>
                <button
                    onClick={handleReset}
                    disabled={isUpdating}
                    className="flex items-center gap-2 px-4 py-2 bgPink blackText rounded-lg transition-colors disabled:opacity-50"
                >
                    <RotateCcw className="w-4 h-4" />
                    Reset to Original
                </button>
            </div>

            {/* Template Editor */}
            <div>
                <label className="block mb-2 text-sm font-semibold">
                    Email Template Body
                </label>
                <textarea
                    value={template}
                    onChange={(e) => setTemplate(e.target.value)}
                    className="w-full p-4 rounded-lg glass border border-gray-600 focus:outline-none focus:border-blue-500 text-sm h-[400px] resize-none"
                    placeholder="Enter your email template here..."
                />
                <p className="mt-2 text-xs text-gray-400">
                    Lines: {template.split('\n').length} | Characters: {template.length}
                </p>
            </div>
        </div>
    );
}