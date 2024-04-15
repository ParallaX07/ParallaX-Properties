import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./components/Forms/Login";
import Register from "./components/Forms/Register";
import AuthProvider from "./Auth/AuthProvider";
import "animate.css";
import UpdateProfile from "./components/Forms/UpdateProfile";
import PrivateRoute from "./Auth/PrivateRoute";
import ErrorPage from "./components/ErrorPage";
import HomeBody from "./components/HomeBody/HomeBody";
import Root from "./pages/Root";
import PropertyPage from "./pages/PropertyPage";
import AllProperties from "./pages/AllProperties";
import Favorites from "./components/Favorites/Favorites";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <HomeBody />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/update-profile",
                element: (
                    <PrivateRoute>
                        <UpdateProfile />
                    </PrivateRoute>
                ),
            },
            {
                path: "/property/:id",
                element: (
                    <PrivateRoute>
                        <PropertyPage />
                    </PrivateRoute>
                ),
            },
            {
                path: "/favorites",
                element: (
                    <PrivateRoute>
                        <Favorites />
                    </PrivateRoute>
                ),
            },
            {
                path: "/all-properties",
                element: <AllProperties />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router}></RouterProvider>
        </AuthProvider>
    </React.StrictMode>
);
