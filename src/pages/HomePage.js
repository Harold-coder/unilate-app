import Card from '../components/Card';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Search from '../components/Search';

function Home() {
  return (
    <div className='home-page'>
      <Navbar/>
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

export default Home;
