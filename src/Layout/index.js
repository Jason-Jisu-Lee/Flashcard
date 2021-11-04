import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Deck from "../Home/Deck/Deck";
import EditCard from "../Home/Deck/EditCard";
import EditDeck from "../Home/Deck/EditDeck";
import DeckList from "../Home/DeckList";
import CreateDeck from "../Home/CreateDeck";
import Study from "../Home/Study/Study";
import AddCard from "../Home/Deck/AddCard";

function Layout() {
  return (
    < >
      <Header />
      <div className="container">
        <Switch>
          <Route path = "/decks/new">
            <CreateDeck />
          </Route>
          <Route path = "/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route path = "/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path = "/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path = "/decks/:deckId/study">
            <Study />
          </Route>
          <Route path = "/decks/:deckId">
            <Deck />
          </Route>
          <Route exact path = "/">
            <DeckList />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    < />
  );
}

export default Layout;
