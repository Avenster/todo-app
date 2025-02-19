// src/app/components/Navbar.tsx

'use client'
import React,{useEffect} from 'react';
import { Search } from 'lucide-react';
import Image from 'next/image';
import { useAppSelector } from '../hooks';
import { ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const notifications = useAppSelector((state) => state.notifications.count);

  
  return (
    <nav className="h-14 px-4 flex items-center justify-between sticky left-0 right-0 top-0 bg-black py-12">
      {/* Search Section */}
      <div className="flex items-center flex-1 max-w-2xl">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-500/10 text-white pl-10 pr-4 py-2 rounded-md 
                     placeholder-gray-400 focus:outline-none focus:ring-2 
                     focus:ring-gray-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <div className="cursor-pointer">
            <div className="relative">
              <svg 
                viewBox="0 0 24 24" 
                className="h-6 w-6 text-white"
                fill="none" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
                />
              </svg>
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-xs text-white">
                  {notifications}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="h-8 w-8 rounded-full bg-gray-600 overflow-hidden relative">
            <Image
              src="/w1.jpg"
              alt="Profile"
              fill={true}
              sizes="32px"
              className="object-cover "
            />
          </div>
          <span className="text-white font-medium">Ankur Kaushal</span>
          <ChevronDown className='text-gray-400' size={16} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;