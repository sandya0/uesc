import React from 'react';

const Footer = () => {
  const navLinks = [
    "Home",
    "Featured",
    "Debate",
    "Scrabble",
    "MUN",
    "Speech",
    "Contact",
    "Instagram",
  ];

  return (
    <footer className="bg-white text-black py-16 px-8 lg:px-20 font-sans">
      <div className="container mx-auto">
        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Left Section: Image and Logo */}
          <div className="md:col-span-4">
            <div className="w-full h-64 mb-8 overflow-hidden rounded-lg">
              <img 
                src="https://placehold.co/600x400/f5f5f5/000000?text=Image" 
                alt="UESC Event" 
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-8xl font-bold">UESC</h2>
          </div>

          {/* Middle Section: Links */}
          <div className="md:col-span-4">
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:underline text-2xl font-bold">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section: Contact Info */}
          <div className="md:col-span-4 text-left">
            <div>
              <h3 className="font-bold text-lg">UMN English Student Council (UESC)</h3>
              <p className="text-gray-600 mb-4">Empowering Voices, Building Confidence, Creating Community</p>
              
              <h3 className="font-bold text-lg mt-6">Universitas Multimedia Nusantara</h3>
              <p className="text-gray-600">
                Jl. Boulevard Raya, Gading Serpong, Tangerang, Banten – Indonesia
              </p>

              <div className="mt-6">
                <a href="mailto:uesc@umn.ac.id" className="block hover:underline text-gray-600">uesc@umn.ac.id</a>
                <a href="#" className="block hover:underline text-gray-600">@umn_uesc</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row for copyright and credits */}
        <div className="flex justify-between items-center mt-16 pt-8 border-t border-gray-200 text-sm">
          <p className="text-gray-600">
            © 2025 UMN English Student Council. All Rights Reserved.
          </p>
          <a href="#" className="hover:underline">Instagram</a>
          <p>Made by Sandya</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
