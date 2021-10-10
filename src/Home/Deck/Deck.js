import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory, useRouteMatch } from "react-router-dom";
import { readDeck } from "../../utils/api";
import { deleteDeck } from "../../utils/api";
import CardList from "./CardList";

function Deck() {
//create the deck state variable
    const [deck, setDeck] = useState({})
    const { deckId }= useParams();
    const history = useHistory();
    const { url } = useRouteMatch();

//retrieve the deck using 'readDeck' function and set it to the deck variable
useEffect(() => {
    readDeck(deckId).then(setDeck);
}, [deckId]);

//confirm delete
const deleteHandler = (deckId) => {
    if(window.confirm("Delete this deck?\n\nYou will not be able to recover it.")) {
    deleteDeck(deckId);
    history.go(-2)
    }
}

return (
    <div className = "mb-5">
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to = "/"><i className="bi bi-house-door-fill"></i> Home</Link></li>
                <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
            </ol>
        </nav>
        <div key = {deck.id} className="card mb-3">
                <div className="card-body">
                      <div className = "row ml-1">
                         <h5 className="card-title mr-5">{deck.name}</h5>
                     </div>
                      <p className="card-text text-secondary">{deck.description}</p>
                      <button onClick = {() => history.push(`${url}/edit`)} className = "btn btn-secondary mr-2">Edit</button>
                      <Link to = {`${url}/study`} className = "btn btn-primary mr-2"><i className="bi bi-journal-bookmark"></i> Study</Link>
                      <button onClick = {() => history.push(`${url}/cards/new`)} className = "btn btn-primary mr-5">Add Cards</button>
                      <button onClick = {() => deleteHandler(deck.id)} type = "button" className = "btn btn-danger ml-5"><i className="bi bi-trash"></i></button>
                  </div>
        </div>
        <CardList deck = {deck} />
    </div>
    )
}

export default Deck;