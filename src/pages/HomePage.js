import Hero from '../components/HomePage/Hero';
import NavbarHome from '../components/HomePage/NavbarHome';
import Search from '../components/HomePage/Search';
import React from 'react';

function HomePage() {
  return (
    <div className='home-page'>
      <NavbarHome/>
      <Hero/>
      <Search/>
    </div>
  );
}

export default HomePage;
