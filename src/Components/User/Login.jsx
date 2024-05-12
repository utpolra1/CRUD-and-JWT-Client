import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation,useNavigate } from "react-router-dom";
import { authContext } from "../Firebase/AuthProvider";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa6";
import { FaGithub, FaGoogle } from "react-icons/fa";


const Login = () => {
  const [errorUser,seterrorUser]=useState(" ");
  const { login,googleLogin,githubLogin } = useContext(authContext);
  const [showPassword, setShowpassword]=useState(false);

  
  const location=useLocation();
  const navigate=useNavigate();

  const hanlelogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    login(email, password)
      .then((result) => {
        navigate(location?.state ? location.state : "/");
        toast.success("Lgin Success");
      })
      .catch((error) => {
        toast.error("Sorry... Password Wrong..!");
        seterrorUser("Sorry... Password Wrong..!");
      });
  };

  const googlLogin = () => {
    googleLogin()
    .then(() => {
      toast.success("SignUp Success");
      navigate(location?.state ? location.state : "/");
    })
    .catch((error) => console.log(error));
  };
  

const GithubLogin =async () => {
  await githubLogin()
  .then(() =>{
    navigate(location?.state ? location.state : "/");
    toast.success("SingUp Success");
  })
  .catch((error) => console.log(error));
};

  return (
    <div>
      <div className="min-h-screen bg-base-200 rounded-3xl mt-5" >
        <div className="hero-content flex-col" >
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-white rounded-2xl">
            <form onSubmit={hanlelogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                   name="password"
                   type={showPassword ? "text" :"password"}
                   placeholder="password"
                   className="input input-bordered relative"
                   required
                 />
                 <span className="absolute pt-[50px] ml-72" onClick={()=>setShowpassword(!showPassword)}><FaEye></FaEye></span>
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
                <h1 className="text-red-500 font-bold pt-3">{errorUser}</h1>
              </div>
              <div>
                <h1 className="font-bold text-center">
                  If new plase{" "}
                  <NavLink to="/register">
                    <span className="text-blue-500 ">Register Now</span>
                  </NavLink>{" "}
                </h1>
              </div>
              <div className="flex justify-center gap-5 border-y-2 py-2 mt-2">
                <NavLink>
                  <button onClick={googlLogin}>
                  <FaGoogle style={{ fontSize: "2rem" }}></FaGoogle>
                  </button>
                </NavLink>
                <NavLink>
                  <button onClick={GithubLogin}>
                  <FaGithub style={{ fontSize: "2rem" }}></FaGithub>
                  </button>
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;