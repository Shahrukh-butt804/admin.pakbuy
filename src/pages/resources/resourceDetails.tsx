import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useGetResourceByIdQuery } from "../../redux/services/resourceSlice";
import Spinner from "../../components/spinner";

export default function ResourceDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: resource, isLoading } = useGetResourceByIdQuery(id, { refetchOnMountOrArgChange: true });

    if (isLoading) {
        return (
            <div className="grid place-content-center h-64">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 glass text-white rounded-xl shadow-lg max-w-7xl mx-4 md:mx-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-2 mb-6">
                <div className="flex items-center gap-1">
                    <ChevronLeft
                        className="cursor-pointer w-5 h-5 md:w-8 md:h-8 mb-2 md:mb-3"
                        onClick={() => navigate(-1)}
                    />
                    <h2 className="text-2xl md:text-3xl font-bold">Resource Details</h2>
                </div>
                <button
                    onClick={() => navigate(`/edit-resource/${id}`)}
                    type="submit"
                    className="px-4 py-2 bgPink blackText font-semibold rounded-lg transition-colors whitespace-nowrap"
                >
                    Edit Resource
                </button>
            </div>

            <h3 className="text-2xl font-semibold mb-4">{resource.name}</h3>

            <div
                className="prose prose-invert max-w-none bg-transparent p-4 rounded-lg border border-gray-700"
                dangerouslySetInnerHTML={{ __html: resource.content }}
            />
        </div>
    );
}
