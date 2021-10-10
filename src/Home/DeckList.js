import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { listDecks } from "../utils/api";
import { deleteDeck } from "../utils/api";


function DeckList() {
    //create a state variable for the deck list0
    const [ deckList, setDeckList ] = useState([]);
    const history = useHistory();

    //handle delete button; confirm delete. then, refresh page
    const deleteHandler = (deckId) => {
        if(window.confirm("Delete this deck?\n\nYou will not be able to recover it.")) {
        deleteDeck(deckId);
        history.go(0);
        }
    }

    //retrieve all existing decks and transfer them to state variable "deckList"
    useEffect(() => {
        listDecks().then(setDeckList);
    }, []);


    //map each deckList to show individual deck
    const decks = deckList.map((deck) => {
        return (
                <div key = {deck.id} className="card">
                    <div className="card-body">
                        <div className = "row ml-1">
                            <h5 className="card-title mr-5">{deck.name}</h5>
                            <p className = "text-secondary">{deck.cards.length} cards</p>
                        </div>
                        <p className="card-text text-secondary">{deck.description}</p>
                        <Link to = {`/decks/${deck.id}`} className = "btn btn-primary mr-2"><i className ="bi bi-eye"></i> View</Link>
                        <Link to = {`/decks/${deck.id}/study`} className = "btn btn-primary mr-5"><i className="bi bi-journal-bookmark"></i> Study</Link>
                        <button onClick = {() => deleteHandler(deck.id)} type = "button" className = "btn btn-danger ml-5"><i className="bi bi-trash"></i></button>
                    </div>
                </div>
        );
    });

    return (
        <section>
        <Link to = "/decks/new" className="btn btn-secondary mb-2"><i className="bi bi-plus-lg"></i> Create Deck</Link>
        {decks}
        </section>
    )
};

export default DeckList;