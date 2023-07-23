import React from "react"

export default function NavbarPatient() {
    function handleClickTitle(){
        console.log("Unilate")
    }
    return (
        <nav>
            <p className="title" onClick={handleClickTitle}>Unilate</p>
        </nav>
    )
}