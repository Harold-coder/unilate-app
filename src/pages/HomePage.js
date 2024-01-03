import { Link } from 'react-router-dom';
import Search from '../components/HomePage/Search';
import React from 'react';
import NavbarHome from '../components/HomePage/NavbarHome';

function HomePage() {
  return (
    <div className='home-page'>
        <NavbarHome />
        <h1 className="hero"><b id="first-letter">U</b>nilate</h1>
        <Search/>
    </div>
  );
}

export default HomePage;
