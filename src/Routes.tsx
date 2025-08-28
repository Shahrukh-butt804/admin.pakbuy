import { Provider, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router";
import ForgetPassword from "./pages/auth/forgetPassword";
import Login from "./pages/auth/login";
import Resetpassword from "./pages/auth/resetpassword";
import VerifyOtp from "./pages/auth/verifyOtp";
import Dashboard from "./pages/dashboard";
import { selectUser } from "./redux/reducers/userSlice";
import { store } from "./redux/store";
import Header from "./components/header";

const PrivateRoute = () => {
  const user = useSelector(selectUser);

  const isAuthenticated = user && user._id;

  return isAuthenticated ? <div>
    <Header />
    <Outlet />
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