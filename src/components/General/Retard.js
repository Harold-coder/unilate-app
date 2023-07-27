import React from "react"

export default function Retard(props) {
    
    if (props.page === "doctor"){
        return (
            <div className="retard-doctor">
                <p>Retard annoncé:</p>
                <select className="dropdown">
                    <option value="0">Pas de retard</option>
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">1 heure</option>
                </select>
            </div>
        )
    }
    else if (props.page === "patient") {
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
                    <p id="retard-announced">20 minutes</p>
                </div>
            </div>
        )
    }
}