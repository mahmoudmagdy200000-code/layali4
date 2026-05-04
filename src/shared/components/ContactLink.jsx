import React from 'react';

export function ContactLink({ href, text, icon: Icon, isWhatsApp }) {
  return (
    <a
      href={href}
      target={isWhatsApp ? "_blank" : "_self"}
      rel={isWhatsApp ? "noopener noreferrer" : ""}
      aria-label={text}
      className={`flex items-center justify-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
        isWhatsApp 
          ? 'bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/20 hover:border-[#25D366]/50 shadow-sm'
          : 'bg-[#233a34]/5 hover:bg-[#233a34]/10 border border-[#233a34]/10 hover:border-[#233a34]/30'
      }`}
    >
      {Icon && <Icon className={`w-5 h-5 ${isWhatsApp ? 'text-[#25D366]' : 'text-[#233a34]'}`} />}
      <span className={`font-medium tracking-wide ${isWhatsApp ? 'font-arabic text-[#1a2c27]' : 'text-[#233a34] font-sans'}`}>
        {text}
      </span>
    </a>
  );
}
