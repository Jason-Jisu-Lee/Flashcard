import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateCard, readCard } from "../../utils/api"
import Form from "./Form";

function EditCard() {
    //create the deck and formData state variable
    const [deck, setDeck] = useState({})
    const { deckId, cardId } = useParams();
    const history = useHistory();
    const [formData, setFormData] = useState({
        front: "",
        back: ""
    })

    /*
    retrieve the Deck using deckId and the specific card using cardId;
    then, set them to the values of the 'deck' and 'formData' variables, respectively
    */
    useEffect(() => {
        readDeck(deckId).then(setDeck);
        readCard(cardId).then(setFormData)
    }, [deckId, cardId])

    //update the card using 'updateCard' function and send the user to the Deck screen
    const submitHandler = (event) => {
        event.preventDefault();
        updateCard(formData);
        history.push(`/decks/${deck.id}`)
    };

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
                <li className="breadcrumb-item"><Link to = "">Deck {deck.name}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
            </ol>
        </nav>
        <h1>Edit Card</h1>
        <Form changeHandler = {changeHandler} submitHandler={submitHandler} deck={deck} formData ={formData}/>
    </div>
    )
};

export default EditCard;