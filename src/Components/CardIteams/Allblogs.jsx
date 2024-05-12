import React from "react";
import Hooks from "../Hooks/Hooks";
import BlogAll from "./BlogAll";

const Allblogs = () => {
  const { data, loading } = Hooks();

  return (
    <div className="my-10">
      {loading ? (
        <div className="text-primary">
          <div className='items-center text-center'><span className="loading loading-spinner text-primary w-44"></span></div>
        </div>
      ) : (
        <div className="items-center">
          <div className="overflow-x-auto ">
          </div>
          {data.map((datas) => (
            <BlogAll key={datas.id} datas={datas}></BlogAll>
          ))}
        </div>
      )}
    </div>
  );
};

export default Allblogs;
