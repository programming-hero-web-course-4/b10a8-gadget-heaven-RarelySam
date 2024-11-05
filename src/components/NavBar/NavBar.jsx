import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const currentPath = useLocation().pathname;

  function getWishlistedLength() {
    const wishlist = localStorage.getItem('wishlist');

    if (wishlist) {
      const parsedWishlist = JSON.parse(wishlist);
      return parsedWishlist.length;
    } else {
      return 0;
    }
  }function getCartLength() {
    const wishlist = localStorage.getItem('cart');

    if (wishlist) {
      const parsedWishlist = JSON.parse(wishlist);
      return parsedWishlist.length;
    } else {
      return 0;
    }
  }

  return (
    <nav className={currentPath == '/' ? "bg-purple-800" : "bg-base-100"}>
      <div className="navbar max-w-7xl mx-auto">
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/" className={currentPath == "/" ? "font-bold" : ""}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/statistics"
                  className={currentPath == "/statistics" ? "font-bold" : ""}
                >
                  Statistics
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className={currentPath == "/dashboard" ? "font-bold" : ""}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/warranty-policy"
                  className={
                    currentPath == "/warranty-policy" ? "font-bold" : ""
                  }
                >
                  Warranty Policy
                </Link>
              </li>
            </ul>
          </div>
          <Link to='/' className="btn btn-ghost text-xl text-white max-sm:text-sm">
            {" "}
            <img src="assets/logo.png" alt="" className="w-8" />
            Gadget Heaven
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            <li>
              <Link
                to="/"
                className={
                  currentPath == "/"
                    ? "font-bold bg-base-300 hover:bg-base-300"
                    : "text-white"
                }
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/statistics"
                className={
                  currentPath == "/statistics"
                    ? "font-bold bg-base-300 hover:bg-base-300"
                    : "text-white"
                }
              >
                Statistics
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className={
                  currentPath == "/dashboard"
                    ? "font-bold bg-base-300 hover:bg-base-300"
                    : "text-white"
                }
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/warranty-policy"
                className={
                  currentPath == "/warranty-policy"
                    ? "font-bold bg-base-300 hover:bg-base-300"
                    : "text-white"
                }
              >
                Warranty Policy
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <img src="/assets/cart.svg" alt="" />
              <span className="badge badge-xs badge-primary indicator-item" id='cart-badge'>{getCartLength()}</span>
            </div>
          </button>
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <img src="/assets/heart.svg" alt="" />
              <span className="badge badge-xs badge-primary indicator-item" id='wl-badge'>{getWishlistedLength()}</span>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
