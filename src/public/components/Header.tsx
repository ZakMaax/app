import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "@/assets/Logo.png";

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <header className="fixed top-0 right-0 left-0 z-50 shadow-md pt-3 px-8 bg-primaryBg">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center justify-center">
            <img
              src={Logo}
              alt="Guryasamo Logo"
              className="w-20 h-20 lg:ml-20"
            />
            <h1 className="font-poppins font-medium text-lg text-primaryColor inline">
              Guryasamo
            </h1>
          </NavLink>

          {/* Navigation Links */}
          <nav className="mr-16 lg:mr-48 hidden md:block">
            <ul className="flex gap-12 md:gap-16 font-poppins text-TextColor">
              <li className="group relative">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block text-center transition-all duration-300 ${
                      isActive
                        ? "text-primaryColor -translate-y-1.5"
                        : "group-hover:text-primaryColor group-hover:-translate-y-1.5"
                    }`
                  }
                >
                  Home
                  <div
                    className={`bg-primaryColor rounded-full w-1.5 h-1.5 mx-auto transition-all duration-300 ${
                      location.pathname === "/"
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  ></div>
                </NavLink>
              </li>

              <li className="group relative">
                <NavLink
                  to="/listings"
                  className={({ isActive }) =>
                    `block text-center transition-all duration-300 ${
                      isActive
                        ? "text-primaryColor -translate-y-1.5"
                        : "group-hover:text-primaryColor group-hover:-translate-y-1.5"
                    }`
                  }
                >
                  Listings
                  <div
                    className={`bg-primaryColor rounded-full w-1.5 h-1.5 mx-auto transition-all duration-300 ${
                      location.pathname === "/listings"
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  ></div>
                </NavLink>
              </li>

              <li className="group relative">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block text-center transition-all duration-300 ${
                      isActive
                        ? "text-primaryColor -translate-y-1.5"
                        : "group-hover:text-primaryColor group-hover:-translate-y-1.5"
                    }`
                  }
                >
                  About
                  <div
                    className={`bg-primaryColor rounded-full w-1.5 h-1.5 mx-auto transition-all duration-300 ${
                      location.pathname === "/about"
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  ></div>
                </NavLink>
              </li>

              <li className="group relative">
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `block text-center transition-all duration-300 ${
                      isActive
                        ? "text-primaryColor -translate-y-1.5"
                        : "group-hover:text-primaryColor group-hover:-translate-y-1.5"
                    }`
                  }
                >
                  Contact
                  <div
                    className={`bg-primaryColor rounded-full w-1.5 h-1.5 mx-auto transition-all duration-300 ${
                      location.pathname === "/contact"
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  ></div>
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Hamburger Menu (Only visible on small screens) */}
          <div className="md:hidden relative z-[60]">
            <button
              onClick={() => setNavOpen(!navOpen)}
              className="cursor-pointer relative w-8 h-6 flex flex-col items-center justify-between group"
            >
              <span
                className={`block w-8 h-[2px] bg-primaryColor transition-transform duration-300 ${
                  navOpen ? "rotate-45 translate-y-[11px]" : ""
                }`}
              />
              <span
                className={`block w-8 h-[2px] bg-primaryColor transition-transform duration-300 ${
                  navOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-8 h-[2px] bg-primaryColor transition-transform duration-300 ${
                  navOpen ? "-rotate-45 -translate-y-[11px]" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <div
          className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 bg-black/50 ${
            navOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setNavOpen(false)}
        ></div>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden fixed top-0 right-0 w-3/4 bg-gray-200 h-full p-6 transform transition-transform duration-300 z-50 ${
            navOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ul className="flex flex-col space-y-7 font-poppins text-2xl font-medium mt-10">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block ${isActive ? "text-primaryColor" : "text-gray-700"}`
                }
                onClick={() => setNavOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/listings"
                className={({ isActive }) =>
                  `block ${isActive ? "text-primaryColor" : "text-gray-700"}`
                }
                onClick={() => setNavOpen(false)}
              >
                Listings
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `block ${isActive ? "text-primaryColor" : "text-gray-700"}`
                }
                onClick={() => setNavOpen(false)}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `block ${isActive ? "text-primaryColor" : "text-gray-700"}`
                }
                onClick={() => setNavOpen(false)}
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
