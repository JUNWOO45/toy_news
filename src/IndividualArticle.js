import React, { Component } from "react";
import "./IndividualArticle.css";

class IndividualArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
        this.isChecked = this.isChecked.bind(this);
    }

    isChecked(event) {
        this.props.onChecked(event.target.value)
    }

    render() {
        return (
            <span className = "list">
                <label>
                    <input 
                        type = "checkbox"
                        value = {this.props.id}
                        onClick = {this.isChecked} />
                    {this.props.name}
                </label>
            </span>
        );
    }
}

export default IndividualArticle
