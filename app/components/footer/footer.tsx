import { Link } from "@remix-run/react";
import { Mail, Phone, MapPin, FacebookIcon } from "lucide-react";
import { navLinks } from "app/resources/navlinks";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { div } from "framer-motion/client";

export const socialLinks = [
  {
    icon: <FaFacebook />,
    url: "https://facebook.com",
    label: "Facebook",
  },
  {
    icon: <FaInstagram className="h-5 w-5" />,
    url: "https://instagram.com",
    label: "Instagram",
  },
  {
    icon: <FaTwitter className="h-5 w-5" />,
    url: "https://twitter.com",
    label: "Twitter",
  },
];

// MAIN
export default function Footer() {
  return (
    <footer className="bg-earth-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <CompanyInfo />
          <QuickLinks />
          <div>
            <Input />
            <div className="md:hidden">
              <SocialMedia />
            </div>
          </div>
        </div>
        <Rights />
      </div>
    </footer>
  );
}

function QuickLinks({}) {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Quick Links</h3>
      <ul className="space-y-2">
        {navLinks.map((item) => (
          <li key={item.id}>
            <Link
              to={`/${item.href.toLowerCase()}`}
              className="hover:text-earth-accent transition-colors"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialMedia({}) {
  return (
    <div>
      <h4 className="font-medium mb-2">Follow Us</h4>
      <div className="flex gap-3">
        {socialLinks.map((link) => (
          <Link
            key={link.label}
            to={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-earth-secondary text-white hover:bg-earth-accent/80 transition-colors"
            aria-label={link.label}
          >
            {link.icon}
          </Link>
        ))}
      </div>
    </div>
  );
}

function Input({}) {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Stay Connected</h3>
      <p className="mb-4">
        Subscribe to our newsletter for updates and special offers.
      </p>
      <div className="flex mb-6">
        <input
          type="email"
          placeholder="Your email"
          className="px-4 py-2 rounded-l-md text-gray-800 w-full focus:outline-none"
        />
        <button className="bg-earth-secondary hover:bg-earth-accent/80 px-4 py-2 rounded-r-md transition-colors">
          Subscribe
        </button>
      </div>
    </div>
  );
}

function CompanyInfo({}) {
  return (
    <div>
      <p className="mb-4 text-earth-accent/90">
        Providing premium quality natural supplements sourced from the finest
        ingredients around the world.
      </p>
      <div className="flex items-center mb-2">
        <Mail className="h-4 w-4 mr-2" />
        <a href="mailto:info@earthera.com" className="hover:text-earth-accent">
          info@earthera.com
        </a>
      </div>
      <div className="flex items-center mb-2">
        <Phone className="h-4 w-4 mr-2" />
        <a href="tel:+1234567890" className="hover:text-earth-accent">
          +1 (234) 567-890
        </a>
      </div>
      <div className="flex items-center">
        <MapPin className="h-4 w-4 mr-2" />
        <span>123 Nature Way, Green City</span>
      </div>
    </div>
  );
}

function Rights({}) {
  return (
    <div className="border-t border-earth-accent/20 mt-8 pt-8 text-center text-sm text-earth-accent/70">
      <p>© {new Date().getFullYear()} Earth Era. All rights reserved.</p>
    </div>
  );
}
