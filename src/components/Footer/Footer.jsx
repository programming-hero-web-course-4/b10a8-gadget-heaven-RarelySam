import React from "react";

const Footer = () => {
  return (
    <footer className="bg-base-300 text-base-content p-10 flex flex-col items-center">
      <aside>
        <p className="font-bold text-center text-2xl">
          Gadget Heaven
        </p>
        <p className="text-center">Leading the way in cutting-edge technology and innovation.</p>
      </aside>
      <hr className="m-7 w-8/12" />
      <div className="footer flex justify-around w-8/12 max-md:flex-col items-center">
        <nav>
          <h6 className="footer-title text-center w-full">Services</h6>
          <a className="link link-hover text-center w-full">Product Support</a>
          <a className="link link-hover text-center w-full">Order Tracking</a>
          <a className="link link-hover text-center w-full">Shipping & Delivery</a>
          <a className="link link-hover text-center w-full">Returns</a>
        </nav>
        <nav>
          <h6 className="footer-title text-center w-full">Company</h6>
          <a className="link link-hover text-center w-full">About us</a>
          <a className="link link-hover text-center w-full">Careers</a>
          <a className="lin text-center w-full">Contact</a>
        </nav>
        <nav>
          <h6 className="footer-title text-center w-full">Legal</h6>
          <a className="link link-hover text-center w-full">Terms of Service</a>
          <a className="link link-hover text-center w-full">Privacy Policy</a>
          <a className="link link-hover text-center w-full">Cookie Policy</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
