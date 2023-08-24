import Card from '../components/HomePage/Card';
import Hero from '../components/HomePage/Hero';
import NavbarHome from '../components/HomePage/NavbarHome';
import Search from '../components/HomePage/Search';
import React from 'react';
// import Axios from "axios"
// import { useEffect, useState} from 'react';

function HomePage() {
  // const [users, setUsers] = useState([]) 
  // const [randomUsers, setRandomUsers] = useState([])

  // useEffect(()=> {
  //   Axios.get("https://unilate-server-f22fc8c7c32c.herokuapp.com/getUsers").then((data) => {
  //     // console.log(data);
  //     setUsers(data.data);
  //   });
  // }, []);

  // useEffect(() => {
  //   if (users.length >= 3){
  //     getRandomUsers();
  //   }
  // }, [users]);

  // const getRandomUsers = () => {
  //   const newRandomNumbers = [];
  //   const newRandomUsers = [];
  //   while (newRandomNumbers.length < 3) {
  //     const randomNumber = Math.floor(Math.random() * 8); // Generates random number between 0 and 8
  //     if (!newRandomNumbers.includes(randomNumber)) {
  //       newRandomNumbers.push(randomNumber);
  //       newRandomUsers.push(users[randomNumber]);
  //     }
  //   }
  //   setRandomUsers(newRandomUsers);
  // };

  // var usersDisplayed = []
  // if (randomUsers.length > 2){
  //   usersDisplayed = randomUsers.map(user =>{
  //     return (
  //       <Card 
  //       picture="woman-image.png" 
  //       name = {user.fullName}
  //       city = {user.city}
  //       job = {user.profession}
  //       />
  //     )
  //   })
  // }

  return (
    <div className='home-page'>
      <NavbarHome/>
      <Hero/>
      <Search/>
      <div className='cards'>
        <Card 
          picture="woman-image.png" 
          name="Jeanne Vdekerck" 
          city="Bruxelles"
          job="Surgeon"
        />
        <Card 
          picture="woman-image.png" 
          name="Anne-Sophie Lagarde" 
          city="Chaumont-Gistoux"
          job="Cardiologue"
        />
        <Card 
          picture="man-image.png" 
          name="Etienne Castiaux" 
          city="Wavre"
          job="Généraliste"
        />
      </div>
    </div>
  );
}

export default HomePage;
