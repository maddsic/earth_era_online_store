import { Link } from "@remix-run/react";
import { useState } from "react";
import { navLinks } from "app/resources/navlinks";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Logo />
          {/* Desktop Menu */}
          <DesktopMenu />
          {/* Mobile Menu Button */}
          <MobileMenuBtn />
        </div>
      </div>
      {/* Mobile Menu */}
      <MobileMenu />
    </nav>
  );
};
function Logo() {
  return (
    <Link to="/" className="text-2xl font-bold text-green-800">
      {/* Moringa Life */}
      Nature's Healing
    </Link>
  );
}

function DesktopMenu() {
  return (
    <div className="hidden md:flex space-x-8">
      {navLinks.map((item) => (
        <Link
          key={item.id}
          to={`${item.href}`}
          className="text-green-700 hover:text-green-500 transition-colors"
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
}

function MobileMenuBtn() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      className="md:hidden p-2 text-green-700 hover:text-green-500 transition-colors"
      onClick={() => setIsOpen(!isOpen)}
    >
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );
}
// export default Navbar;
function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className={`md:hidden fixed top-0 left-0 w-full h-screen bg-white/80 backdrop-blur-md border-b transition-transform ${
        isOpen ? "translate-y-0" : "-translate-y-full"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col items-center justify-center h-full">
        {navLinks.map((item) => (
          <Link
            key={item.id}
            to={`${item.href}`}
            className="text-green-700 hover:text-green-500 transition-colors mb-4"
            onClick={() => setIsOpen(false)}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
