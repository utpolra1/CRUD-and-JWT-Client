import React, { useContext, useEffect, useState } from "react";
import Hooks from "../Hooks/Hooks";
import { NavLink } from "react-router-dom";
import { authContext } from "../Firebase/AuthProvider";
import { toast } from "react-toastify";

const Cards = ({ datas }) => {
  const [recentPost, setRecentPost] = useState(null);
  const { _id, title, shortdescription, image, currentTime, category } = datas || {};
  const { data, loading } = Hooks();
  const {user}=useContext(authContext);

  useEffect(()=>{
    const sortedData = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    setRecentPost(sortedData[0]);
  })


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



  // useEffect(() => {
  //   if (data) {
  //     const singleData = data?.find((item) => item._id == _id);
  //     setSingleData(singleData);
  //   }
  // }, [data, _id]);

  return (
    <div>
      <div
        className="border h-full shadow-xl flex rounded-lg p-7"
        data-aos="zoom-in-down"
      >
        <figure className="">
          <img className="w-[2500px] h-[400px] rounded-xl" src={image} alt="Shoes" />
        </figure>
        <div className="card-body" data-aos="flip-right">
          <h2 className="card-title">{title}</h2>
          <p>
            <span className="font-bold">Description: </span>
            {shortdescription}
          </p>
          <p><span className="font-bold">Category: </span>{category}</p>
          <div>
          </div>
          <div className="flex items-center justify-between">
            <div className=" gap-8 flex">
              <NavLink to={`/blogdetails/${_id}`}>
                <span className=" btn font-bold">View Details</span>
              </NavLink>
              <NavLink onClick={handleWishlist}>
                <span className=" btn font-bold">Add Wishlist</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
