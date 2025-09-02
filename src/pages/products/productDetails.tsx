import { useNavigate, useParams } from 'react-router'
import { ChevronLeft } from "lucide-react";
import { useGetProductByIdQuery } from '../../redux/services/productSlice';
import Spinner from '../../components/spinner';
import { UPLOADS_URL } from '../../constants/api';


export default function ProductDetails() {
    const navigate = useNavigate()
    const { id } = useParams()
    const { data: pkg, isLoading } = useGetProductByIdQuery(id, { skip: !id , refetchOnMountOrArgChange: true})




    if (isLoading) {
        return (
            <div className='grid place-content-center'>
                <Spinner size='lg' />
            </div>
        )
    }


    return (
        <div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-start md:items-center px-4 md:px-6 mb-6 text-white mr-7">
                <div className="flex items-center gap-2 text-3xl font-bold">
                    <ChevronLeft
                        className="cursor-pointer w-10 h-10"
                        onClick={() => navigate(-1)}
                    />
                    <span>Product Details</span>
                </div>

                <button
                    onClick={() => navigate(`/edit-product/${pkg?._id}`)}
                    type="submit"
                    className="px-4 py-2 bgPink blackText font-semibold rounded-lg transition-colors"
                >
                    Edit PRODUCT
                </button>
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
                            <span>CHOOSE {pkg?.name || "N/A"}</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-gray-400">Collection ID</span>
                            <span>{pkg?._id || "N/A"}</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-gray-400">Price</span>
                            <span>${pkg?.price || "N/A"}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400">Stock</span>
                            <span>{pkg?.stock || "N/A"}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400">Status</span>
                            <span>{pkg?.stock > 0 ? "In Stock" : "Out of Stock"}</span>
                        </div>
                        {/* 
                        <div className="flex flex-col">
                            <span className="text-gray-400">Ratings</span>
                            <span>5 out of 4</span>
                        </div> */}
                        <div className="flex flex-col">
                            <span className="text-gray-400">Description</span>
                            <span>{pkg?.description || "N/A"}</span>
                        </div>
                    </div>
                </div>
                <div className='md:px-4'>
                    <p>Items In Collections</p>
                    <div className="glass rounded-lg col-span-2 max-w-2xl">
                        <table className="w-full text-left font-extralight">
                            <thead >
                                <tr>
                                    <th>Collection Name </th>
                                    <th>Product Name </th>
                                    <th>Price</th>
                                    <th>Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pkg.products.map((product: any, index: any) => (
                                    <>
                                        <div className="my-6" />
                                        <tr key={index}>
                                            <td>{pkg.name}</td>
                                            <td>{product.name}</td>
                                            <td>${product.price.toFixed(2)}</td>
                                            <td className={"text-gray-400"}>
                                                {product.image ? (
                                                    <img src={UPLOADS_URL + product.image} alt="Image" crossOrigin='anonymous' className='w-10 h-10 rounded-full' />
                                                )
                                                    :
                                                    "N/A"
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
