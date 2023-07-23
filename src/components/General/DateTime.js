import React, { useEffect, useState } from "react"

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
            <p>{date.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}</p>
            <p>{date.toLocaleTimeString()}</p>
        </div>
    )
}