import React from 'react';

export function PageShell({ children }) {
  return (
    <div className="min-h-screen bg-[#ECE7DC] dark:bg-[#ECE7DC] text-gray-900 dark:text-gray-900 relative overflow-x-hidden">
      {/* Background Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] z-0" />
      
      <div className="relative z-10 max-w-md mx-auto min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  );
}
