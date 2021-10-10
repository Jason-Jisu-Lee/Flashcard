import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../../utils/api"
import { createCard } from "../../utils/api";
import Form from "./Form";

function AddCard() {
    //create the deck and formData state variable
    const [deck, setDeck] = useState({})
    const { deckId } = useParams();
    const [formData, setFormData] = useState({
        front: "",
        back: ""
    })

    //retrieve the deck using 'readDeck' function and set it to the deck variable
    useEffect(() => {
        readDeck(deckId).then(setDeck)
    }, [deckId])

    //create the card with the saved data using formData variable; then, reset the form
    const submitHandler = (event) => {
        event.preventDefault();
        createCard(deck.id, formData);
        setFormData({
            front: "",
            back: ""
        })
    }

    //save the form data by matching the value with the name of the input variable
    const changeHandler = ({target}) => {
        setFormData({
            ...formData,
            [target.name]: target.value
        });
    }

    return (
    <div>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to = "/"><i className="bi bi-house-door-fill"></i> Home</Link></li>
                <li className="breadcrumb-item"><Link to = "">{deck.name}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
            </ol>
        </nav>
        <h1>{deck.name}: Add Card</h1>
        <Form changeHandler = {changeHandler} submitHandler={submitHandler} deck={deck} formData ={formData}/>
    </div>
    )
}

export default AddCard;