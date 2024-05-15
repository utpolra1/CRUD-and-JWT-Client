import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import AddBlog from "./Components/AddBlog.jsx";
import Root from "./Roots/Root.jsx";
import Login from "./Components/User/Login.jsx";
import AuthProvider from "./Components/Firebase/AuthProvider.jsx";
import Register from "./Components/User/Register.jsx";
import Home from "./Components/Home/Home.jsx";
import About from "./Components/User/About.jsx";
import PrivetRoute from "./Components/PrivetRoute/PrivetRoute.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Allblogs from "./Components/CardIteams/Allblogs.jsx";
import Wishlist from "./Components/Wishlist/Wishlist.jsx";
import ViewDetails from "./Components/CardIteams/ViewDetails.jsx";
import ViewDetailss from "./Components/CardIteams/ViewDetailss.jsx";
import UpdateBlog from "./Components/CardIteams/UpdateBlog.jsx";
import UpdateComments from "./Components/CardIteams/UpdateComments.jsx";
import FeaturedBlog from "./Components/Featured/FeaturedBlog.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: (
      <div>
        <Navbar></Navbar>
        <div className="text-3xl font-extrabold text-red-500 items-center text-center my-32">
          {" "}
          404 page.... !
        </div>
        <Footer></Footer>
      </div>
    ),
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/addblog",
        element: (
          <PrivetRoute>
            <AddBlog></AddBlog>
          </PrivetRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "/allblogs",
        element: <Allblogs></Allblogs>,
      },
      {
        path: "/blogdetails/:_id",
        element: (
          <PrivetRoute>
            <ViewDetails></ViewDetails>
          </PrivetRoute>
        ),
      },
      {
        path: "blogdetailss/:_id",
        element: (
          <PrivetRoute>
            <ViewDetailss></ViewDetailss>
          </PrivetRoute>
        ),
      },
      {
        path: "/about",
        element: (
          <PrivetRoute>
            <About></About>
          </PrivetRoute>
        ),
      },
      {
        path: "/wishlist",
        element: <Wishlist></Wishlist>,
      },
      {
        path: "/updateBlog/:id",
        element: <PrivetRoute><UpdateBlog></UpdateBlog></PrivetRoute>,
        loader: ({ params }) =>
          fetch(
            `https://b9-a-assignment-11-server.vercel.app/blog/${params.id}`
          ),
      },
      {
        path: "/updatecomments/:id",
        element:<PrivetRoute><UpdateComments></UpdateComments></PrivetRoute>,
        loader: ({ params }) =>
          fetch(
            `https://b9-a-assignment-11-server.vercel.app/comments/${params.id}`
          ),
      },
      {
        path: "/featuredblogs",
        element: <FeaturedBlog></FeaturedBlog>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthProvider>
  </React.StrictMode>
);
