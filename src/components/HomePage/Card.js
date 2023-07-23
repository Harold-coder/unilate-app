import React from "react"

export default function Card(props) {
    function handleClick() {
        console.log(props.name);
    }
    return (
        <div className="card" onClick={handleClick}>
            <img className="profile-picture" src={require("../../images/"+props.picture)} alt="pic"></img>
            <h1 className="name">{props.name}</h1>
            <p className="personal-info">{props.city}</p>
            <p className="personal-info">{props.job}</p>

        </div>
    )
}