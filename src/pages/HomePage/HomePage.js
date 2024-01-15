import React from 'react';
import Hero from './Hero/Hero';
import NavbarHome from './NavbarHome/NavbarHome';
import Search from './Search/Search';

function HomePage() {
  return (
    <div>
        <NavbarHome />
        <Hero />
        <Search/>
    </div>
  );
}

export default HomePage;
