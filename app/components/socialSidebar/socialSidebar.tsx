import { Link } from "@remix-run/react";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

// Social links
const socialLinks = [
  {
    icon: <FaFacebook className="h-5 w-5" />,
    url: "https://facebook.com",
    label: "Facebook",
    color: "bg-blue-600 hover:bg-blue-700",
  },
  {
    icon: <FaInstagram className="h-5 w-5" />,
    url: "https://instagram.com",
    label: "Instagram",
    color:
      "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600",
  },
  {
    icon: <FaTwitter className="h-5 w-5" />,
    url: "https://twitter.com",
    label: "Twitter",
    color: "bg-sky-500 hover:bg-sky-600",
  },
];

// Main
export default function SocialSidebar() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:block"
    >
      <div className="flex flex-col gap-3 bg-white/80 backdrop-blur-sm p-3 rounded-l-lg shadow-lg">
        {socialLinks.map((link, index) => (
          <motion.div
            key={link.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 + index * 0.1, duration: 0.3 }}
            whileHover={{
              scale: 1.2,
              x: -5,
              transition: { type: "spring", stiffness: 400, damping: 10 },
            }}
          >
            <Link
              to={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center w-10 h-10 rounded-full ${link.color} text-white transition-all duration-300 shadow-md`}
              aria-label={link.label}
            >
              <motion.div
                whileHover={{ rotate: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {link.icon}
              </motion.div>
            </Link>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              whileHover={{
                opacity: 1,
                width: "auto",
                transition: { duration: 0.2 },
              }}
              className="absolute right-full top-0 mr-2 whitespace-nowrap overflow-hidden"
            >
              <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-md shadow-md text-sm">
                {link.label}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
