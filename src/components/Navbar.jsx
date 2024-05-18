import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Netflix from "../assets/netflix.svg";
import { useUserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logOut } = useUserAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute w-full p-4 flex items-center justify-between z-50">
      <Link to="/">
        <img
          className="w-[5.5625rem] h-6 lg:h-10 lg:w-[9rem] "
          src={Netflix}
          alt="netflix"
        />
      </Link>

      {user?.email ? (
        <div>
          <Link to="/profile">
            <button className="capitalize pr-4">Profile</button>
          </Link>

          <button
            onClick={handleLogout}
            className="capitalize bg-red-600 px-6 py-2 rounded cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div>
          {location.pathname !== "/signin" && (
            <Link to="/signin">
              <button className="capitalize bg-gray-200 hover:opacity-90 rounded bg-opacity-35 py-2 px-3 mr-2">
                Sign in
              </button>
            </Link>
          )}
          {location.pathname !== "/signup" && (
            <Link to="/signup">
              <button className="capitalize hover:opacity-90 bg-red-600 px-6 py-2 rounded cursor-pointer">
                sign Up
              </button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
