import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import { ToastContainer } from "react-toastify";

const Root = () => {
  const Navigate = useNavigate();
  return (
    <div>
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
      <ToastContainer></ToastContainer>
      <dialog id="congratulate-modal" className="modal">
        <div className="modal-box flex flex-col justify-center items-center">
          <img src="/assets/Group.png" alt="" />
          <h3 className="font-bold text-xl mt-4">Payment Successful</h3>
          <hr className="border-1 w-full border-gray-400 my-4" />
          <p className="font-semibold">Thanks for purchasing</p>
          <p>
            <span className="font-bold">Total:</span> $
            <span id="total-label"></span>
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn font-bold"
                onClick={() => {
                  Navigate('/');
                }}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Root;
