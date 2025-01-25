import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Modals = () => {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setModal(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const dialog = document.getElementById("subscribe_modal");
    if (modal) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [modal]);

  return (
    <div>
      <dialog
        id="subscribe_modal"
        className="modal"
        onClick={(e) => {
          if (e.target.tagName === "DIALOG") setModal(false);
        }}
      >
        <div className="modal-box relative rounded-md shadow-2xl p-8">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-5 top-5 text-xl text-gray-600 hover:text-red-500 transition-all duration-300"
            onClick={() => setModal(false)}
          >
            ✕
          </button>

          <div className="text-center">
            <h3 className="text-3xl font-bold text-rose-500 mb-4">
              🌟 Stay Updated!
            </h3>
            <p className="text-lg text-gray-700">
              Be the first to know about the latest news, updates, and exclusive
              content. Join our community today!
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <Link to="/subscription">
              <button className="btn bg-gradient-to-r from-rose-500 to-blue-500 text-white px-8 py-3 rounded-lg shadow-lg hover:scale-105 transition-all duration-300">
                🚀 Confirm Subscription
              </button>
            </Link>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              💡 You can unsubscribe at any time. We respect your privacy.
            </p>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Modals;
