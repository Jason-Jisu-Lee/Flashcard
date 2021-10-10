import React from "react";
import { useHistory } from "react-router-dom"
import { deleteCard } from "../../utils/api";

function CardList({ deck }) {
    //confirm delete; if the user confirms, refresh the page
    const history = useHistory()
    const cardDelete = (cardId) => {
        if(window.confirm("Delete this card?\n\nYou will not be able to recover it.")) {
            deleteCard(cardId);
            history.go(0)
            }
    }

    //confirm that the api has loaded successfully and there's at least one card; otherwise, return null
    if(deck.cards && deck.cards.length > 0) {
    const { cards } = deck;
    const cardList = cards.map((card) => {
        return (
            <div key = {card.id} className="row">
                <div className="col-sm-6">
                    <div className="card">
                    <div className="card-body">
                        <p className="card-text">{card.front}</p>
                    </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="card">
                    <div className="card-body">
                        <p className="card-text">{card.back}</p>
                        <button type = "button" className = "btn btn-secondary" onClick = {() => history.push(`/decks/${deck.id}/cards/${card.id}/edit`)}>Edit</button>
                        <button type = "button" className = "btn btn-danger ml-2" onClick = {() => cardDelete(card.id)}><i className="bi bi-trash"></i></button>
                    </div>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div>
        <h1>Cards</h1>
        {cardList}
        </div>
    )
}
    return null;
}

export default CardList;