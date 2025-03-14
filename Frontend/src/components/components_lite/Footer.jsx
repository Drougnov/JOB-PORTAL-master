import React from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-4">
      <div className="container mx-auto px-6 flex flex-col items-center space-y-2 max-w-7xl">
        <p className="text-sm">© {new Date().getFullYear()} Rocky Barua. All rights reserved.</p>

        <div className="w-full h-px bg-gray-600" />

        <p className="flex items-center space-x-2 text-sm">
          Owned by
          <a
            href="https://github.com/Drougnov"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-400 hover:underline text-sm ml-2"
          >
            <FaGithub /> Rocky Barua
          </a>
        </p>

        <nav className="flex space-x-4 text-sm">
          <Link
            to="/PrivacyPolicy"
            className="hover:text-blue-400 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            to="/TermsofService"
            className="hover:text-blue-400 transition-colors"
          >
            Terms of Service
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;