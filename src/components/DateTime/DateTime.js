import React, { useEffect, useState } from "react"
import "./DateTime.css";

export default function DateTime() {

    var [date, setDate] = useState(new Date())

    useEffect(() => {
        var timer = setInterval(() => setDate(new Date(), 1000))

        return function cleanup(){
            clearInterval(timer)
        }
    });
    
    return (
        <div className="date-time">
            <p>
                {date.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                    .replace(/^\S/, (s) => s.toUpperCase())}
            </p>
            <p>{date.toLocaleTimeString('fr-FR')}</p>
        </div>
    )
}