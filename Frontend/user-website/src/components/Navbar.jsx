import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const regex = /^\/dashboard\/exam\/\d+$/;
  if (
    !location.pathname.includes("/dashboard/exam/") &&
    !regex.test(location.pathname)
  ) {
    return (
      <nav className="w-full flex justify-between items-center px-5 py-2 bg-slate-50 shadow-lg z-20 sticky h-[10vh]">
        <Link to={"/"}>
          <p className="text-xl font-semibold">User Website</p>
        </Link>
      </nav>
    );
  } else {
    return null;
  }
};

export default Navbar;
