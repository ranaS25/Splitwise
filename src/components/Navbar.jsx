import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="select-none flex flex-col md:flex-row flex-wrap items-center gap-4 justify-between h-fit overflow-clip w-full p-2 text-white bg-purple-600">
      <h1 className=" text-2xl h-fit font-bold font-serif ">Splitwise</h1>
      <ul className="flex grow justify-center  md:text-xl text-lg ">
        <Link to="/">
          <li
            className={`hover:bg-black/10 py-2 px-4 ${
              location.pathname === "/" ? "border-b-2 " : ""
            }`}
          >
            Home
          </li>
        </Link>
        <Link to="/balance-sheet">
          <li
            className={` hover:bg-black/10 py-2 px-4 ${
              location.pathname === "/balance-sheet" ? "border-b-2 " : ""
            }`}
          >
            Balance Sheet
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
