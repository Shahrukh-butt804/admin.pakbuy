import { Provider, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Layout from "./components/layout";
import ForgetPassword from "./pages/auth/forgetPassword";
import Login from "./pages/auth/login";
import Resetpassword from "./pages/auth/resetpassword";
import VerifyOtp from "./pages/auth/verifyOtp";
import Dashboard from "./pages/dashboard";
import { selectUser } from "./redux/reducers/userSlice";
import { store } from "./redux/store";
import UserManagement from "./pages/user-management";

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
              <Route path="/2" element={<UserManagement />} />
              <Route path="/3" element={<Dashboard />} />
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