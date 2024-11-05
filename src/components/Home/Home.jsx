import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const categories = [
  "All Products",
  "Phones",
  "Accessories",
  "Smart Watches",
  "Macbook",
  "Iphone",
  "Laptops",
];

const Home = () => {
  document.title = `Home | Gadget Heaven`;

  const [devices, setDevices] = useState([]);
  const [currentDisplay, setCurrentDisplay] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("All Products");

  const navigate = useNavigate();

  function setCurrentProduct(product_id) {
    localStorage.setItem("current-product", product_id);
    navigate("details");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./devicesData.json");
        const data = await response.json();
        setDevices(data);
        setCurrentDisplay(data);
      } catch {}
    };

    fetchData();
  }, []);

  function selectCategory(category) {
    if (category === "All Products") {
      setCurrentDisplay(devices);
    } else {
      const filteredDevices = devices.filter(
        (device) => device.category === category
      );
      setCurrentDisplay(filteredDevices);
    }
    document
      .getElementById(currentCategory + "btn")
      .classList.remove(
        "bg-gray-400",
        "text-white",
        "hover:bg-gray-500",
        "font-bold"
      );
    document
      .getElementById(category + "btn")
      .classList.add(
        "bg-gray-400",
        "text-white",
        "hover:bg-gray-500",
        "font-bold"
      );
    document
      .getElementById(currentCategory + "btn-small")
      .classList.remove(
        "bg-gray-400",
        "text-white",
        "hover:bg-gray-500",
        "font-bold"
      );
    document
      .getElementById(category + "btn-small")
      .classList.add(
        "bg-gray-400",
        "text-white",
        "hover:bg-gray-500",
        "font-bold"
      );
    setCurrentCategory(category);
  }

  return (
    <div>
      <div className="bg-purple-800 shadow-inner">
        <div className="max-w-7xl mx-auto text-white text-center flex flex-col gap-8 py-6 pt-20 relative md:pb-80 max-lg:mb-52 lg:mb-80 max-md:pb-64 max-md:mb-28 max-sm:mb-12 max-sm:pb-80 max-:">
          <h1 className="max-md:text-4xl md:text-6xl font-semibold px-8 w-full font-sans">
            Upgrade Your Tech Accessories with Gadget Heaven Accessories
          </h1>
          <p className="px-[20%]">
            Explore the latest gadgets that will take your experience to the
            next level. From smart devices to the coolest accessories, we have
            it all!
          </p>
          <div>
            <Link to='dashboard'>
              <button className="btn rounded-full text-lg text-black shadow-xl bg-white hover:bg-gray-300 border-2 border-purple-400 hover:border-purple-500">
                Shop Now
              </button>
            </Link>
          </div>
          <div className="absolute top-[60%] max-sm:top-[65%] rounded-2xl">
            <img
              src="assets/banner.jpg"
              alt="banner"
              className="w-8/12 rounded-xl mx-auto border-white border-4 border-opacity-15 shadow-md"
            />
          </div>
        </div>
      </div>
      <div className="text-center text-white text-2xl font-bold">
        Explore Cutting-Edge Gadgets
      </div>
      <div className="p-4 xl:hidden">
        <div className="flex bg-base-300 p-4 gap-2 rounded-2xl w-full overflow-scroll shadow-inner">
          {categories.map((category) => {
            return (
              <button
                className={
                  currentCategory == category
                    ? "btn rounded-full bg-gray-400 text-white hover:bg-gray-500 font-bold"
                    : "btn rounded-full"
                }
                key={category + "btn-sm"}
                id={category + "btn-small"}
                onClick={() => {
                  selectCategory(category);
                }}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
      <div className="w-screen flex">
        <div className="w-1/4 p-4 max-xl:hidden">
          <div className="inline-flex flex-col bg-base-300 p-4 gap-4 rounded-2xl w-full">
            {categories.map((category) => {
              return (
                <button
                  className={
                    currentCategory == category
                      ? "btn rounded-full bg-gray-400 text-white"
                      : "btn rounded-full"
                  }
                  key={category + "btn"}
                  id={category + "btn"}
                  onClick={() => {
                    selectCategory(category);
                  }}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div
          id="shop"
          className="w-3/4 grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 inline-grid gap-4 p-4 max-xl:w-full"
        >
          {currentDisplay?.map((device) => {
            return (
              <div
                key={device.product_id}
                className="flex flex-col p-6 bg-slate-900 rounded-2xl gap-2 text-white"
              >
                <img
                  src={device.product_image}
                  alt=""
                  className="object-cover w-full h-5/6 rounded-lg"
                />
                <div className="font-bold text-xl max-xl:text-sm">
                  {device.product_title}
                </div>
                <div>
                  <span className="font-bold">Price:</span> $
                  {device.price.toLocaleString()}
                </div>
                <div>
                  <button
                    className="btn float-right rounded-full btn-outline border-white font-bold text-white"
                    onClick={() => {
                      setCurrentProduct(device.product_id);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
