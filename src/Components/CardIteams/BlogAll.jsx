import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Hooks from "../Hooks/Hooks";
import { authContext } from "../Firebase/AuthProvider";
import { toast } from "react-toastify";

const BlogAll = ({ datas }) => {
  const { _id, title } = datas || {};
  const { data, loading } = Hooks();
  const {user}=useContext(authContext);


  const handleWishlist=e=>{
    e.preventDefault();
    if (data && user && user.email) {
      const foundData = data.find((item) => item._id === _id);

      const foundDatas={ ...foundData, email: user.email };
      console.log(foundDatas)


      fetch("http://localhost:5000/wishlist",{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(foundDatas)
        })
        .then(res=>res.json)
        .then(data=>{
          toast.success("Product Added Success");
        })
    }
  }
  return (
    <div>
      <div className="overflow-x-auto">
        <div>
          <h1>{title}</h1>
          <NavLink to={`/blogdetails/${_id}`}>
            <span className=" btn font-bold">Blog Details</span>
          </NavLink>
          <NavLink onClick={handleWishlist}>
            <span className=" btn font-bold">Add Wishlist</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default BlogAll;
