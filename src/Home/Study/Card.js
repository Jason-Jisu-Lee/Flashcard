import React, { useState } from "react";
import { useHistory } from "react-router";

function Card({ deck }) {
/*
retrieve the deck from a parent component, then decompose into 'cards' variable;
set it to an empty array so it is not undefined when the function is being rendered before the state variable is updated
*/
const { cards = []} = deck;

//create a state variable for when the card is flipped
const [flip, setFlip] = useState(true)

//current number, or 'state' of the card, starting from the first index(0) of the array
const [nextState, setNextState] = useState(0)
const history = useHistory();

//change the 'flip' variable to true or false depending on whether it was set to false or true
const flipHandler = () => setFlip(!flip)

/*
change the 'flip' variable to true or false;
if the current card isn't the last card, set the 'nextState' +1 index;
if the current card is the last card, ask whether to restart. 'Cancel' will bring user to home
*/
const nextHandler = () => {
    setFlip(!flip)
    if(nextState < cards.length - 1) {
    setNextState(nextState + 1)
    } else {
    if(window.confirm("Restart cards?\n\nClick 'cancel' to return to the home page.")) {
        setNextState(0)
    } else {
        history.push("/")
    }
}
}

//map each card according to their index 
const card = cards.map((card, index) => {
    return (
    <div key = {card.index}>
        <div className="card">
        <div className="card-body">
            <h5 className="card-title">Card {index+1} of {cards.length}</h5>
              <p className="card-text"> { flip ? card.front : card.back }.</p>
              <button onClick = {flipHandler} type = "button" className = "btn btn-secondary mr-2">Flip</button>
              {flip ? null : <button onClick = {nextHandler}>Next</button> }
        </div>
        </div>
    </div>
    );
})

//if there are less than three cards in the deck, render this message
if(cards.length < 3) {
    return (
    <div>
<h2>Not Enough Cards.</h2>
<p>You need at least 3 cards to study. There are {cards.length} cards in this deck.</p>
    </div>
    )
}

//if there are at least three cards in the deck, render each card
return (
    <div>
    {card[nextState]}
    </div>
    );
}

export default Card;