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
    const image = user?.photoURL;
    const textcomment = e.target.textComment.value;

    const newComents = { email, id, textcomment, image };
    fetch("https://b9-a-assignment-11-server.vercel.app/comments", {
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
      const res = await fetch(
        "https://b9-a-assignment-11-server.vercel.app/comments"
      );
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
                <div className="">
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
                    <h2 className="card-title mt-10">{datas?.title}</h2>
                    <h1>
                      <span className="font-bold">Description: </span>
                      {datas.shortdescription}
                    </h1>

                    <h1>
                      <span className="font-bold">More Details: </span>
                      {datas?.longDescription}
                    </h1>
                  </div>
                  <div>
                    {datas?.email === user.email && (
                      <div>
                        <NavLink to={`/updateBlog/${datas?._id}`}>
                          <button className="btn m-10">Update Blog</button>
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
              <div className="flex items-center pl-6">
                <img
                  className="w-24 h-20 rounded-full"
                  src={item?.image}
                  alt=""
                />
                <h1 className="lg:text-3xl p-5 font-bold">
                  {item?.textcomment}
                </h1>
              </div>
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
      {datas?.email !== user.email && (
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
                className="lg:w-[600px] lg:h-[200px] rounded-xl"
                name="textComment"
                id=""
                placeholder="Enter Your Comments Here....."
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
