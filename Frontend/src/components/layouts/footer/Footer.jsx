import React from "react";
import { FaInstagram, FaLinkedin, FaEnvelope, FaTwitter } from "react-icons/fa";

 function Footer() {
  return (
    <section className="relative bg-custom-green-gradient">
      <footer className="w-[90%] mx-auto text-center font-sans pt-10 pb-4">
        <div className="flex flex-col md:flex-row justify-between px-4 md:px-10">
          {/* Address and Contact Info */}
          <div className="mb-8 md:mb-0 w-full md:w-1/3 text-left space-y-4">
            <h3 className="text-lg font-bold">Address</h3>
            <div>181.B Sahkar Nagar near R.R Cat Square</div>
            <div>
              <h3 className="text-lg font-bold">CONTACT US</h3>
              <p>+1 (844) 326-6005</p>
              <p className="font-bold">E-mail Us:</p>
              <p>MON - FRI 9am - 6pm PT</p>
            </div>
            <div className="flex space-x-4 mb-8">
              <FaInstagram size={24} />
              <FaLinkedin size={24} />
              <FaEnvelope size={24} />
              <FaTwitter size={24} />
            </div>
          </div>

          {/* Explore and Resources Links */}
          <div className="flex flex-col md:flex-row justify-around w-full md:w-2/3">
            <div className="text-left mb-8 md:mb-0 w-full md:w-1/2">
              <h3 className="text-lg font-bold">Explore</h3>
              <ul className="list-none mt-2 space-y-1">
                <li>Design</li>
                <li>Prototyping</li>
                <li>Development features</li>
                <li>Design systems</li>
              </ul>
            </div>
            <div className="text-left w-full md:w-1/2">
              <h3 className="text-lg font-bold">Resources</h3>
              <ul className="list-none mt-2 space-y-1">
                <li>Blog</li>
                <li>Best practices</li>
                <li>Colors</li>
                <li>Color wheel</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}

export default Footer