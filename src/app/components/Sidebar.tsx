'use client'
import React, { useState } from 'react';
import { Settings, User, Gamepad, LayoutDashboard, AlignStartHorizontal, Unplug, Sparkle } from 'lucide-react';
import { IconLink } from '@tabler/icons-react';

const Sidebar = () => {
  // Set initial active item to "dashboard"
  const [activeItem, setActiveItem] = useState<'dashboard' | 'other'>('dashboard');

  // Function to handle icon click, for demo we only update the dashboard icon
  const handleDashboardClick = () => {
    setActiveItem('dashboard');
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-20 border-r border-white/20 bg-black/90 flex flex-col items-center py-4 gap-8">
      {/* Top section */}
      <div className="flex flex-col mt-3 items-center gap-6">
        <Sparkle
          className="w-6 h-6 text-emerald-400 filter brightness-125 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]"
          fill="rgb(52,211,153)"
        />
        <div className="flex flex-col mt-20 gap-8">
          <div onClick={handleDashboardClick}>
            <LayoutDashboard
              className={`w-6 h-6 transition-all duration-300 cursor-pointer ${activeItem === 'dashboard' 
                ? 'text-emerald-400 filter brightness-125 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]' 
                : 'text-gray-400 hover:text-emerald-400 hover:filter hover:brightness-125 hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]'
              }`}
            />
          </div>
          
          <div className="relative">
            <div className="absolute -right-1 -top-1 w-2.5 h-2.5 bg-emerald-400 rounded-full"></div>
            <AlignStartHorizontal 
              className="w-6 h-6 text-gray-400 hover:text-emerald-400 hover:filter hover:brightness-125 hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.8)] transition-all duration-300 cursor-pointer"
            />
          </div>
          
          <User 
            className="w-6 h-6 text-gray-400 hover:text-emerald-400 hover:filter hover:brightness-125 hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.8)] transition-all duration-300 cursor-pointer"
          />
          
          <IconLink
            className="w-6 h-6 text-gray-400 hover:text-emerald-400 hover:filter hover:brightness-125 hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.8)] transition-all duration-300 cursor-pointer"
          />
        </div>
      </div>

      {/* Bottom section */}
      <div className="mt-auto">
        <Settings 
          className="w-6 h-6 text-gray-400 hover:text-emerald-400 hover:filter hover:brightness-125 hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.8)] transition-all duration-300 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Sidebar;