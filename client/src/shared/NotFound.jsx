import React from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineCodeBracketSquare } from "react-icons/hi2";
import { FaHome, FaListUl } from "react-icons/fa";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-slate-200">
      <h2 className="mb-20 text-4xl font-bold text-white tracking-tight ">
        SnipFlow
      </h2>

      {/* Icon */}
      <div className="mb-6 text-blue-400">
        <HiOutlineCodeBracketSquare size={80} />
      </div>

      {/* 404 */}
      <h1 className="text-7xl font-extrabold tracking-wider text-white mb-2">
        404
      </h1>

      {/* Message */}
      <p className="text-xl text-slate-300 mb-2 text-center">
        Looks like this page escaped the repo.
      </p>
      <p className="text-sm text-slate-400 mb-8 text-center">
        Either it was deleted… or it never existed in the first place.
      </p>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors"
        >
          <FaHome />
          Go Home
        </button>

        <button
          onClick={() => navigate("/snips")}
          className="flex items-center gap-2 px-5 py-2 rounded-md bg-slate-700 hover:bg-slate-600 text-white transition-colors"
        >
          <FaListUl />
          View Snips
        </button>
      </div>

      {/* Small footer humor */}
      <div className="mt-10 text-xs text-slate-500">
        Error code: <span className="text-slate-400">PAGE_NOT_FOUND</span>
      </div>
    </div>
  );
}

export default NotFound;
