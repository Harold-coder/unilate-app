import Card from '../components/HomePage/Card';
import Hero from '../components/HomePage/Hero';
import NavbarHome from '../components/HomePage/NavbarHome';
import Search from '../components/HomePage/Search';
import React from 'react';

function HomePage() {
  const [loading, setLoading] = React.useState(false);

  return (
    <div className='home-page'>
        <NavbarHome/>
        <Hero/>
        <Search/>
        <div className='cards'>
          <Card 
            picture="person-image.png" 
            name="Jeanne Vdekerck" 
            city="Bruxelles"
            job="Surgeon"
          />
          <Card 
            picture="person-image.png" 
            name="Anne-Sophie Lagarde" 
            city="Chaumont-Gistoux"
            job="Cardiologue"
          />
          <Card 
            picture="single-person.png" 
            name="Etienne Castiaux" 
            city="Wavre"
            job="Généraliste"
          />
        </div>
    </div>
  );
}

export default HomePage;
