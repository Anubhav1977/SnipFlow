import React from "react";
import { CircleLoader } from "react-spinners";

function Loader() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <CircleLoader size={60} color="#3b82f6" />
    </div>
  );
}

export default Loader;
