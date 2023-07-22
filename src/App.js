import './App.css';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Search from './components/Search';

function App() {
  return (
    <div className='app'>
      <Navbar/>
      <Hero/>
      <Search/>
    </div>
  );
}

export default App;
