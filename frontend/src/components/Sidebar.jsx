import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Import icons for the hamburger menu

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      {/* Hamburger Icon */}
      <button
        className="fixed top-4 left-4 z-50 p-2 text-white"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu className="text-black" size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-64 min-h-screen bg-gray-800 text-white p-4 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-3xl font-bold mb-6 mt-8">Dashboard</h2>
        <ul className="space-y-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-purple-500"
                : "text-white"
            }
          >
            <li className="text-xl cursor-pointer block hover:bg-gray-700 p-3 rounded">
              Stock Dashboard
            </li>
          </NavLink>
          <NavLink
            to="/fraudalerts"
            className={({ isActive }) =>
              isActive
                ? "text-purple-500"
                : "text-white"
            }
          >
            <li className="text-xl cursor-pointer block hover:bg-gray-700 p-3 rounded">
              Fraud Alerts
            </li>
          </NavLink>
          <NavLink
            to="/patternvisualization"
            className={({ isActive }) =>
              isActive
                ? "text-purple-500"
                : "text-white"
            }
          >
            <li className=" text-xl cursor-pointer block hover:bg-gray-700 p-3 rounded">
              Pattern Visualization
            </li>
          </NavLink>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
