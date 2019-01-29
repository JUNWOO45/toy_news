import React, { Component } from 'react';
import "./Modal.css";

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

        this.clickOutsideModal = this.clickOutsideModal.bind(this);
    }

    clickOutsideModal(e) {
        if(e.target === this.node) {
            this.props.clickOutsideModal(false);
        } 
    }

    render() {
        return (
            <div className = "articleModal" onClick = {this.clickOutsideModal} ref = {node => {this.node = node;}}>
                <div className = "modal-header"></div>
                <div className = "article-modal-content">
                    <div className = "modal-title">{this.props.modalData.title}</div>
                    <div className = "modal-sourceInfo">
                        <div>{this.props.modalData.author}</div>
                        <div>{this.props.modalData.publishedAt.slice(0,10)}</div>
                        <div>{this.props.modalData.source.name}</div>
                    </div>
                    <div className = "modal-content">
                        <a href = {this.props.modalData.url} target = "_blank">{this.props.modalData.urlToImage ? <img src = {this.props.modalData.urlToImage} className = "article-image"/> : <img src = "https://c-lj.gnst.jp/public/img/common/noimage.jpg?20181001050045" className = "article-image"/>}
                            <p className = "article-column">{this.props.modalData.content}</p>
                        </a>
                    </div>
                </div>
                <div className = "modal-footer"></div>
            </div>
        );
    }
}

export default Modal;
