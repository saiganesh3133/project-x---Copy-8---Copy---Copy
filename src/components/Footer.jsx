// Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 text-center">
      <p>&copy; {new Date().getFullYear()} Your Website. All rights reserved.</p>
      <p>Contact: support@example.com</p>
    </footer>
  );
};

export default Footer;
