import React, { useContext } from "react";
import { authContext } from "../Firebase/AuthProvider";

const About = () => {
  const { user, updateProfilec } = useContext(authContext);

  if (!user) {
    return null;
  }

  return (
    <>
    <div className="flex justify-center mt-5 ">
      <div className="card w-96 bg-base-100 shadow-xl border m-10">
        <figure className="px-10 pt-10">
          <div className="rounded-full w-24 avatar online">
          {user.photoURL && (
            <img src={user.photoURL} alt="Shoes"  />
          )}
          </div>
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Name: {user.displayName}</h2>
          <h1>Gmail: {user.email}</h1>
        </div>
      </div>
    </div>
    </>
  );
};

export default About;