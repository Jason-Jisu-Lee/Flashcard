import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";
import Card from "./Card";

function Study() {
    //create a state variable for a deck
    const [deck, setDeck] = useState({})
    const { deckId } = useParams();

    //retrieve a deck with a specific ID, using the current parameter
    useEffect(() => {
                readDeck(deckId).then(setDeck)
    }, [deckId])

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to = "/"><i className="bi bi-house-door-fill"></i> Home</Link></li>
                    <li className="breadcrumb-item"><Link to = "">{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
            <h1>Study: {deck.name}</h1>
            <Card deck = {deck}/>
        </div>
    )
};

export default Study;