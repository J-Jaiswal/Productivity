import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  ClockIcon,
  ChartBarIcon,
  UserCircleIcon,
  ArrowRightCircleIcon,
  ArrowLeftCircleIcon,
} from "@heroicons/react/24/solid";

const MobileNav = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  const navItems = [
    { name: "Home", path: "/", icon: <HomeIcon className="w-6 h-6" /> },
    {
      name: "History",
      path: "/history",
      icon: <ClockIcon className="w-6 h-6" />,
    },
    {
      name: "Stats",
      path: "/stats",
      icon: <ChartBarIcon className="w-6 h-6" />,
    },
  ];

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg py-2 px-6 rounded-t-xl flex justify-between items-center">
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center text-xs ${
              isActive ? "text-yellow-300 font-bold" : "text-white"
            }`
          }
        >
          {item.icon}
          {item.name}
        </NavLink>
      ))}

      {/* Profile button (login/logout) */}
      {token ? (
        <div className="relative group">
          <img
            src={user?.avatar || "https://i.pravatar.cc/150?u=default"}
            alt="profile"
            className="w-10 h-10 rounded-full ring-2 ring-white cursor-pointer"
          />
          <div className="absolute bottom-12 right-0 hidden group-hover:flex flex-col bg-white text-black p-2 rounded shadow-lg">
            <span className="text-sm px-2 py-1">{user?.username}</span>
            <button
              onClick={handleLogout}
              className="flex items-center text-red-600 px-2 py-1 text-sm hover:bg-red-100 rounded"
            >
              <ArrowLeftCircleIcon className="w-4 h-4 mr-1" />
              Logout
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex flex-col items-center justify-center"
        >
          <ArrowRightCircleIcon className="w-6 h-6" />
          <span className="text-xs">Login</span>
        </button>
      )}
    </div>
  );
};

export default MobileNav;
