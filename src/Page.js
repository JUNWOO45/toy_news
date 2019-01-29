import React, {Component} from "react";
import Header from "./Header"
import SelectViewMode from "./SelectViewMode";
import Modal from "./Modal";

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleLists : [],
            clicked : false,
            viewStatus : null,
            currentArticle : "",
            modal : false,
            reloadStatus : false,
            page : 1
        }

        this.changePageStatus = this.changePageStatus.bind(this);
        this.toggleClass = this.toggleClass.bind(this);
        this.toggleView = this.toggleView.bind(this);
        this.renderListViewMode = this.renderListViewMode.bind(this);
        this.renderCardViewMode = this.renderCardViewMode.bind(this);
        this.openArticleModal = this.openArticleModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.resetArticleLists = this.resetArticleLists.bind(this);
    }

    changePageStatus(articlesToAdd) {
        this.setState({
            articleLists : this.state.articleLists.concat(articlesToAdd)
        });
    }

    toggleClass() {
        const currentState = this.state.clicked;
        this.setState({
            clicked : !currentState
        });
    }

    toggleView(viewStatusFromViewComponent) {
        this.setState({
            viewStatus : viewStatusFromViewComponent
        });
    }

    renderListViewMode() {
        const newArticle = this.state.articleLists.map((element, index) => {
            return (
                <div key = {index} className = "article-list" onClick = {() => {
                    this.openArticleModal(element);
                }}>
                    <div className = "list-view-title">{element.title}</div>
                    <div className = "list-view-publisher">{element.publishedAt.slice(0, 10)}</div>
                    <div className = "list-view-source">{element.source.name}</div>
                    <div className = "list-view-author">{element.author}</div>
                </div>
            );
        });

        return newArticle;
    }

    renderCardViewMode() {
        const newArticle = this.state.articleLists.map((element, index) => {
            return (
                <div key = {index} className = "article-card" onClick = {() => {
                    this.openArticleModal(element);
                }}>
                    {element.urlToImage ? <img src = {element.urlToImage} className = "card-view-image"/> : <img src = "https://c-lj.gnst.jp/public/img/common/noimage.jpg?20181001050045" className = "card-view-image"/>}
                    <div className = "card-view-content">
                        <div className = "card-view-title">{element.title}</div>
                        <div className = "card-view-author">{element.author}</div>
                    </div>
                </div>
            );
        });

        return newArticle;
    }

    openArticleModal(clickedArticleInformation) {
        this.setState({
            modal : true,
            currentArticle : clickedArticleInformation
        })
    }

    closeModal(modalstatus) {
        this.setState({
            modal : modalstatus
        })
    }

    resetArticleLists() {
        this.setState({
            articleLists : []
        })
    }
    
    render() {
        return (
            <div className = "app" ref = {node => {this.node = node;}}>
                <Header callAdditionalArticle = {this.changePageStatus} clickSearchButton = {this.resetArticleLists}/>
                <SelectViewMode clickToggleButton = {this.toggleClass} clickToggleButton = {this.toggleView}/>
                
                <div className = {!this.state.viewStatus ? "view-list" : "view-card"}>
                    {!this.state.viewStatus ? this.renderListViewMode() : this.renderCardViewMode()}
                </div>
                
                {
                    this.state.modal && (
                        <Modal modalData = {this.state.currentArticle} clickOutsideModal = {this.closeModal}/>
                    )
                }
            </div>
        );
    }
}

export default Page;
