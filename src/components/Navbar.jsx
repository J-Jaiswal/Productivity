import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  ClockIcon,
  ChartBarIcon,
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  const navLinks = [
    { name: "Home", to: "/", icon: <HomeIcon className="w-5 h-5" /> },
    {
      name: "History",
      to: "/history",
      icon: <ClockIcon className="w-5 h-5" />,
    },
    { name: "Stats", to: "/stats", icon: <ChartBarIcon className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden mx-auto max-w-[1080px] bg-white md:flex justify-between items-center px-6 py-4  shadow sticky top-0 z-50">
        <h1
          className="text-2xl font-bold text-blue-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          ⏱️ ProductiveApp
        </h1>

        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-2 text-sm font-medium px-3 py-2 rounded ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-blue-100"
                }`
              }
            >
              {link.icon}
              {link.name}
            </NavLink>
          ))}

          {token ? (
            <>
              <div className="flex items-center gap-2">
                <img
                  src={user?.avatar || "https://i.pravatar.cc/150?u=default"}
                  className="w-8 h-8 rounded-full ring-2 ring-blue-400"
                  alt="profile"
                />
                <span className="text-gray-800 text-sm">{user?.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
            >
              Login
            </NavLink>
          )}
        </div>
      </nav>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden px-4 py-3 bg-white shadow sticky top-0 z-50 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">⏱️ ProductiveApp</h1>
        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="text-sm text-blue-600 font-medium border px-3 py-1 rounded"
        >
          {mobileMenuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile Tabular Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 px-4 text-sm">
          {token && (
            <div className="flex items-center gap-3 border-b pb-3">
              <img
                src={user?.avatar || "https://i.pravatar.cc/150?u=default"}
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
              <p className="text-gray-800 font-medium">
                Welcome, <span className="text-blue-600">{user?.username}</span>
              </p>
            </div>
          )}

          <div className="flex flex-col divide-y divide-gray-300">
            {navLinks.map((link) => (
              <NavLink key={link.name} to={link.to}>
                {({ isActive }) => (
                  <div
                    className={`flex items-center justify-between py-3 ${
                      isActive ? "text-blue-600 font-semibold" : "text-gray-700"
                    } hover:text-blue-500 transition-colors`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5">{link.icon}</span>
                      {link.name}
                    </div>
                    {/* {isActive && (
                      <span className="text-xs bg-blue-100 px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )} */}
                  </div>
                )}
              </NavLink>
            ))}
          </div>

          <div className="pb-8">
            {token ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 hover:text-red-700"
              >
                <ArrowLeftCircleIcon className="w-5 h-5" />
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                <ArrowRightCircleIcon className="w-5 h-5" />
                Login
              </NavLink>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
