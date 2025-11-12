import React from "react";
import { NavLink } from "react-router-dom";

export default function Error() {
  return (
    <div className="bg-[#146EB4] min-h-screen flex items-center justify-center">
      <div className="bg-white w-1/2 flex flex-col items-center rounded-sm py-2 gap-4">
        <h1 className="text-4xl font-bold">Error 404</h1>
        <h1 className="text-2xl font-medium">Page does not exist !</h1>
        <NavLink
          to={"/"}
          className="border-2 font-medium bg-[#146EB4] text-white border-[#146EB4] w-1/2 text-center rounded-sm py-1 hover:text-[#146EB4] hover:bg-white"
        >
          Home
        </NavLink>
      </div>
    </div>
  );
}
