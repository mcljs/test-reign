import React from "react";

function Header() {
  return (
    <nav className='h-[114px] flex lg:justify-start justify-center items-center bg-gradient-header shadow-[0_1px_4px_0px_rgba(0,21,41,0.12)]'>
      <h1 className='relative container max-w-7xl mx-auto px-4 font-baskerville text-[28px] text-[#3b3b3b] uppercase'>
        Hacker News
      </h1>
    </nav>
  );
}

export default Header;
