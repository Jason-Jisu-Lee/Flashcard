import React from "react"
import { Link } from "react-router-dom"

function Form({changeHandler, submitHandler, deck, formData}) {
    return (
    <div>
        <form className="mb-5" onSubmit = {submitHandler}>
            <div className = "mb-4">
                <label htmlFor="front" className="font-weight-bold form-label">Front</label>
                <textarea id="front"
                className="form-control" required rows="3"
                value = {formData.front} name = "front"
                onChange = {changeHandler}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="back" className="font-weight-bold form-label">Back</label>
                <textarea id="back"
                className="form-control" required rows="3"
                value = {formData.back} name = "back"
                onChange = {changeHandler}
                />
            </div>
            <Link to ={`/decks/${deck.id}`} className="btn btn-secondary btn-lg mr-4">Done</Link>
            <button type = "submit" className="btn btn-primary btn-lg">Save</button>
        </form>
    </div>
    )
}

export default Form;