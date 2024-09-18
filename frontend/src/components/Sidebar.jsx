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
        className="fixed top-4 left-4 z-50 p-2 text-[#4A90E2] bg-white rounded-full shadow-lg hover:bg-[#e3f2fd] transition-colors duration-300"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-64 min-h-screen bg-[#333333] text-white p-6 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-3xl font-bold mb-8 mt-10 text-[#F5F7FA]">Dashboard</h2>
        <ul className="space-y-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-xl cursor-pointer block p-3 rounded-md transition-colors duration-300 ${
                isActive
                  ? "bg-[#4A90E2] text-white"
                  : "hover:bg-[#4A4A4A] text-[#F5F7FA]"
              }`
            }
          >
            <li>Stock Dashboard</li>
          </NavLink>
          <NavLink
            to="/fraudalerts"
            className={({ isActive }) =>
              `text-xl cursor-pointer block p-3 rounded-md transition-colors duration-300 ${
                isActive
                  ? "bg-[#4A90E2] text-white"
                  : "hover:bg-[#4A4A4A] text-[#F5F7FA]"
              }`
            }
          >
            <li>Fraud Alerts</li>
          </NavLink>
          {/* Uncomment when needed
          <NavLink
            to="/patternvisualization"
            className={({ isActive }) =>
              `text-xl cursor-pointer block p-3 rounded-md transition-colors duration-300 ${
                isActive ? "bg-[#4A90E2] text-white" : "hover:bg-[#4A4A4A] text-[#F5F7FA]"
              }`
            }
          >
            <li>Pattern Visualization</li>
          </NavLink>
          */}
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
