import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import Spinner from '../../components/spinner';
import { UPLOADS_URL } from '../../constants/api';
import { useDeleteProductMutation, useGetProductByIdQuery } from '../../redux/services/productSlice';


export default function ProductDetails() {
    const navigate = useNavigate()
    const { id } = useParams()
    const { data: product, isLoading } = useGetProductByIdQuery(id, { skip: !id, refetchOnMountOrArgChange: true })


    const [deleteProduct, { isLoading: isLoadingDelete }] = useDeleteProductMutation()


    const handleDelete = async () => {
        if (!id) return;

        try {
            const res: any = await deleteProduct(id)
            if (res?.data?.success) {
                Swal.fire({
                    icon: "success",
                    title: "Updated!",
                    text: res?.data?.message || "Product updated successfully.",
                });
                navigate('/products')
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
                    <span>Product Details</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-4">

                    <button
                        onClick={() => navigate(`/edit-product/${product?._id}`)}
                        type="submit"
                        className="px-4 py-2 bgPink blackText font-semibold rounded-lg transition-colors"
                    >
                        Edit PRODUCT
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={isLoadingDelete}
                        type="submit"
                        className="px-4 py-2 bgPink blackText font-semibold rounded-lg transition-colors"
                    >
                        {isLoadingDelete ? "Deleting PRODUCT..." : "Delete PRODUCT"}
                    </button>
                </div>
            </div>

            <div className='glass flex flex-col gap-10 mx-2 md:mx-12 '>
                <div className='flex flex-col gap-10    '>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6  font-extralight md:max-w-3xl md:px-4">

                        {/* <div className="flex flex-col">
                            <span className="text-gray-400">SKU</span>
                            <span>BW22-BL</span>
                        </div> */}
                        <div className="flex flex-col">
                            <span className="text-gray-400">Collection Name</span>
                            <span>CHOOSE {product?.name || "N/A"}</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-gray-400">Collection ID</span>
                            <span>{product?._id || "N/A"}</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-gray-400">Price</span>
                            <span>${product?.price || "N/A"}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400">Stock</span>
                            <span>{product?.stock || "N/A"}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400">Status</span>
                            <span>{product?.stock > 0 ? "In Stock" : "Out of Stock"}</span>
                        </div>
                        {/* 
                        <div className="flex flex-col">
                            <span className="text-gray-400">Ratings</span>
                            <span>5 out of 4</span>
                        </div> */}
                        <div className="flex flex-col">
                            <span className="text-gray-400">Description</span>
                            <span>{product?.description || "N/A"}</span>
                        </div>
                    </div>
                </div>
                <div className='md:px-4'>
                    <p>Collections that include this product</p>
                    <div className="glass rounded-lg col-span-2 max-w-2xl">
                        <table className="w-full text-left font-extralight">
                            <thead >
                                <tr>
                                    <th>Collection Name </th>
                                    <th>Product Name </th>
                                    <th>Collection Price</th>
                                    <th>Collection Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                {product.collections.map((collection: any, index: any) => (
                                    <>
                                        <div className="my-6" />
                                        <tr key={index}>
                                            <td>{collection.name || "N/A"}</td>
                                            <td>{product.name || "N/A"}</td>
                                            <td>${collection.price?.toFixed(2) || "0"}</td>
                                            <td className={"text-gray-400"}>
                                                {collection.image ? (
                                                    <img src={UPLOADS_URL + collection.image} alt="Image" crossOrigin='anonymous' className='w-10 h-10 rounded-full' />
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
