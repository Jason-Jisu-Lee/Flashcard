import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api"

function EditDeck() {
    //create the deck and form state variable
    const [deck, setDeck] = useState({})
    const { deckId } = useParams();
    const history = useHistory();
    const [formData, setFormData] = useState({
        name: "",
        description: ""
    });

    //retrieve deck using 'deckId' and set its values to formData's default value, then handle error
    useEffect(() => {
        const abortController = new AbortController();
        async function loadDeck() {
          const getDeck = await readDeck(deckId, abortController.signal);
          setDeck(getDeck);
          setFormData({
              name: getDeck.name,
              description: getDeck.description,
              id: getDeck.id
          })
        }
        loadDeck();
        return () => abortController.abort();
      }, [deckId]);

    //update the Deck using 'updateDeck' function with the new data
    const submitHandler = (event) => {
        event.preventDefault();
        updateDeck(formData).then((response) => history.push(`/decks/${response.id}`))
    }

    //save the form data by matching the value with the name of the input variable
    const changeHandler = ({ target }) => {
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
        <h1>Edit Deck</h1>
        <form className="mb-5" onSubmit = {submitHandler}>
                <div className = "mb-4">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="name" name = "name" id="name"
                    required className="form-control"
                    value = {formData.name}
                    onChange = {changeHandler}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea id="description"
                    className="form-control" required rows="3"
                    value = {formData.description} name = "description"
                    onChange = {changeHandler}
                    />
                </div>
                <Link to ={`/decks/${deck.id}`} className="btn btn-secondary btn-lg mr-4">Cancel</Link>
                <button type = "submit" className="btn btn-primary btn-lg">Submit</button>
        </form>

    </div>
    )
}

export default EditDeck;