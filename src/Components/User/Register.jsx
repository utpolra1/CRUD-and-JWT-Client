import React, { useContext, useEffect, useState } from "react";
import { NavLink,useLocation,useNavigate } from "react-router-dom";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa6";
// import AOS from "aos";
// import 'aos/dist/aos.css';
import { authContext } from "../Firebase/AuthProvider";

const Register = () => {
  const [error, seterror]=useState(" ");
  const [erroruser, seterrorUser]=useState(" ");
  const location=useLocation();
  const navigate=useNavigate();
  const [showPassword, setShowpassword]=useState(false);

  const { user, createUser, updateProfilec, googleLogin, githubLogin } =
    useContext(authContext);

    const googlLogin = () => {
      googleLogin()
        .then((user) => {
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

  const hanleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const displayName = e.target.name.value;
    const photoUR = e.target.photoUR.value;
    const Confrimpassword=e.target.Confrimpassword.value;

    if (password.length < 6) {
      seterror("Password must be at least 6 character!");
      toast.error("Password must be at least 6 character!");
      return;
    }
    else if(password !== Confrimpassword){
      seterror("Password not match");
      toast.error("Password not match");
      return
    }
    else if (!/[a-z]/.test(password)) {
      seterror('Password must contain at least one lower letter.');
      toast.error('Password must contain at least one lower letter.')
      return;
    }

    else if (!/[A-Z]/.test(password)) {
    seterror('Password must contain at least one uppercase letter.');
    toast.error("Password must contain at least one uppercase letter.");
    return;
  }
  seterror(" ");
    createUser(email, password)
      .then((result) => {
        updateProfilec(displayName, photoUR);
        navigate(location?.state ? location.state : "/");
        toast.success("SingUp Success");
      })
      .catch((error) => {
        toast.error("This email allready Use")
        seterrorUser("This email allready Use");
      });
  };

//   useEffect(() => {
//     AOS.init({
//       duration: 2000, // Set animation duration
//     });
//   }, []); 
  return (
    <div className="mt-5">
      <div className="min-h-screen bg-base-200 mt-5">
        <div className="hero-content flex-col" data-aos="zoom-in-down">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={hanleRegister} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="input input-bordered"
                  required
                />
              </div>
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
                <div>
                <h1 className="text-red-600 text-[15px] font-bold">{error}</h1>
              </div>
                <label className="label"></label>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confrim Password</span>
                </label>
                <input
                  name="Confrimpassword"
                  type="password"
                  placeholder="Confrim password"
                  className="input input-bordered"
                  required
                />
                <label className="label"></label>
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Image URL</span>
                </label>
                <input
                  name="photoUR"
                  type="text"
                  placeholder="Image URL"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
                <h1 className="font-bold text-red-500 pt-3">{erroruser}</h1>
              </div>
              <div>
                <h1 className="font-bold text-center">
                  Already Have account{" "}
                  <NavLink to="/login">
                    <span className="text-blue-600">Login Now</span>
                  </NavLink>
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

export default Register;