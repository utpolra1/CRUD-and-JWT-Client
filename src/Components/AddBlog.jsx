import React, { useContext } from "react";
import { authContext } from "./Firebase/AuthProvider";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const AddBlog = () => {
  const { user } = useContext(authContext);

  const location = useLocation();
  const navigate = useNavigate();

  const handleAddblog = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const image = e.target.image.value;
    const shortdescription = e.target.shortdescription.value;
    const category = e.target.category.value;
    const longDescription = e.target.longdescription.value;
    const currentTime = new Date().toISOString();
    const email = user?.email;

    const newblog = {
      title,
      image,
      shortdescription,
      category,
      longDescription,
      currentTime,
      email,
    };

    fetch("https://b9-a-assignment-11-server.vercel.app/blog", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newblog),
    })
      .then((res) => res.json)
      .then((data) => {
        navigate("/");
        toast.success("Blog Added Success");
      });
  };
  return (
    <div>
      <div className="min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card shrink-0 w-full shadow-2xl bg-base-100">
            <form onSubmit={handleAddblog} className="card-body">
              <h1 className="text-3xl items-center text-center font-bold">
                Add Blogs
              </h1>
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Title</span>
                  </label>
                  <input
                    name="title"
                    type="text"
                    placeholder="Title"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Image_Url</span>
                  </label>
                  <input
                    name="image"
                    type="text"
                    placeholder="Image_Url"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">
                      Short description
                    </span>
                  </label>
                  <input
                    name="shortdescription"
                    type="text"
                    placeholder="Short Description"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Category</span>
                  </label>
                  <input
                    name="category"
                    type="text"
                    placeholder="Category"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">
                      Long description
                    </span>
                  </label>
                  <input
                    name="longdescription"
                    type="text"
                    placeholder="Long description"
                    className="input input-bordered"
                    required
                  />
                </div>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
