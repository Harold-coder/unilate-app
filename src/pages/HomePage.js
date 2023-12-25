import { Link } from 'react-router-dom';
import Search from '../components/HomePage/Search';
import React from 'react';

function HomePage() {
  return (
    <div className='home-page'>
      <nav>
            <Link className="link" to="/login">
                <button className="inscription">Médecin</button>
            </Link>
        </nav>
        <h1 className="hero"><b id="first-letter">U</b>nilate</h1>
      <Search/>
    </div>
  );
}

export default HomePage;
