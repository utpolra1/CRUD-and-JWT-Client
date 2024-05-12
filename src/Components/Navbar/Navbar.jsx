import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { authContext } from "../Firebase/AuthProvider";

const Navbar = () => {
  const { user, logout } = useContext(authContext);

  const hanlelogout = () => {
    logout()
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <div className="navbar bg-slate-300 rounded-lg">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <NavLink to="/">Home</NavLink>
              <NavLink to="/addblog">Add Blog</NavLink>
              <NavLink to="/allblogs">All blogs</NavLink>
              <NavLink to="/featuredblogs">Featured Blogs</NavLink>
              <NavLink to="wishlist">Wishlist</NavLink>
              <NavLink to="about">Profile</NavLink>
            </ul>
          </div>
          <NavLink to="/">
            <img
              className="w-32 h-28"
              src="https://i.ibb.co/7JvFxZz/Eckersley-s-Logo.jpg"
              alt=""
            />
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-4 font-bold text-base">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/addblog">Add Blog</NavLink>
            <NavLink to="/allblogs">All blogs</NavLink>
            <NavLink to="/featuredblogs">Featured Blogs</NavLink>
            <NavLink to="wishlist">Wishlist</NavLink>
            <NavLink to="about">Profile</NavLink>
          </ul>
        </div>
        <div className="navbar-end text-2xl font-bold mr-4">
          {user ? (
            <div>
              <div role="" className="">
                <div className="w-10 rounded-full">
                  <div className="tooltip" data-tip={user.displayName}>
                    <button className="avatar online">
                      <img alt="" src={user.photoURL} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <NavLink to="login">
              <button className="btn">Login</button>
            </NavLink>
          )}
        </div>
        {user && (
          <div>
            <button className="btn btn-active font-bold">
              <a className="" onClick={hanlelogout}>
                Logout
              </a>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
