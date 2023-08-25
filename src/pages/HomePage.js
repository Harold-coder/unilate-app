import Card from '../components/HomePage/Card';
import Hero from '../components/HomePage/Hero';
import NavbarHome from '../components/HomePage/NavbarHome';
import Search from '../components/HomePage/Search';
import React from 'react';
import Axios from "axios";
import { useEffect, useState} from 'react';

function HomePage() {
  const [randomUsers, setRandomUsers] = useState([])

  useEffect(()=> {
    var users = []
    Axios.get("https://unilate-server-f22fc8c7c32c.herokuapp.com/getUsers").then((data) => {
      users = data.data;
      var lastAdded = users.length - 1
      const newRandomNumbers = [lastAdded];
      const newRandomUsers = [users[lastAdded]];
      while (newRandomNumbers.length < 3) {
        const randomNumber = Math.floor(Math.random() * users.length);
        if (!newRandomNumbers.includes(randomNumber)) {
          newRandomNumbers.push(randomNumber);
          newRandomUsers.push(users[randomNumber]);
        }
      }
      setRandomUsers(newRandomUsers)
    });

  }, []);

  var usersDisplayed = []
  if (randomUsers.length > 2){
    usersDisplayed = randomUsers.map(user =>{
      return (
        <Card 
        key={user.id}
        picture = {user.gender.concat("-image.png")}
        name = {user.fullName}
        city = {user.city}
        job = {user.profession.charAt(0).toUpperCase() + user.profession.slice(1)}
        />
      )
    })
  }

  return (
    <div className='home-page'>
      <NavbarHome/>
      <Hero/>
      <Search/>
      <div className='cards'>
        {usersDisplayed}
      </div>
    </div>
  );
}

export default HomePage;
