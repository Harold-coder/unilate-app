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
    const [endDelay, setEndDelay] = useState()

    const [patientHour, setPatientHour] = useState("0")

    const params = useParams()
    const id = params.id

    const delayToText = {
        0: "Pas de retard",
        15: "15 minutes",
        30: "30 minutes",
        45: "45 minutes",
        60: "1 heure"
    }

    const getUserById = (id) => {
        Axios.post("https://unilate-server-f22fc8c7c32c.herokuapp.com/getUserById", {
        id: id,
        }).then((data) => {
        setUser(data.data[0])
        setDelay(data.data[0].delay)
        setEndDelay(data.data[0].endDelay)
        setLoaded(true)
        });
    }

    useEffect(() => {
        getUserById(id);
    }, [id])

    const updateDelay = () => {
        Axios.post("https://unilate-server-f22fc8c7c32c.herokuapp.com/updateDelay", {
        id: id,
        delay: delay,
        endDelay: endDelay
        }).then((data) => {
            window.location.reload(false);
        });
    }

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
                        <option value={delay}>{delayToText[delay]}</option>
                        {delay !== 0 && <option value={0}>{delayToText[0]}</option>}
                        {delay !== 15 && <option value={15}>{delayToText[15]}</option>}
                        {delay !== 30 && <option value={30}>{delayToText[30]}</option>}
                        {delay !== 45 && <option value={45}>{delayToText[45]}</option>}
                        {delay !== 60 && <option value={60}>{delayToText[60]}</option>}
                    </select>
                    <p>Jusqu'a:</p>
                    <select className="dropdown" value={endDelay} onChange={(e) => setEndDelay(e.target.value)}>
                        {(endDelay === 24 && <option value={endDelay}>Toute la journée</option>) || <option value={endDelay}>{endDelay}h00</option>}
                        {endDelay !== hour+1 && <option value={hour+1}>{hour+1}h00</option>}
                        {endDelay !== hour+2 && <option value={hour+2}>{hour+2}h00</option>}
                        {endDelay !== hour+3 && <option value={hour+3}>{hour+3}h00</option>}
                    </select>
                    <button className="signup-button" onClick={updateDelay}>Enregistrer</button>
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
                    <p id="retard-announced">{delayToText[delay]}</p>
                </div>
                }
            </div>
        )
    }
}