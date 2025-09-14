import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa6';
import { HiSun } from "react-icons/hi";
import { RiSettings3Fill } from 'react-icons/ri';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="nav w-full bg-[#141319] border-b-[1px] border-gray-800 px-4 md:px-[100px] py-4 flex items-center justify-between">
      <div className="logo">
        <h1 className="text-[25px] font-[700] sp-text ">PrompUI</h1>
      </div>

      {/* Desktop Icons */}
      <div className="hidden md:flex items-center gap-[15px]">
        <div className="icon text-white">
          <HiSun className="w-6 h-6 cursor-pointer" />
        </div>
        <div className="icon text-white">
          <FaUser className="w-6 h-6 cursor-pointer" />
        </div>
        <div className="icon text-white">
          <RiSettings3Fill className="w-6 h-6 cursor-pointer" />
        </div>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white w-8 h-8 flex items-center justify-center"
        >
          <HiSun className="w-6 h-6" />
        </button>
        {isMenuOpen && (
          <div className="absolute top-[90px] right-0 w-40 bg-[#141319] rounded-lg shadow-lg p-3 flex flex-col gap-4">
            <div className="flex items-center justify-between text-white">
              <HiSun className="w-6 h-6 cursor-pointer" />
              <FaUser className="w-6 h-6 cursor-pointer" />
              <RiSettings3Fill className="w-6 h-6 cursor-pointer" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
