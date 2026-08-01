import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from 'react-router';
import Spinner from '../../components/spinner';
import { UPLOADS_URL } from '../../constants/api';
import { useDeleteCollectionMutation, useGetCollectionByIdQuery } from '../../redux/services/collectionSlice';
import Swal from "sweetalert2";


export default function CollectionDetails() {
    const navigate = useNavigate()
    const { id } = useParams()
    const { data: collection, isLoading } = useGetCollectionByIdQuery(id, { skip: !id, refetchOnMountOrArgChange: true })

    const [deleteCollection, { isLoading: isLoadingDelete }] = useDeleteCollectionMutation()


    const handleDelete = async () => {
        if (!id) return;

        try {
            const res: any = await deleteCollection(id)
            if (res?.data?.success) {
                Swal.fire({
                    icon: "success",
                    title: "Updated!",
                    text: res?.data?.message || "Product updated successfully.",
                });
                navigate('/collections')
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
    }


    if (isLoading) {
        return (
            <div className='grid place-content-center'>
                <Spinner size='lg' />
            </div>
        )
    }


    return (
        <div className='text-gray-200'>

            <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center px-4 md:px-6 mb-6 text-white mr-7">
                <div className="flex items-center gap-2 text-3xl font-bold">
                    <ChevronLeft
                        className="cursor-pointer w-10 h-10"
                        onClick={() => navigate(-1)}
                    />
                    <span className="text-2xl md:text-4xl">Collection Details</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-4">
                    <button
                        onClick={() => navigate(`/edit-collection/${collection?._id}`)}
                        type="submit"
                        className="px-4 py-2 bgPink blackText font-semibold rounded-lg transition-colors"
                    >
                        Edit COLLECTION
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={isLoadingDelete}
                        type="submit"
                        className="px-4 py-2 bgPink blackText font-semibold rounded-lg transition-colors"
                    >
                        {isLoadingDelete ? "Deleting COLLECTION..." : "Delete COLLECTION"}
                    </button>
                </div>
            </div>

            <div className='glass flex flex-col gap-10 mx-2 md:mx-12 '>
                <div className='flex flex-col gap-10    '>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6  font-extralight md:max-w-3xl md:px-4">
                        <div className="flex flex-col">
                            <span className="text-gray-400">Collection Name</span>
                            <span>{collection?.name || "N/A"}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400">Collection Title</span>
                            <span>{collection?.title || "N/A"}</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-gray-400">Collection Price</span>
                            <span>${collection?.CollectionPrice || "0"}</span>
                        </div>


                    </div>

                    <div className="max-w-3xl md:px-4 flex flex-col gap-2">
                        <span className="text-gray-400 text-sm md:text-base">Collection About</span>
                        <p className="w-full break-words whitespace-normal text-sm md:text-base leading-relaxed">
                            {/* {collection?.about || "N/A"} */}
                            <div dangerouslySetInnerHTML={{ __html: collection.about || '' }} />
                        </p>
                    </div>



                    <div className="flex flex-col md:mx-2 ">
                        <span className="text-gray-400 font-semibold">Description And Slogan</span>

                        {Array.isArray(collection?.description) && collection.description.length > 0 ? (
                            <div className="mt-4 space-y-3 glass rounded-xl p-6">
                                {collection.description.map((item: any, index: number) => (
                                    <div key={index} className="border-l-4 border-[#F0CDCA] pl-3">
                                        {item.heading && (
                                            <h3 className="text-md font-bold text-[#F0CDCA] uppercase tracking-wide mb-1">
                                                {item.heading}
                                            </h3>
                                        )}
                                        {item.text && (
                                            <p className="text-sm text-gray-200 leading-snug">
                                                {item.text}
                                            </p>
                                        )}
                                    </div>
                                ))}

                                {/* optional tagline at the bottom like in screenshot */}
                                <p className="pt-4 text-center text-[#F0CDCA] font-semibold text-base">
                                    {collection?.slogan || "0"}
                                </p>
                            </div>
                        ) : (
                            <span className="text-gray-500">N/A</span>
                        )}
                    </div>
                </div>
                <div className='md:px-4'>
                    <p>Items In Collections</p>
                    <div className="glass rounded-lg col-span-2 max-w-2xl">
                        <table className="w-full text-left font-extralight">
                            <thead >
                                <tr>
                                    <th>Product Name </th>
                                    <th>Product Price</th>
                                    <th>Product stock </th>
                                    <th>Product Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                {collection?.products?.map((product: any, index: any) => (
                                    <>
                                        <div className="my-6" />
                                        <tr key={index}>
                                            <td>{product.name || "N/A"}</td>
                                            <td>${product.price?.toFixed(2) || "0"}</td>
                                            <td>{product.stock || "0"}</td>
                                            <td className={"text-gray-400"}>
                                                {product.image ? (
                                                    <img src={UPLOADS_URL + product.image} alt="Image" crossOrigin='anonymous' className='w-10 h-10 rounded-full' />
                                                )
                                                    : "N/A"
                                                }
                                            </td>
                                        </tr>
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
