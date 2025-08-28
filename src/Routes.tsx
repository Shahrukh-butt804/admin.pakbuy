import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router";
import Login from "./pages/auth/login";
import { store } from "./redux/store";
import ForgetPassword from "./pages/auth/forgetPassword";
import Resetpassword from "./pages/auth/resetpassword";
import VerifyOtp from "./pages/auth/verifyOtp";

const PrivateRoute = () => {
  // const { token } = useSelector((state) => state.auth);
  const token = "a";

  return token ? <Outlet /> : <Navigate to="/login" />;
};

function AppRoutes() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter basename={"/"}>
          <Routes>
            {/* <Route path="/login" element={<Login />} /> */}

            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Login />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route path="/verify-otp" element={<VerifyOtp />} />
              <Route path="/reset-password" element={<Resetpassword />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default AppRoutes;