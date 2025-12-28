import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-slate-800 text-white shadow-md w-full">
      <div className=" flex items-center justify-between px-6 py-4">
        {/* Brand Name */}
        <h2
          className="text-2xl font-bold tracking-tight cursor-pointer"
          onClick={() => navigate("/")}
        >
          SnipFlow
        </h2>

        {/* Navigation Links */}
        <div className="flex font-medium gap-6 ">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-400" : "hover:text-blue-300"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/snips"
            className={({ isActive }) =>
              isActive ? "text-blue-400" : "hover:text-blue-300"
            }
          >
            Snips
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
