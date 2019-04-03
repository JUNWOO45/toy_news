import React, {Component} from "react";
import "./Header.css";
import ArticleBundle from "./ArticleBundle";
import ModalPortal from "./ModalPortal";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKeyword : "",
            start_at : "",
            end_at : "",
            publisherLists : [],
            open_publisher_modal : false,
            page : 1,
            reloadStatus: false
        };

        this.saveInput = this.saveInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getPublisher = this.getPublisher.bind(this);
        this.openPublisherModal = this.openPublisherModal.bind(this);
        this.closePublisherModal = this.closePublisherModal.bind(this);
        this.resetPageStatus = this.resetPageStatus.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.userFriendly = this.userFriendly.bind(this);
        this.getArticles = this.getArticles.bind(this)
    }

    saveInput(e) {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.callSearchApi();
    }

    getPublisher(data) {
        this.setState({
            publisherLists : this.state.publisherLists.concat(data)
        });
    }

    openPublisherModal() {
        this.setState({
            open_publisher_modal : true
        });
    }

    closePublisherModal() {
        this.setState({
            open_publisher_modal : false
        });
    }

    resetPageStatus() {
        this.setState({
            page : 1
        });
        
        this.props.clickSearchButton()
    }

    handleScroll() {
        const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;
        if(nearBottom && !this.state.reloadStatus) {
            this.setState({
                page : this.state.page + 1
            });
            this.callSearchApi();
            this.setState({
                reloadStatus: true
            });
        }
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    userFriendly(e) {
        e.target.value = "";
    }

    callSearchApi = async () => {
        const newArticles = await this.getArticles();
        this.props.callAdditionalArticle(newArticles);
        this.setState({
            reloadStatus: false
        });
    }

    getArticles() {
        const publisherArrToString = this.state.publisherLists.join(",");

        return fetch(`https://newsapi.org/v2/everything?q=${this.state.searchKeyword}&sources=`+`${publisherArrToString}`+`&from=${this.state.start_at}&to=${this.state.end_at}&sortBy=popularity&pageSize=30&page=${this.state.page}&apiKey=4460b53fe7a040b68124fc9ae2a3c84c`)
        .then(response => response.json())
        .then(json => json.articles)
        .catch(err => alert("err : ", err));
    }

    render() {
        return (
        <div className = "header" >
            <div className = "title">
                <h1>Sinnonhyeon Times</h1>
            </div>
            <div className = "navigation">
                <button onClick = {this.openPublisherModal} className = "navigation-publisher"><i className = "fa fa-list"></i></button>
                <form onSubmit = {this.handleSubmit}>
                    <span className = "navigation-period">
                        <input type = "date" name = "start_at" className = "period-start" onChange = {this.saveInput}/>
                        <input type = "date" name = "end_at" className = "period-end" onChange = {this.saveInput}/>
                    </span>
                    <span className = "navigation-keyword">
                        <input type = "text" className = "searchKeyword" name = "searchKeyword" placeholder = "Search" onChange = {this.saveInput} onClick = {this.userFriendly}></input>
                    </span>
                    <span className = "navigation-submit">
                        <button type = "submit" className = "submit-button" onClick = {this.resetPageStatus}>
                            <i className = "fa fa-arrow-circle-right"></i>
                            검색
                        </button>
                    </span>
                </form>
            </div>
                
            {this.state.open_publisher_modal && (
                <ModalPortal>
                    <ArticleBundle clickSubmitButton = {this.getPublisher} clickOutsideModal = {this.closePublisherModal} />
                </ModalPortal>
            )}
        </div>);
    }
}

export default Header
