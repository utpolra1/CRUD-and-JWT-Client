import React, { useContext, useEffect, useState } from "react";
import Hooks from "../Hooks/Hooks";
import { NavLink, Navigate, useLoaderData, useParams } from "react-router-dom";
import { authContext } from "../Firebase/AuthProvider";
import { toast } from "react-toastify";

const ViewDetails = () => {
  const { data, loading } = Hooks();
  const [singleData, setSingleData] = useState([]);
  const { _id } = useParams();
  const { user } = useContext(authContext);
  const [datas, setdatas] = useState([]);
  const [commentData, SetCommentData] = useState([]);
  const [singleComment, SetaSigleComment] = useState([]);

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

  //HandleAddcommetn add.....
  const handleAddComment = (e) => {
    e.preventDefault();

    const id = datas?._id;
    const email = user?.email;
    const textcomment = e.target.textComment.value;

    const newComents = { email, id, textcomment };
    fetch("http://localhost:5000/comments", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newComents),
    })
      .then((res) => res.json)
      .then((data) => {
        toast.success("Comment Added Success");
      });
  };

  //coment data load
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:5000/comments");
      const data = await res.json();
      SetCommentData(data);
    };
    fetchData();
  }, [commentData]);

  useEffect(() => {
    if (commentData) {
      const filteredComments = commentData.filter(
        (comment) => comment.id === datas?._id
      );
      // Set the filtered comments array to the state
      SetaSigleComment(filteredComments);
    }
  }, [commentData, datas?._id]);

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
                      <img
                        className="rounded-lg lg:w-[700px] lg:h-[600px] mt-5"
                        src={datas.image}
                        alt="car!"
                      />
                    </figure>
                  </div>
                  <div className="flex flex-col gap-5 pl-3">
                    <h2 className="card-title mt-10">{datas.item_name}</h2>
                    <h1 className="font-bold">
                      Segment_name: {datas.subcategory_Name}
                    </h1>
                    <h1>
                      <span className="font-bold">UserName: </span>
                      {datas?.userName}
                    </h1>
                    <h1>
                      <span className="font-bold">Description: </span>
                      {datas.shortdescription}
                    </h1>
                    <h1>
                      <span className="font-bold">Price: </span>
                      {datas.price}
                    </h1>
                    <h1>
                      <span className="font-bold">Status: </span>
                      {datas.stockStatus}
                    </h1>
                    <h1>
                      <span className="font-bold">Email: </span>
                      {datas.email}
                    </h1>
                    <h1>
                      <span className="font-bold">Customization: </span>
                      {datas?.customization}
                    </h1>
                    <h1>
                      <span className="font-bold">Processing_time: </span>
                      {datas?.processing_time}
                    </h1>
                    <h1>
                      <span className="font-bold">Rating: </span>
                      {datas?.rating}
                    </h1>
                  </div>
                  <div>
                    {datas?.email === user.email && (
                      <div>
                        <NavLink to={`/updateBlog/${datas?._id}`}>
                          <button className="btn">Update Blog</button>
                        </NavLink>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div>
        {singleComment?.map((item) => (
          <div>
            <div className="border m-5 rounded-lg shadow-md ">
              <h1 className="text-3xl p-5 font-bold">{item?.textcomment}</h1>
              <div>
                {item?.email === user.email && (
                  <div>
                    <NavLink to={`/updatecomments/${item?._id}`}>
                      <button className="m-4 btn">Edite Comments</button>
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {datas?.email === user.email && (
        <div className="m-10 flex gap-5 items-center">
          <div className="items-center text-center">
            <img src={user?.photoURL} alt="" />
            <h1 className="font-bold">{user.displayName}</h1>
          </div>
          <div>
            <form
              className="flex flex-col gap-4"
              onSubmit={handleAddComment}
              action=""
            >
              <textarea
                className="w-[600px] h-[200px] rounded-xl"
                name="textComment"
                id=""
              ></textarea>
              <button className="btn">Add Comment</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewDetails;
