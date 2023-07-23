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
          name="Jeanne VanDerkn" 
          city="Tournai"
          job="Surgeon"
        />
        <Card 
          picture="person-image.png" 
          name="Francois Poitier" 
          city="Walhain"
          job="Ophtalmo"
        />
        <Card 
          picture="person-image.png" 
          name="Etienne Castiaux" 
          city="Wavre"
          job="Plombier"
        />
      </div>
    </div>
  );
}

export default HomePage;
