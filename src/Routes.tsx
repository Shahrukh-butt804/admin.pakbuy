import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router";
import ForgetPassword from "./pages/auth/forgetPassword";
import Login from "./pages/auth/login";
import Resetpassword from "./pages/auth/resetpassword";
import VerifyOtp from "./pages/auth/verifyOtp";
import Collection from "./pages/collection";
import AddCollection from "./pages/collection/addCollection";
import CollectionDetails from "./pages/collection/collectionDetails";
import EditCollection from "./pages/collection/editCollection";
import Coupons from "./pages/coupons";
import AddCoupon from "./pages/coupons/addCoupon";
import CouponDetails from "./pages/coupons/couponDetails";
import EditCoupon from "./pages/coupons/editCoupon";
import Customers from "./pages/customers";
import CustomerDetail from "./pages/customers/customerDetail";
import Dashboard from "./pages/dashboard";
import Orders from "./pages/orders";
import OrderDetails from "./pages/orders/orderDetails";
import Products from "./pages/products";
import AddProduct from "./pages/products/addProduct";
import EditProduct from "./pages/products/editProduct";
import ProductDetails from "./pages/products/productDetails";
import Profile from "./pages/profile";
import ChangePassword from "./pages/profile/changePassword";
import EditProfile from "./pages/profile/editProfile";
import Resources from "./pages/resources";
import AddResource from "./pages/resources/addResource";
import EditResource from "./pages/resources/editResource";
import ResourceDetails from "./pages/resources/resourceDetails";
import { store } from "./redux/store";




import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import Layout from "./components/layout";
import { logout } from "./redux/reducers/userSlice";
import { useEffect } from "react";


interface JwtPayload {
  exp: number;
  email?: string;
  isAdmin?: boolean;
  [key: string]: any;
}

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const token = Cookies.get("accessToken");

  useEffect(() => {

    if (!token) {
      dispatch(logout());
    }
  }, [location.pathname, token]); 

  if (!token) return <Navigate to="/login" replace />;

  let decoded: JwtPayload;
  
  try {
    decoded = jwtDecode<JwtPayload>(token);
  } catch {
    dispatch(logout());
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    return <Navigate to="/login" replace />;
  }

  const currentTime = Date.now() / 1000;
  console.log("isExpired" ,decoded.exp < currentTime)
  if (decoded.exp < currentTime) {
    dispatch(logout());
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    return <Navigate to="/login" replace />;
  }

  return <Layout />;
};


function AppRoutes() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter basename={"/"}>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/customer-detail/:id" element={<CustomerDetail />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product-detail/:id" element={<ProductDetails />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/edit-product/:id" element={<EditProduct />} />
              <Route path="/collections" element={<Collection />} />
              <Route path="/add-collection" element={<AddCollection />} />
              <Route path="/edit-collection/:id" element={<EditCollection />} />
              <Route path="/collection-detail/:id" element={<CollectionDetails />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/order-detail/:id" element={<OrderDetails />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/add-resource" element={<AddResource />} />
              <Route path="/edit-resource/:id" element={<EditResource />} />
              <Route path="/resource-detail/:id" element={<ResourceDetails />} />
              <Route path="/coupons" element={<Coupons />} />
              <Route path="/coupon-detail/:id" element={<CouponDetails />} />
              <Route path="/add-coupon" element={<AddCoupon />} />
              <Route path="/edit-coupon/:id" element={<EditCoupon />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/change-password" element={<ChangePassword />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/reset-password" element={<Resetpassword />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default AppRoutes;