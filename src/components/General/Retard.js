import React from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Retard(props) {
    const date = new Date();
    let hour = date.getHours();
    const [user, setUser] = useState()
    const [loaded, setLoaded] = useState(false)
    const [delay, setDelay] = useState()

    const [patientHour, setPatientHour] = useState("0")

    const params = useParams()
    const id = params.id

    const getUserById = (id) => {
        Axios.post("https://unilate-server-f22fc8c7c32c.herokuapp.com/getUserById", {
        id: id,
        }).then((data) => {
        setUser(data.data[0])
        setLoaded(true)
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

    function getDoctorDelay(e){
        var patientAppointment = e.target.value;
        setPatientHour(e.target.value);
        if (patientAppointment <= user.endDelay){
            setDelay(user.delay);
        } else{
            setDelay(0)
        }
    }
    
    if (props.page === "doctor" && loaded){
        return (
            <div>
                <div className="retard-doctor">
                    <p>Retard annoncé:</p>
                    <select className="dropdown" value={delay} onChange={(e) => setDelay(e.target.value)}>
                        <option value="0">Pas de retard</option>
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="45">45 minutes</option>
                        <option value="60">1 heure</option>
                    </select>

                    <p>Jusqu'a:</p>
                    <select className="dropdown" value={delay} onChange={(e) => setDelay(e.target.value)}>
                        <option value="0">15 heure</option>
                        <option value="15">16 heure</option>
                        <option value="30">17 heure</option>
                        <option value="45">18 heure</option>
                        <option value="60">19 heure</option>
                    </select>
                    <button className="signup-button" >Enregistrer</button>
                </div>


            </div>
           
        )
    }
    else if (props.page === "patient" && loaded) {
        return (
            <div>
                <div className="heure-patient">
                    <p>Heure de votre rendez-vous:</p>
                    <select className="dropdown" onChange={getDoctorDelay}>
                        <option value="0"></option>
                        <option value={hour}>{hour}h00</option>
                        <option value={hour+1}>{hour+1}h00</option>
                        <option value={hour+2}>{hour+2}h00</option>
                        <option value={hour+3}>{hour+3}h00</option>
                    </select>
                </div>
                { patientHour !== "0" && 
                <div className="retard-patient">
                    <p>Retard annoncé:</p>
                    <p id="retard-announced">{delay} minute{delay>0 && "(s)"}</p>
                </div>
                }
            </div>
        )
    }
}