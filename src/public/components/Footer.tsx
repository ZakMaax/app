import Logo from "@/assets/Logo-no-bg.png";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="bg-gray-800">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:gap-40 lg:justify-between">
          <div className="mb-6 md:mb-0">
            <Link to={"/"} className="flex items-center">
              <img src={Logo} className="h-20 w-20 me-1" alt="Guryasamo Logo" />
              <span className="text-gray-200 self-center text-2xl font-semibold whitespace-nowrap">
                Guryasamo
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-200 uppercase">
                Resources
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link to={"/listings"} className="hover:underline">
                    Properties
                  </Link>
                </li>
                <li>
                  <Link to={'/about'} className="hover:underline">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="flex flex-col items-center justify-center md:flex-row md:justify-between">
          <span className="text-sm flex items-center gap-2 text-gray-500 sm:text-center dark:text-gray-400">
            &copy; {new Date().getFullYear()}
            <a href="https://flowbite.com/" className="hover:underline">
              Guryasamo™
            </a>
            All Rights Reserved.
          </span>
          <div className="flex gap-3 mt-4 sm:justify-center sm:mt-0">
            {/* Facebook */}
            <a
              href="https://www.facebook.com"
              target="_blank"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white text-2xl"
            >
              <FaFacebook />
              <span className="sr-only">Facebook page</span>
            </a>

            {/* Twitter */}
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white text-2xl"
            >
              <FaInstagram />
              <span className="sr-only">Twitter page</span>
            </a>

            {/* Instagram */}
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white text-2xl"
            >
              <FaTwitter />
              <span className="sr-only">Instagram page</span>
            </a>

            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white text-2xl"
            >
              <FaLinkedin />
              <span className="sr-only">Instagram page</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
