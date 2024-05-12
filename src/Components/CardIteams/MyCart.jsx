import React, { useContext, useEffect, useState } from "react";
import Hooks from "../Hooks/Hooks";
import { authContext } from "../Firebase/AuthProvider";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

const MyCart = () => {
  const [item, setItem] = useState(null);

  const { user } = useContext(authContext);
  const { data, loading } = Hooks();

  useEffect(() => {
    const userData = data.filter((item) => item?.email === user?.email);
    if (userData.length > 0) {
      setItem(userData);
    }
  }, [data, user?.email]);

  const handleDelte = (id) => {
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
        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success"

        // });
        console.log("Delte this item");
        fetch(`https://b9-a-assignment-10-server.vercel.app/product/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              console.log("delete succes");
              Swal.fire({
                title: "Deleted!",
                text: "Your Product has been deleted.",
                icon: "success",
              });

              const remaininuser=item.filter(item=>item._id !==_id);
              setItem(remaininuser);
            }
          });
      }
    });
  };

  return (
    <div className="mt-7 mb-8">
      {loading ? (
        <div className="items-center text-center">
          <span className="loading loading-spinner text-primary w-44"></span>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-5 justify-center md:grid-cols-2">
          {item?.map((item) => (
            <div>
              <div className="grid lg:grid-cols-3 gap-5 justify-center md:grid-cols-2">
                <div
                  className="card w-96 border h-full shadow-xl"
                  data-aos="zoom-in-down"
                >
                  <figure>
                    <img
                      className="h-80 w-72 rounded-xl mt-4"
                      src={item?.image}
                      alt="Shoes"
                    />
                  </figure>
                  <div className="card-body" data-aos="flip-right">
                    <h2 className="card-title">{item?.item_name}</h2>
                    <h1 className="font-bold">
                      Subcategory_Name: {item?.subcategory_Name}
                    </h1>
                    <p>
                      <span className="font-bold">Description: </span>
                      {item?.shortdescription}
                    </p>
                    <div>
                      <h1 className="font-bold">Price: {item?.price}</h1>
                      <h1>
                        <span className="font-bold">Status: </span>
                        {item?.stockStatus}
                      </h1>
                      <h1><span className="font-bold">Customization: </span>{item?.customization}</h1>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="">
                        <NavLink to={`/blogdetails/${item?._id}`}>
                          <span className=" btn font-bold">Blog Details</span>
                        </NavLink>
                      </div>
                      <div className="">
                        <button
                          onClick={() => handleDelte(item?._id)}
                          className="btn"
                        >
                          Delete
                        </button>
                        <button className="btn ml-2">Update</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCart;
