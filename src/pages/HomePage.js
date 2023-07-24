import Card from '../components/HomePage/Card';
import Hero from '../components/HomePage/Hero';
import NavbarHome from '../components/HomePage/NavbarHome';
import Search from '../components/HomePage/Search';

function HomePage() {
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
          name="Marie-Anne Labaisse" 
          city="Tournai"
          job="Radiologue"
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
