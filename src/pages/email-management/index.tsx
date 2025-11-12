import { useState, useEffect } from "react";
import { Save, RotateCcw, Eye } from "lucide-react";
import Swal from "sweetalert2";
import Spinner from "../../components/spinner";

const defaultTemplate = `Hi {{customerName}},

Thank you for your order!

🧾 Order ID: {{orderId}}
📅 Order Date: {{orderDate}}

💰 Total Amount: $ {{totalAmount}}

We're processing your order and will notify you once it's ready.

📦 Tracking Link: {{trackingLink}}

{{packageData}}

Thank you for choosing choose well!

Best regards,  
choose well Team`;

export default function EmailManagement() {
    const [template, setTemplate] = useState(defaultTemplate);
    const [isSaving, setIsSaving] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    // Load saved template from localStorage on mount
    useEffect(() => {
        const savedTemplate = localStorage.getItem('emailTemplate');
        if (savedTemplate) {
            setTemplate(savedTemplate);
        }
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            // Save to localStorage (you can replace this with API call)
            localStorage.setItem('emailTemplate', template);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Email template saved successfully!',
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: 'Failed to save template. Please try again.',
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleReset = () => {
        Swal.fire({
            title: 'Reset Template?',
            text: 'This will restore the default email template. Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, reset it!'
        }).then((result) => {
            if (result.isConfirmed) {
                setTemplate(defaultTemplate);
                localStorage.setItem('emailTemplate', defaultTemplate);
                Swal.fire(
                    'Reset!',
                    'Template has been reset to default.',
                    'success'
                );
            }
        });
    };

    const renderPreview = () => {
        return template
            .replace(/{{customerName}}/g, 'John Doe')
            .replace(/{{orderId}}/g, 'ORD-12345')
            .replace(/{{orderDate}}/g, new Date().toLocaleDateString())
            .replace(/{{totalAmount}}/g, '150.00')
            .replace(/{{trackingLink}}/g, 'https://example.com/track/ORD-12345')
            .replace(/{{packageData}}/g, 'Codes - Product A = CODE1, CODE2, CODE3\nCodes - Product B = CODE4, CODE5');
    };

    return (
        <div className="p-4 md:p-6 glass text-white rounded-xl shadow-lg max-w-7xl mx-2 md:mx-12">
            <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2">Email Template Editor</h2>
                <p className="text-gray-400 text-sm">
                    Customize your order confirmation email template. Use placeholders:
                    <span className="font-mono text-blue-400"> {"{{customerName}}"}, {"{{orderId}}"}, {"{{orderDate}}"}, {"{{totalAmount}}"}, {"{{trackingLink}}"}, {"{{packageData}}"}</span>
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSaving ? <Spinner /> : <Save className="w-4 h-4" />}
                    Save Template
                </button>
                <button
                    onClick={handleReset}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors"
                >
                    <RotateCcw className="w-4 h-4" />
                    Reset to Default
                </button>
                <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                    <Eye className="w-4 h-4" />
                    {showPreview ? 'Hide Preview' : 'Show Preview'}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Template Editor */}
                <div>
                    <label className="block mb-2 text-sm font-semibold">
                        Email Template
                    </label>
                    <textarea
                        value={template}
                        onChange={(e) => setTemplate(e.target.value)}
                        className="w-full p-4 rounded-lg bg-[#1a2236] border border-gray-600 focus:outline-none focus:border-blue-500 font-mono text-sm h-[600px] resize-none"
                        placeholder="Enter your email template here..."
                    />
                    <p className="mt-2 text-xs text-gray-400">
                        Lines: {template.split('\n').length} | Characters: {template.length}
                    </p>
                </div>

                {/* Preview Section */}
                {showPreview && (
                    <div>
                        <label className="block mb-2 text-sm font-semibold">
                            Preview (Sample Data)
                        </label>
                        <div className="w-full p-4 rounded-lg bg-[#1a2236] border border-gray-600 h-[600px] overflow-auto">
                            <pre className="whitespace-pre-wrap font-sans text-sm text-gray-200">
                                {renderPreview()}
                            </pre>
                        </div>
                    </div>
                )}
            </div>

            {/* Template Variables Reference */}
            <div className="mt-6 p-4 bg-[#1a2236] rounded-lg border border-gray-600">
                <h3 className="text-lg font-semibold mb-3">Available Variables</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                    <div>
                        <span className="font-mono text-blue-400">{"{{customerName}}"}</span>
                        <p className="text-gray-400">Customer's name</p>
                    </div>
                    <div>
                        <span className="font-mono text-blue-400">{"{{orderId}}"}</span>
                        <p className="text-gray-400">Unique order ID</p>
                    </div>
                    <div>
                        <span className="font-mono text-blue-400">{"{{orderDate}}"}</span>
                        <p className="text-gray-400">Date of order</p>
                    </div>
                    <div>
                        <span className="font-mono text-blue-400">{"{{totalAmount}}"}</span>
                        <p className="text-gray-400">Total order amount</p>
                    </div>
                    <div>
                        <span className="font-mono text-blue-400">{"{{trackingLink}}"}</span>
                        <p className="text-gray-400">Order tracking URL</p>
                    </div>
                    <div>
                        <span className="font-mono text-blue-400">{"{{packageData}}"}</span>
                        <p className="text-gray-400">Product codes list</p>
                    </div>
                </div>
            </div>
        </div>
    );
}