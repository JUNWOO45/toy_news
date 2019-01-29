import React, { Component } from 'react';
import './LoadingSpinner.css';

class LoadingSpinner extends Component {
    render() {
        return (
            <div className = "spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        );
    }
}

export default LoadingSpinner;
