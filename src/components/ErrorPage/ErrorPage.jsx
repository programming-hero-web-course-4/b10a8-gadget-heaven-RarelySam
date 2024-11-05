import React from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  document.title = `Page not found | Gadget Heaven`;

  return (
    <div>
      <NavBar></NavBar>
      <div className="min-h-[60vh] flex flex-col justify-center items-center gap-8">
        <img src="assets/error.svg" className="w-60" alt="error" />
        <h1 className="text-2xl text-white font-bold text-center">The page you are trying to go to was not found in the server!</h1>
        <Link to="/">Click here to go back to Home</Link>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ErrorPage;
