import React from 'react';
import Navbar from '../components_lite/Navbar';
import Rocky from './Rocky.png'; // Import the local image
import Shan from './Shan.png';
import Saimon from './Saimon.png';

const Creator = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-100 min-h-screen">
      <Navbar />
      
      <div className="text-center p-10">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Meet Our Team</h2>
        <p className="text-gray-700 max-w-xl mx-auto mb-10 text-lg">
          A passionate team of developers and designers committed to crafting innovative solutions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Developer 1 - Rocky */}
          <a href="https://rockybarua.netlify.app/" target="_blank" rel="noopener noreferrer" className="block text-center bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all transform hover:scale-105">
            <img src={Rocky} alt="Rocky" className="mx-auto rounded-full shadow-md w-40 h-40 object-cover border-4 border-blue-400 hover:border-blue-600 transition-all" />
            <h3 className="text-xl font-semibold text-gray-800 mt-4">Biplop Barua</h3>
            <p className="text-gray-600 text-md">ID No: 0222320005101009</p>
            <p className="text-gray-700 text-md font-medium">Full Stack Developer</p>
          </a>
          
          {/* Developer 2 - Saymon */}
          <a href="https://saimonneo.github.io/My-portfolio/portfolio.html" className="block text-center bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all transform hover:scale-105">
            <img src={Saimon} alt="Saymon" className="mx-auto rounded-full shadow-md w-40 h-40 object-cover border-4 border-purple-400 hover:border-purple-600 transition-all" />
            <h3 className="text-xl font-semibold text-gray-800 mt-4">Mohammad Saymon</h3>
            <p className="text-gray-600 text-md">Registration No: 0222320005101003</p>
            <p className="text-gray-700 text-md font-medium">Full Stack Developer</p>
          </a>
          
          {/* Developer 3 - Shan */}
          <a href="#" className="block text-center bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all transform hover:scale-105">
            <img src={Shan} alt="Shan" className="mx-auto rounded-full shadow-md w-40 h-40 object-cover border-4 border-green-400 hover:border-green-600 transition-all" />
            <h3 className="text-xl font-semibold text-gray-800 mt-4">Tawsif Sukkur Shan</h3>
            <p className="text-gray-600 text-md">ID No: 0222320005101026</p>
            <p className="text-gray-700 text-md font-medium">Full Stack Developer</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Creator;
