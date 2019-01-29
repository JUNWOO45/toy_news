import React, { Component } from 'react';
import "./SelectViewMode.css"

class SelectViewMode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isThisList : true
        };

        this.toggleView = this.toggleView.bind(this);
    }

    toggleView() {
        this.props.clickToggleButton();
        const toggleViewStatus = this.state.isThisList;
        this.setState({
            isThisList : !toggleViewStatus
        });
        this.props.clickToggleButton(this.state.isThisList);
    }

    render() {
        return (
            <div className = "select-view">
                {this.state.isThisList ? <i className = "fa fa-ellipsis-h" onClick = {this.toggleView}></i> : <i className = "fa fa-ellipsis-v" onClick = {this.toggleView}></i> }
            </div>
        );
    }
}

export default SelectViewMode;
