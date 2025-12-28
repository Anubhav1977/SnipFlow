import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 w-full mt-16">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-white">SnipFlow</h2>
          <p className="text-sm text-gray-400 mt-1">
            Save, manage, and share code snippets effortlessly.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex gap-6 text-sm font-medium">
          <NavLink to="/" className="hover:text-white transition">
            Home
          </NavLink>
          <NavLink to="/snips" className="hover:text-white transition">
            Snips
          </NavLink>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-500 text-center md:text-right">
          © {new Date().getFullYear()} SnipFlow. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
