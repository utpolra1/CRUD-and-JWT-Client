import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../Firebase/AuthProvider";
import { NavLink, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Wishlist = () => {
  const { user } = useContext(authContext);
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(null);

  useEffect(() => {
    const userData = data.filter((item) => item?.email === user?.email);
    if (userData.length > 0) {
      setItem(userData);
    }
  }, [data, user?.email]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch("http://localhost:5000/wishlist");
      const data = await res.json();
      setdata(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  //remove wishlist
  const handleRemove = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/wishlist/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            if (result.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              const remaining = data.filter((item) => item._id !== id);
              setItem(remaining);
            }
          });
          console.log("delte successs")
      }
    });
  };

  return (
    <div>
      {item?.map((data) => (
        <div className="flex flex-col gap-4 mb-10 border rounded-md p-3">
          <h1 className="font-bold text-center">{data?.title}</h1>
          <div className="flex justify-center items-center gap-5">
            <img className="w-52 h-52 rounded-lg" src={data?.image} alt="" />
            <h1>{data?.shortdescription}</h1>
          </div>
          <div className="flex gap-10">
            <NavLink to={`/blogdetailss/${data?._id}`}>
              <span className="btn font-bold">View Details</span>
            </NavLink>
            <button className="btn" onClick={() => handleRemove(data?._id)}>
              Remove wishlist
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
