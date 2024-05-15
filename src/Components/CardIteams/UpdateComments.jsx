import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { authContext } from "../Firebase/AuthProvider";
import { toast } from "react-toastify";

const UpdateComments = () => {
  const job = useLoaderData();
  const { _id } = job || {};

  const { user } = useContext(authContext);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const textComment = form.textComment.value;
    const jobData = {
      textComment,
    };

    fetch(`https://b9-a-assignment-11-server.vercel.app/comments/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobData),
    })
      .then((res) => res.json())
      .then((data) => toast.success("Comments Is Updated"));
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12">
      <section className=" p-2 md:p-6 mx-auto bg-white rounded-md shadow-md ">
        <h2 className="text-lg font-semibold text-gray-700 capitalize ">
          Update a Comments
        </h2>

        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col gap-2 mt-4">
            <label className="text-gray-700 " htmlFor="description">
              Text-Comment
            </label>
            <textarea
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              name="textComment"
              id="textComment"
              cols="30"
            ></textarea>
          </div>
          <div className="flex justify-end mt-6">
            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Update
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UpdateComments;
