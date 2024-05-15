import React, { useContext, useEffect, useState } from "react";
import Hooks from "../Hooks/Hooks";
import { NavLink } from "react-router-dom";
import { authContext } from "../Firebase/AuthProvider";
import { toast } from "react-toastify";

const Cards = ({ datas }) => {
  const [recentPost, setRecentPost] = useState(null);
  const { _id, title, shortdescription, image, currentTime, category } =
    datas || {};
  const { data, loading } = Hooks();
  const { user } = useContext(authContext);

  useEffect(() => {
    const sortedData = data.sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );
    setRecentPost(sortedData[0]);
  });

  const handleWishlist = (e) => {
    e.preventDefault();
    if (data && user && user.email) {
      const foundData = data.find((item) => item._id === _id);

      const foundDatas = { ...foundData, email: user.email };
      console.log(foundDatas);

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

  // useEffect(() => {
  //   if (data) {
  //     const singleData = data?.find((item) => item._id == _id);
  //     setSingleData(singleData);
  //   }
  // }, [data, _id]);

  return (
    <div
      className="shadow-sm flex flex-col lg:flex-row rounded-lg p-7"
      data-aos="zoom-in-down"
    >
      <div className="w-[50%] ml-8 justify-center flex">
        <img
          className="w-[800px] lg:h-[400px] rounded-xl items-center"
          src={image}
          alt="Shoes"
        />
      </div>
      <div className="card-body lg:w-[50%]" data-aos="flip-right">
        <h2 className="card-title">{title}</h2>
        <p>
          <span className="font-bold">Description: </span>
          {shortdescription}
        </p>
        <p>
          <span className="font-bold">Category: </span>
          {category}
        </p>
        <div></div>
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
  );
};

export default Cards;
