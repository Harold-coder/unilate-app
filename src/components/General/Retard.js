import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { urlServer } from "../../App";

export default function Retard(props) {
    const [doctor, setDoctor] = useState(null);
    const [delay, setDelay] = useState(0);
    const [endDelay, setEndDelay] = useState(0);
    const [patientHour, setPatientHour] = useState("0");
    const [loaded, setLoaded] = useState(false);
    const { id } = useParams();

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
            fetchDoctorById(id);
            fetchCurrentDelay(id);
            console.log(delay)
        }
    }, [id]);

    const fetchDoctorById = async () => {
        try {
            const response = await Axios.get(`${urlServer}doctors/${id}`);
            setDoctor(response.data.doctor);
            setDelay(response.data.doctor.delayDuration);
            setEndDelay(response.data.doctor.endDelay);
            setLoaded(true);
        } catch (error) {
            console.error("Error fetching doctor's data:", error);
        }
    };

    const fetchCurrentDelay = async (doctorId) => {
        try {
            const response = await Axios.get(`${urlServer}delays/${doctorId}`);
            const delayData = response.data;
            console.log(response.data)
            setDelay(delayData.delay_duration);
            setEndDelay(delayData.end_timestamp); // Assuming this is how you store the end time of the delay
            setLoaded(true);
        } catch (error) {
            console.error("Error fetching delay data:", error);
        }
    };

    const updateDelay = async () => {
        try {
            const now = new Date().toISOString();
            const config = {
                headers: { 'x-access-tokens': token }
              };
            await Axios.put(`${urlServer}delays/${id}`, {
                delay_duration: delay,
                end_timestamp: endDelay,
            }, config);
            alert('Delay updated successfully!');
        } catch (error) {
            console.error("Error updating delay:", error);
        }
    };

    const handlePatientAppointment = (e) => {
        const patientAppointment = parseInt(e.target.value);
        setPatientHour(patientAppointment);
        if (patientAppointment <= doctor.endDelay) {
            setDelay(doctor.delay);
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
                        {Object.keys(delayToText).filter(d => d !== delay).map(d => (
                            <option key={d} value={d}>{delayToText[d]}</option>
                        ))}
                    </select>
                    <p>Jusqu'à:</p>
                    <select className="dropdown" value={endDelay} onChange={(e) => setEndDelay(e.target.value)}>
                        <option value={endDelay}>{endDelay === 24 ? 'Toute la journée' : `${endDelay}h00`}</option>
                        {Array.from({ length: 4 }, (_, i) => patientHour + i + 1).filter(h => h !== endDelay).map(h => (
                            <option key={h} value={h}>{`${h}h00`}</option>
                        ))}
                    </select>
                    <button className="signup-button" onClick={updateDelay}>Enregistrer</button>
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
                        {Array.from({ length: 4 }, (_, i) => patientHour + i).map(h => (
                            <option key={h} value={h}>{`${h}h00`}</option>
                        ))}
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
        return <div>Loading...</div>;
    }
}