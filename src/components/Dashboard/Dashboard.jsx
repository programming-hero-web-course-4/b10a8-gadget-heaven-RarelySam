import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  document.title = `Statistics | Gadget Heaven`;

  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentCategory, setCurrentCategory] = useState("Cart");

  function setCategory(category) {
    if (currentCategory != category) {
      document
        .getElementById(currentCategory.toLowerCase())
        .classList.add("hidden");
      document
        .getElementById(currentCategory.toLowerCase() + "-btn")
        .classList.remove(
          "bg-white",
          "text-black",
          "hover:bg-gray-200",
          "border-none"
        );
      setCurrentCategory(category);
    }
  }

  function sortItems() {
    const sortedItems = [...cartItems].sort((a, b) => b.price - a.price);
    setCartItems(sortedItems);
  }

  useEffect(() => {
    document
      .getElementById(currentCategory.toLowerCase())
      .classList.remove("hidden");
    document
      .getElementById(currentCategory.toLowerCase() + "-btn")
      .classList.add(
        "bg-white",
        "text-black",
        "hover:bg-gray-200",
        "border-none"
      );
  }, [currentCategory]);
  function getWishlist() {
    const wishlistString = localStorage.getItem("wishlist");

    if (wishlistString) {
      try {
        const wishlist = JSON.parse(wishlistString);
        return wishlist;
      } catch {}
    } else {
      return [];
    }
  }
  function getCart() {
    const wishlistString = localStorage.getItem("cart");

    if (wishlistString) {
      try {
        const wishlist = JSON.parse(wishlistString);
        return wishlist;
      } catch {}
    } else {
      return [];
    }
  }
  function getTotalPrice() {
    let price = 0;
    cartItems.forEach((item) => {
      price += item.price;
    });
    return price;
  }

  function removeItem(productId) {
    const updatedCart = cartItems.filter(
      (item) => item.product_id !== productId
    );
    setCartItems(updatedCart);

    const wishlist = getCart();
    const updatedWishlist = wishlist.filter((id) => id !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedWishlist));
    document.getElementById("cart-badge").innerText = updatedWishlist.length;
  }

  function removeWLItem(productId) {
    const updatedCart = wishlistItems.filter(
      (item) => item.product_id !== productId
    );
    setWishlistItems(updatedCart);

    const wishlist = getWishlist();
    const updatedWishlist = wishlist.filter((id) => id !== productId);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    document.getElementById("wl-badge").innerText = updatedWishlist.length;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./devicesData.json");
        const data = await response.json();
        const combinedItems = data.filter((item) =>
          getCart().includes(item.product_id)
        );
        const combinedWLItems = data.filter((item) =>
          getWishlist().includes(item.product_id)
        );
        setItems(data);
        setWishlistItems(combinedWLItems);
        setCartItems(combinedItems);
      } catch {}
    };

    fetchData();
  }, []);

  useEffect(() => {
    setTotal(getTotalPrice());
  }, [cartItems]);

  function addToCart(productId) {
    const productToAdd = items.find((item) => item.product_id === productId);

    if (!cartItems.some((item) => item.product_id === productId)) {
      const toAdd = [...cartItems, productToAdd];
      setCartItems(toAdd);

      const cartItemsIds = toAdd.map((item) => item.product_id);
      localStorage.setItem("cart", JSON.stringify(cartItemsIds));
      document.getElementById("cart-badge").innerText = toAdd.length;
      toast("Item has been added to cart!");
    }
  }

  function purchase() {
    document.getElementById(
      "total-label"
    ).innerText = `${getTotalPrice().toLocaleString()}`;
    document.getElementById("cart-badge").innerText = "0";
    document.getElementById("congratulate-modal").showModal();
    setCartItems([]);
    localStorage.setItem("cart", "[]");
  }

  return (
    <div className="mb-20">
      <div className="text-center text-white flex flex-col gap-4 bg-purple-600 p-6">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <h3>This is your dashboard!</h3>
        <div className="flex gap-4 items-center justify-center">
          <button
            className="btn"
            id="cart-btn"
            onClick={() => {
              setCategory("Cart");
            }}
          >
            Cart
          </button>
          <button
            className="btn"
            id="wishlist-btn"
            onClick={() => {
              setCategory("Wishlist");
            }}
          >
            Wishlist
          </button>
        </div>
      </div>
      <div id="cart">
        <div className="mt-4 max-md:px-6 md:px-20 flex justify-between items-center">
          <div className="inline font-bold">Cart</div>
          <div className="flex items-center gap-4">
            <div className="inline font-bold text-white text-right">
              Total: ${total.toLocaleString()}
            </div>
            <button className="btn inline" onClick={sortItems}>
              Sort
            </button>
            <button
              className={`btn inline bg-purple-400 hover:bg-purple-500 text-white font-bold ${
                cartItems.length > 0 ? "" : "btn-disabled"
              }`}
              onClick={purchase}
            >
              Purchase
            </button>
          </div>
        </div>
        <div className="flex flex-col max-md:px-4 md:px-20 w-full gap-4 pt-6">
          {cartItems.map((item) => {
            return (
              <div
                key={item.product_id + "e"}
                className="bg-base-300 p-4 rounded-xl"
              >
                <img
                  src={item.product_image}
                  className="w-full inline rounded-lg md:hidden mb-2"
                  alt=""
                />
                <div className="flex justify-between ">
                  <div className="flex gap-4">
                    <img
                      src={item.product_image}
                      className="w-60 inline rounded-lg max-md:hidden"
                      alt=""
                    />
                    <div className="inline">
                      <div className="font-bold text-xl">
                        {item.product_title}
                      </div>
                      <div>{item.description}</div>
                      <div className="mt-2">
                        <span className="font-bold">Price:</span> $
                        {item.price.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div>
                      <button
                        className="btn btn-circle"
                        onClick={() => {
                          removeItem(item.product_id);
                        }}
                      >
                        <img src="/assets/remove.svg" alt="" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div id="wishlist" className="hidden">
        <div className="mt-4 max-md:px-6 md:px-20 flex justify-between items-center">
          <div className="inline font-bold">Wishlist</div>
        </div>
        <div className="flex flex-col max-md:px-4 md:px-20 w-full gap-4 pt-6">
          {wishlistItems.map((item) => {
            return (
              <div
                key={item.product_id + "w"}
                className="bg-base-300 p-4 rounded-xl"
              >
                <img
                  src={item.product_image}
                  className="w-full inline rounded-lg md:hidden mb-2"
                  alt=""
                />
                <div className="flex justify-between ">
                  <div className="flex gap-4">
                    <img
                      src={item.product_image}
                      className="w-60 inline rounded-lg max-md:hidden"
                      alt=""
                    />
                    <div className="inline">
                      <div className="font-bold text-xl">
                        {item.product_title}
                      </div>
                      <div>{item.description}</div>
                      <div className="mt-2">
                        <span className="font-bold">Price:</span> $
                        {item.price.toLocaleString()}
                      </div>
                      <button
                        className="btn"
                        onClick={() => {
                          addToCart(item.product_id);
                        }}
                      >
                        <img src="assets/cart.svg" alt="" /> Add to cart
                      </button>
                    </div>
                  </div>

                  <div>
                    <div>
                      <button
                        className="btn btn-circle"
                        onClick={() => {
                          removeWLItem(item.product_id);
                        }}
                      >
                        <img src="/assets/remove.svg" alt="" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
