import Card from './Card';
import React from "react";
import Axios from "axios";
import { useEffect, useState} from 'react';

export default function Search() {
    const [usersShown, setUsersShown] = useState([])
    var usersDisplayed = []

    function showRandomUsers() {
        var users = []
        Axios.get("https://unilate-server-f22fc8c7c32c.herokuapp.com/getUsers").then((data) => {
        users = data.data;
        const newRandomNumbers = [];
        const newusersShown = [];
        while (newRandomNumbers.length < 3) {
            const randomNumber = Math.floor(Math.random() * users.length);
            if (!newRandomNumbers.includes(randomNumber)) {
            newRandomNumbers.push(randomNumber);
            newusersShown.push(users[randomNumber]);
            }
        }
        setUsersShown(newusersShown)
        });
    }
    
    useEffect(()=> {
        showRandomUsers()
    }, []);

    function searchUser(fullName){
        Axios.post("https://unilate-server-f22fc8c7c32c.herokuapp.com/searchUser", {
            fullName: fullName
        }).then((data) => {
            setUsersShown(data.data)
        });
        if (fullName.length === 0){
            showRandomUsers()
        }
    }

    if (usersShown.length > 0){
        var limitedToThree = usersShown.slice(0, 3)
        usersDisplayed = limitedToThree.map(user =>{
        return (
            <Card 
            key={user.id}
            id = {user.id}
            picture = {user.gender.concat("-image.png")}
            name = {user.fullName}
            city = {user.city}
            job = {user.profession.charAt(0).toUpperCase() + user.profession.slice(1)}
            />
        )
        })
    }
    
    return (
        <div className="input-area">
            <input className="search" type="text" placeholder="Rechercher votre médecin" onChange={(e) => searchUser(e.target.value)}></input>
            <div className='cards'>
                {usersDisplayed}
            </div>
        </div>
    )
}