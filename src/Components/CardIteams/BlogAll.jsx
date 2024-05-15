import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Hooks from "../Hooks/Hooks";
import { authContext } from "../Firebase/AuthProvider";
import { toast } from "react-toastify";

const BlogAll = ({ datas }) => {
  const { _id, title, shortdescription, image, category } = datas || {};
  const { data, loading } = Hooks();
  const { user } = useContext(authContext);
  const handleWishlist = (e) => {
    e.preventDefault();
    if (data && user && user.email) {
      const foundData = data.find((item) => item._id === _id);
      const foundDatas = { ...foundData, email: user.email };
      fetch("https://b9-a-assignment-11-server.vercel.app/wishlist", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(foundDatas),
      })
        .then((res) => res.json)
        .then((data) => {
          toast.success("Wishlist Added Success");
        });
    }
  };
  return (
    <div>
      <div className="overflow-x-auto mt-7 grid grid-cols-2">
        <div className="flex flex-col">
          <h1 className="font-bold">{title}</h1>
          <img
            className="lg:w-[1000px] rounded-md h-[350px]"
            src={image}
            alt=""
          />
          <h1>{shortdescription}</h1>
          <h1><span className="font-bold">Category: </span>{category}</h1>
          <h1></h1>
          <div className="flex gap-5">
            <NavLink to={`/blogdetails/${_id}`}>
              <span className=" btn font-bold">Blog Details</span>
            </NavLink>
            <NavLink onClick={handleWishlist}>
              <span className=" btn font-bold">Add Wishlist</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogAll;
