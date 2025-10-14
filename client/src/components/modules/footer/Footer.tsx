"use client";
import React from 'react';
import { FaFacebook, FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <div className="bg-gray-900 text-white">
      <div className="max-w-screen-xl mx-auto p-8">
        {/* Footer Logo and Description */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center space-x-2">
              <img
                src="/blog.jpg"
                alt="Logo"
                className="h-8 w-8"
              />
              <span className="text-2xl font-bold">HakimDev..</span>
            </a>
          </div>
          <div className="text-center md:text-right text-sm text-gray-400">
            <p>&copy; 2023 My Portfolio. All Rights Reserved.</p>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8">
          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg text-white mb-4">Resources</h3>
            <ul>
              <li>
                <a href="/projects" className="text-gray-300 hover:text-white">Projects</a>
              </li>
              <li>
                <a href="/resume" className="text-gray-300 hover:text-white">Resume</a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-white">Contact</a>
              </li>
            </ul>
          </div>

          {/* Follow us */}
          <div>
            <h3 className="font-semibold text-lg text-white mb-4">Follow us</h3>
            <ul className="flex space-x-4">
              <li>
                <a href="https://facebook.com" target="_blank" className="text-gray-300 hover:text-white">
                  <FaFacebook className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" className="text-gray-300 hover:text-white">
                  <FaTwitter className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" className="text-gray-300 hover:text-white">
                  <FaGithub className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" className="text-gray-300 hover:text-white">
                  <FaLinkedin className="w-6 h-6" />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg text-white mb-4">Legal</h3>
            <ul>
              <li>
                <a href="/privacy-policy" className="text-gray-300 hover:text-white">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms" className="text-gray-300 hover:text-white">Terms & Conditions</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg text-white mb-4">Contact</h3>
            <ul>
              <li>
                <a href="mailto:contact@example.com" className="text-gray-300 hover:text-white">mdhakimshorkar123@gmail.com</a>
              </li>
              <li>
                <a href="tel:+123456789" className="text-gray-300 hover:text-white">01625648073</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center text-gray-400 py-4">
          <p>Made with ❤️ by Md Hakim Shorkar</p>
        </div>
      </div>
    </div>
  );
}
