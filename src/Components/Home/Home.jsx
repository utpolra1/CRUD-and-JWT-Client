import React, { useEffect, useState } from "react";
import Hooks from "../Hooks/Hooks";
import Cards from "./Cards";
import Banner from "./Banner/Banner";
import { toast } from "react-toastify";
import Marquee from "react-fast-marquee";

const Home = () => {
  const { data, loading } = Hooks();
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      // Sort the data array by currentTime in descending order
      const sortedData = data
        .slice()
        .sort((a, b) => new Date(b.currentTime) - new Date(a.currentTime));
      // Set the most recent posts
      setRecentPosts(sortedData);
    }
  }, [data]);

  const handleToast=(e)=>{
    e.preventDefault();
    toast.success("Thank you for subscribing to our newsletter")
  }

  return (
    <div>
      <Banner />
      <div className="mb-20">
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-extrabold text-3xl mb-5">Recent Blogs</h1>
        </div>
        {loading ? (
          <div className="items-center text-center">
            <span className="loading loading-spinner text-primary w-44"></span>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-10 ">
            {recentPosts.map((post) => (
              <Cards key={post.id} datas={post} />
            ))}
          </div>
        )}
      </div>
      <div className="bg-teal-200 rounded-t-2xl p-20 my-5 flex gap-6">
        <div className="">
          <img
            className="rounded-2xl"
            src="https://xcare-demo.pbminfotech.com/demo6/wp-content/uploads/sites/13/2024/04/dental-clinic-01.jpg"
            alt=""
          />
        </div>
        <div className="items-center text-center flex flex-col justify-center gap-5">
          <h1 className="text-3xl font-bold">Are you looking for a dentist give you that special smile?</h1>
          <div>
          <form onSubmit={handleToast} action="">
          <input
            className="rounded-md h-12"
            placeholder="Enter Your Email"
            type="email"
            required
          />
          <button className="btn">Subscribe</button>
          </form>
        </div>
        </div>
      </div>
      <div>
        <Marquee>
          <img src="https://xcare-demo.pbminfotech.com/demo3/wp-content/uploads/sites/6/2024/01/client-global-02.png" alt="" />
          <img src="https://xcare-demo.pbminfotech.com/demo3/wp-content/uploads/sites/6/2024/01/client-global-06.png" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
        </Marquee>
      </div>
    </div>
  );
};

export default Home;
