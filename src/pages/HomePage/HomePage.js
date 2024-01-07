import React from 'react';
import Hero from './Hero';
import NavbarHome from './NavbarHome';
import Search from './Search';

function HomePage() {
  return (
    <div className='home-page'>
        <NavbarHome />
        <Hero />
        <Search/>
    </div>
  );
}

export default HomePage;
