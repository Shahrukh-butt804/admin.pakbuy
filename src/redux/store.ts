import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./services/apiSlice";
import userReducer from "./reducers/userSlice";
import { authSlice } from "./services/authSlice";
import { profileSlice } from "./services/profileSlice";
import { userManagementSlice } from "./services/userManagement";
import { orderSlice } from "./services/orderSlice";
import { productSlice } from "./services/productSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // Add API slice reducer
    [authSlice.reducerPath]: authSlice.reducer,
    [profileSlice.reducerPath]: profileSlice.reducer,
    [userManagementSlice.reducerPath]: userManagementSlice.reducer,
    [orderSlice.reducerPath]: orderSlice.reducer,
    [productSlice.reducerPath]: productSlice.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware).concat(authSlice.middleware).concat(profileSlice.middleware).concat(userManagementSlice.middleware).concat(orderSlice.middleware).concat(productSlice.middleware), // Add RTK Query middleware
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
