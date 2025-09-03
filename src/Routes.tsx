import { Provider, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Layout from "./components/layout";
import ForgetPassword from "./pages/auth/forgetPassword";
import Login from "./pages/auth/login";
import Resetpassword from "./pages/auth/resetpassword";
import VerifyOtp from "./pages/auth/verifyOtp";
import Customers from "./pages/customers";
import Dashboard from "./pages/dashboard";
import Products from "./pages/products";
import { selectUser } from "./redux/reducers/userSlice";
import { store } from "./redux/store";
import Orders from "./pages/orders";
import Resources from "./pages/resources";
import CustomerDetail from "./pages/customers/customerDetail";
import ProductDetails from "./pages/products/productDetails";
import OrderDetails from "./pages/orders/orderDetails";
import Profile from "./pages/profile";
import EditProfile from "./pages/profile/editProfile";
import ChangePassword from "./pages/profile/changePassword";
import AddProduct from "./pages/products/addProduct";
import EditProduct from "./pages/products/editProduct";
import AddResource from "./pages/resources/addResource";
import EditResource from "./pages/resources/editResource";
import ResourceDetails from "./pages/resources/resourceDetails";

const PrivateRoute = () => {
  const user = useSelector(selectUser);

  const isAuthenticated = user && user._id;

  return isAuthenticated ? <div>
    <Layout />
  </div> : <Navigate to="/login" />;
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
              <Route path="/orders" element={<Orders />} />
              <Route path="/order-detail/:id" element={<OrderDetails />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/add-resource" element={<AddResource />} />
              <Route path="/edit-resource/:id" element={<EditResource />} />
              <Route path="/resource-detail/:id" element={<ResourceDetails />} />
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