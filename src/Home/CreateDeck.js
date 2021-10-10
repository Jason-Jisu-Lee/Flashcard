import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";

function CreateDeck() {
    const history = useHistory();

    //set initial form state
    const initialFormState = {
        name: "",
        description: ""
    };
    //create a state variable to save form data 
    const [formData, setFormData] = useState({ ...initialFormState });

    //on submit, transfer form data to createDeck function which will update the deck with a PUT API
    const submitHandler = (event) => {
        event.preventDefault();
        createDeck(formData).then((response) => history.push(`/decks/${response.id}`))
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
                    <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
                </ol>
            </nav>
            <h1 className = "mb-3">Create Deck</h1>
            <form className="mb-5" onSubmit = {submitHandler}>
                <div className = "mb-4">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="name" name = "name" id="name"
                    required className="form-control" placeholder="Deck Name"
                    value = {formData.name}
                    onChange = {changeHandler}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea id="description"
                    className="form-control" required rows="3" placeholder = "Brief description of the deck"
                    value = {formData.description} name = "description"
                    onChange = {changeHandler}
                    />
                </div>
                <Link to ="/" className="btn btn-secondary btn-lg mr-4">Cancel</Link>
                <button type = "submit" className="btn btn-primary btn-lg">Submit</button>
            </form>
        </div>
    )
};

export default CreateDeck;