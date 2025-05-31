
import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="relative w-14 h-14 overflow-hidden rounded-full">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-blue-700 group-hover:from-green-500 group-hover:to-blue-600 transition-colors duration-500"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Stylized river and mountain logo */}
          <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg">
            {/* Mountain */}
            <path d="M22 20L14 4L8 12L2 20H22Z" fill="#e0f2f1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            {/* River */}
            <path d="M3 15C5 13 7 15 9 13C11 11 13 13 15 11C17 9 19 11 21 9" stroke="#bbdefb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            {/* Sun */}
            <circle cx="17" cy="7" r="2" fill="#ffeb3b" stroke="currentColor" strokeWidth="0.5"/>
            {/* Tree */}
            <path d="M9 17V20" stroke="#2e7d32" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M9 14L7 17H11L9 14Z" fill="#2e7d32" stroke="#2e7d32" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 12L6.5 16H11.5L9 12Z" fill="#2e7d32" stroke="#2e7d32" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-lg font-display font-bold text-green-700 leading-tight group-hover:text-green-600 transition-colors duration-300">
          Dandeli Adventure
        </span>
        <span className="text-base font-medium text-blue-600 group-hover:text-blue-500 transition-colors duration-300">
          Resorts
        </span>
      </div>
    </Link>
  );
};

export default Logo;
