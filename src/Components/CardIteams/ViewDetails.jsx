import React, { useEffect, useState } from "react";
import Hooks from "../Hooks/Hooks";
import { NavLink, useParams } from "react-router-dom";

const ViewDetails = () => {
  const { data, loading } = Hooks();
  const [singleData, setSingleData] = useState();
  const { _id } = useParams();

  const [datas, setdatas] = useState();


  useEffect(() => {
    if (data) {
      const singleData = data.find((item) => item._id == _id);
      setdatas(singleData);
    }
  }, [data, _id]);

  useEffect(() => {
    if (data) {
      const singleData = data?.find((item) => item._id == _id);
      setSingleData(singleData);
    }
  }, [data, _id]);
  return (
    <div>
      <div className="">
        <div className="mt-5">
          {datas && (
            <>
            <div className="card glass">
                <div className="grid lg:grid-cols-3">
                  <div className="col-span-2">
                    <figure>
                      <img className="rounded-lg lg:w-[700px] lg:h-[600px] mt-5" src={datas.image} alt="car!" />
                    </figure>
                  </div>
                  <div className="flex flex-col gap-5 pl-3">
                  <h2 className="card-title mt-10">{datas.item_name}</h2>
                  <h1 className="font-bold">Segment_name: {datas.subcategory_Name}</h1>
                  <h1><span className="font-bold">UserName: </span>{datas?.userName}</h1>
                  <h1><span className="font-bold">Description: </span>{datas.shortdescription}</h1>
                  <h1><span className="font-bold">Price: </span>{datas.price}</h1>
                  <h1><span className="font-bold">Status: </span>{datas.stockStatus}</h1>
                  <h1><span className="font-bold">Email: </span>{datas.email}</h1>
                  <h1><span className="font-bold">Customization: </span>{datas?.customization}</h1>
                  <h1><span className="font-bold">Processing_time: </span>{datas?.processing_time}</h1>
                  <h1><span className="font-bold">Rating: </span>{datas?.rating}</h1>

                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
