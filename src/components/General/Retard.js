import React from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Retard(props) {
    const [user, setUser] = useState()
    const [loaded, setLoaded] = useState(false)
    const [delay, setDelay] = useState()

    const params = useParams()
    const id = params.id

    const getUserById = (id) => {
        Axios.post("https://unilate-server-f22fc8c7c32c.herokuapp.com/getUserById", {
        id: id,
        }).then((data) => {
        setUser(data.data[0])
        // console.log(data.data[0])
        setLoaded(true)
        setDelay(data.data[0].delay)
        });
    }

    useEffect(() => {
        getUserById(id);
    }, [id])

    // const updateDelay = (id, delay) => {
    //     Axios.post("https://unilate-server-f22fc8c7c32c.herokuapp.com/updateDelay", {
    //     id: id,
    //     delay: delay
    //     }).then((data) => {
    //     setUser(data.data[0])
    //     setLoaded(true)
    //     });
    // }
    
    if (props.page === "doctor" && loaded){
        return (
            <div className="retard-doctor">
                <p>Retard annoncé:</p>
                <select className="dropdown" value={delay} onChange={(e) => setDelay(e.target.value)}>
                    <option value="0">Pas de retard</option>
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">1 heure</option>
                </select>
            </div>
        )
    }
    else if (props.page === "patient" && loaded) {
        return (
            <div>
                <div className="heure-patient">
                    <p>Heure de votre rendez-vous:</p>
                    <select className="dropdown">
                        <option value="0">15h00</option>
                        <option value="15">16h00</option>
                        <option value="30">17h00</option>
                        <option value="45">18h00</option>
                        <option value="60">19h00</option>
                    </select>
                </div>
                <div className="retard-patient">
                    <p>Retard annoncé:</p>
                    <p id="retard-announced">{user.delay} minute(s)</p>
                </div>
            </div>
        )
    }
}