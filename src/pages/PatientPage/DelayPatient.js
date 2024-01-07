import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { localDev, urlServer } from "../../App";
import Loading from "../../components/Loading";

export default function DelayPatient() {
    const date = new Date();
    let hour = date.getHours();

    const [delay, setDelay] = useState(0);
    const [endDelay, setEndDelay] = useState(0);
    const [patientHour, setPatientHour] = useState("0");
    const [loaded, setLoaded] = useState(false);
    const { id } = useParams();

    // Axios defaults for all requests
    Axios.defaults.withCredentials = true;
    
    const delayToText = {
        0: "Pas de retard",
        15: "15 minutes",
        30: "30 minutes",
        45: "45 minutes",
        60: "1 heure"
    };


    useEffect(() => {
        if (id) {
            if (localDev) {
                setDelay(30);
                setEndDelay(date.getHours()+2);
                setLoaded(true);
            } else{
                fetchCurrentDelay(id);
            }
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

    const handlePatientAppointment = (e) => {
        const patientAppointment = parseInt(e.target.value);
        setPatientHour(patientAppointment);
        if (patientAppointment <= endDelay) {
            setDelay(delay);
        } else {
            setDelay(0);
        }
    };
    
    if (loaded) {
        return (
            <div>
                <div className="heure-patient">
                    <p>Heure de votre rendez-vous:</p>
                    <select className="dropdown" onChange={handlePatientAppointment}>
                        <option value="0">...</option>
                        <option value={hour}>{hour}h00</option>
                        <option value={(hour+1)%24}>{(hour+1)%24}h00</option>
                        <option value={(hour+2)%24}>{(hour+2)%24}h00</option>
                        <option value={(hour+3)%24}>{(hour+3)%24}h00</option>
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
        return <Loading/>;
    }
}