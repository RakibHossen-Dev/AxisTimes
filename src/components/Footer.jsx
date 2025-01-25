import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-rose-600 text-white py-10  md:px-0 px-5 ">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Description */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">AxisTimes</h2>
          <p className="text-black">
            Stay updated with the latest news from around the world. AxisTimes
            brings you reliable and timely updates, covering all important
            events and stories.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-black hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-black hover:text-white">
                World News
              </a>
            </li>
            <li>
              <a href="#" className="text-black hover:text-white">
                Politics
              </a>
            </li>
            <li>
              <a href="#" className="text-black hover:text-white">
                Sports
              </a>
            </li>
            <li>
              <a href="#" className="text-black hover:text-white">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Subscribe and Social Media */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Subscribe</h3>
          <form className="flex items-center md:space-x-2 space-x-1">
            <input
              type="email"
              placeholder="Your email"
              className="md:px-4 px-2 py-2 bg-black text-white rounded focus:outline-none"
            />
            <button className="md:px-4 px-2 text-black py-2 bg-white rounded hover:bg-blue-500">
              Subscribe
            </button>
          </form>
          <div className="flex space-x-4 mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-white"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-white"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-white"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-white"
            >
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white mt-10 pt-4 text-center text-sm text-white">
        &copy; {new Date().getFullYear()} AxisTimes. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
