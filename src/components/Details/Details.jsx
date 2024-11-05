import { useEffect, useState } from "react";
import { json, Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { toast } from "react-toastify";

function star(star) {
  return (
    <ReactStars
      count={5}
      value={star ? star : 5}
      edit={false}
      size={24}
      activeColor="#ffd700"
    />
  );
}

const Details = () => {
  const [currentProduct, setCurrentProduct] = useState();
  const [rating, setRating] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);

  function setWishlist(product_id) {
    setWishlisted(true);

    const original = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (!original.includes(product_id)) {
      original.push(product_id);
      document.getElementById("wl-badge").innerText = original.length;
      const stringified = JSON.stringify(original);
      toast('Item has been added to wishlist!')
      localStorage.setItem("wishlist", stringified);
    }
  }
  function setCart(product_id) {
    const original = JSON.parse(localStorage.getItem("cart")) || [];

    if (!original.includes(product_id)) {
      original.push(product_id);
      document.getElementById("cart-badge").innerText = original.length;
      const stringified = JSON.stringify(original);
      toast('Item has been added to cart!')
      localStorage.setItem("cart", stringified);
    }
  }

  function isWishlisted() {
    const wishlist = localStorage.getItem("wishlist");

    if (wishlist) {
      try {
        const parsed = JSON.parse(wishlist);
        if (Array.isArray(parsed) && currentProduct?.product_id) {
          return parsed.some((item) => {
            return item === currentProduct.product_id;
          });
        }
      } catch (error) {}
    }
    return false;
  }

  function getCurrentProductID() {
    return localStorage.getItem("current-product");
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./devicesData.json");
        const data = await response.json();
        const foundProduct = data.find(
          (device) => device.product_id == getCurrentProductID()
        );
        if (foundProduct) {
          setCurrentProduct(foundProduct);
          setRating(foundProduct.rating);
        }
      } catch {}
    };

    fetchData();
  }, []);

  useEffect(() => {
    setWishlisted(isWishlisted());
  }, [currentProduct, isWishlisted]);

  return (
    <div>
      <div className="text-center text-white flex flex-col gap-4 bg-purple-600 p-6">
        <h1 className="text-4xl font-bold">Product Details</h1>
        <h3>Here are the details of the product you requested!</h3>
        <Link to="/" className="text-left font-bold text-gray-300">
          Click here to go back to Home
        </Link>
      </div>
      <div className="p-10">
        <img
          src={currentProduct?.product_image}
          alt=""
          className="w-full object-cover rounded-xl md:hidden"
        />
      </div>

      <div className="flex p-6">
        <img
          src={currentProduct?.product_image}
          alt=""
          className="w-2/6 h-[200%] object-cover rounded-xl max-md:hidden"
        />
        <div className="pl-10 text-white">
          <h1 className="text-4xl font-bold mb-4">
            {currentProduct?.product_title}
          </h1>
          <h3 className="text-xl">
            <span className="font-bold">Price:</span> $
            {currentProduct?.price.toLocaleString()}
          </h3>
          <h3
            className={
              currentProduct?.availability
                ? "bg-green-500 p-3 font-bold my-2 inline-block rounded-md"
                : "bg-red-500 p-3 font-bold my-2 inline-block rounded-md"
            }
          >
            {currentProduct?.availability ? "In Stock" : "Out Of Stock"}
          </h3>
          <p>{currentProduct?.description}</p>
          <div className="mt-6">
            <div className="font-bold text-xl">Specification</div>
            <ol className="ml-4">
              {currentProduct?.specifications.map((spec) => (
                <li className="my-2" key={currentProduct?.specifications.indexOf(spec)}>
                  {spec}
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-4">
            <div className="font-bold text-xl">Rating</div>
            <div className="flex gap-2 items-center">
              <div className="inline">{star(rating)}</div>
              <div className="inline">{currentProduct?.rating}</div>
            </div>
          </div>
          <div className="mt-4">
            <button
              className="btn rounded-full"
              onClick={() => {
                setCart(currentProduct.product_id);
              }}
            >
              <img src="/assets/cart.svg" alt="" />
              Add To Cart
            </button>
            <button
              className="btn btn-circle"
              onClick={() => {
                setWishlist(currentProduct.product_id);
              }}
            >
              <img
                src="/assets/heart.svg"
                alt=""
                className={wishlisted ? "hidden" : ""}
              />
              <img
                src="/assets/hearted.svg"
                alt=""
                className={wishlisted ? "" : "hidden"}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
