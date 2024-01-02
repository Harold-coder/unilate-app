import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { urlServer } from "../../App";

export default function Retard(props) {
    const date = new Date();
    let hour = date.getHours();

    const [delay, setDelay] = useState(0);
    const [endDelay, setEndDelay] = useState(0);
    const [updated, setUpdated] = useState(false);
    const [patientHour, setPatientHour] = useState("0");
    const [loaded, setLoaded] = useState(false);
    const { id } = useParams();

    // Axios defaults for all requests
    Axios.defaults.withCredentials = true;

    const token = localStorage.getItem('token');
    
    const delayToText = {
        0: "Pas de retard",
        15: "15 minutes",
        30: "30 minutes",
        45: "45 minutes",
        60: "1 heure"
    };

    useEffect(() => {
        if (id) {
            fetchCurrentDelay(id);
        }
    }, [id]);

    const fetchCurrentDelay = async (doctorId) => {
        try {
            const response = await Axios.get(`${urlServer}delays/${doctorId}`);
            const delayData = response.data;
            setDelay(delayData.delay_duration);
            setEndDelay(delayData.end_timestamp);
            setLoaded(true);
        } catch (error) {
            console.error("Error fetching delay data:", error);
        }
    };

    const updateDelay = async () => {
        try {
          // Since we're using cookies, no need to send the token in headers
          await Axios.put(`${urlServer}delays/${id}`, {
            delay_duration: delay,
            end_timestamp: endDelay,
            start_timestamp: new Date().getHours(), // or any other logic to set the hour
            announcement_timestamp: new Date().getHours() // same as above
          });
          setUpdated(true);
        } catch (error) {
          console.error("Error updating delay:", error);
        }
    };

    const handlePatientAppointment = (e) => {
        const patientAppointment = parseInt(e.target.value);
        setPatientHour(patientAppointment);
        if (patientAppointment <= endDelay) {
            setDelay(delay);
        } else {
            setDelay(0);
        }
    };
    
    if (props.page === "doctor" && loaded) {
        return (
             <div>
                <div className="retard-doctor">
                    <p>Retard annoncé:</p>
                    <select className="dropdown" value={delay} onChange={(e) => setDelay(e.target.value)}>
                        <option value={delay}>{delayToText[delay]}</option>
                        {parseInt(delay) !== 0 && <option value={0}>{delayToText[0]}</option>}
                        {parseInt(delay) !== 15 && <option value={15}>{delayToText[15]}</option>}
                        {parseInt(delay) !== 30 && <option value={30}>{delayToText[30]}</option>}
                        {parseInt(delay) !== 45 && <option value={45}>{delayToText[45]}</option>}
                        {parseInt(delay) !== 60 && <option value={60}>{delayToText[60]}</option>}
                    </select>
                    <p>Jusqu'a:</p>
                    <select className="dropdown" value={endDelay} onChange={(e) => setEndDelay(e.target.value)}>
                        {(parseInt(endDelay) === 24 && <option value={endDelay}>Toute la journée</option>) || <option value={endDelay}>{endDelay}h00</option>}
                        {parseInt(endDelay) !== hour+1 && <option value={hour+1}>{hour+1}h00</option>}
                        {parseInt(endDelay) !== hour+2 && <option value={hour+2}>{hour+2}h00</option>}
                        {parseInt(endDelay) !== hour+3 && <option value={hour+3}>{hour+3}h00</option>}
                        {parseInt(endDelay) !== 24 && <option value={24}>Toute la journée</option>}
                    </select>
                    <button className="signup-button" onClick={updateDelay}>Enregistrer</button>
                    {updated && <label className="signup-label">Votre retard a été mis à jour!</label>}
                </div>
            </div>
        );
    } else if (props.page === "patient" && loaded) {
        return (
            <div>
                <div className="heure-patient">
                    <p>Heure de votre rendez-vous:</p>
                    <select className="dropdown" onChange={handlePatientAppointment}>
                        <option value="0"></option>
                        <option value={hour}>{hour}h00</option>
                        <option value={hour+1}>{hour+1}h00</option>
                        <option value={hour+2}>{hour+2}h00</option>
                        <option value={hour+3}>{hour+3}h00</option>
                    </select>
                </div>
                {patientHour !== "0" && (
                    <div className="retard-patient">
                        <p>Retard annoncé:</p>
                        <p id="retard-announced">{delayToText[delay]}</p>
                    </div>
                )}
            </div>
        );
    }  else {
        return <div className="loading">Loading...</div>;
    }
}