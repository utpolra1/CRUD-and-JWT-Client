import React, { useEffect } from "react";
import Hooks from "../Hooks/Hooks";
import BlogAll from "./BlogAll";
import BlogFilter from "./BlogFilter";
import { useSearchParams } from "react-router-dom";

const Allblogs = () => {
  const { data, loading } = Hooks();
  const [searchparam]=useSearchParams();
  const search=searchparam.get('search') === null ? ' ' : searchparam.get('search');

  useEffect(()=>{
    filterBlog();
  },[])
  const filterBlog =()=>{
     if(search.length){
      const filtered=data.filter(data=>{
        if(search.length>0 && ! data?.title.include(search)){
          return false;
         }
         return true;
      })
     }
     }

  return (
    <div className="my-10">
      {loading ? (
        <div className="text-primary">
          <div className='items-center text-center'><span className="loading loading-spinner text-primary w-44"></span></div>
        </div>
      ) : (
        <div>
          <BlogFilter></BlogFilter>
          <div className="items-center grid">
          {data.map((datas) => (
            <BlogAll key={datas.id} datas={datas}></BlogAll>
          ))}
        </div>
        </div>
      )}
    </div>
  );
};

export default Allblogs;
