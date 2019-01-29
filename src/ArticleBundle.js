import React, {Component} from "react";
import "./ArticleBundle.css";
import IndividualArticle from "./IndividualArticle";
import LoadingSpinner from "./LoadingSpinner";

class ArticleBundle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked : []
        };

        this.callPublisherApi = this.callPublisherApi.bind(this);
        this.renderList = this.renderList.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.getCheckedPublisher = this.getCheckedPublisher.bind(this);
        this.changeModalStatus = this.changeModalStatus.bind(this);
    }

    callPublisherApi() {
        return fetch("https://newsapi.org/v2/sources?apiKey=4460b53fe7a040b68124fc9ae2a3c84c")
        .then(response => response.json())
        .then(json => json.sources)
        .catch(err => alert("err: ", err));
    }

    renderList() {
        const lists = this.state.lists.map((element, index) => {
            return <IndividualArticle onChecked = {this.handleChecked} name = {element.name} id = {element.id} key = {index} />
        });

        return lists;
    }

    handleChecked(data) {
        if(this.state.checked.includes(data)) {
            this.setState({
                checked : this.state.checked.filter(el => el !== data)
            });
        } else {
            this.setState({
                checked : this.state.checked.concat(data)
            });
        }
    }

    getCheckedPublisher(e) {
        e.preventDefault();
        this.props.clickSubmitButton(this.state.checked);
        this.props.clickOutsideModal();
    }

    changeModalStatus(e) {
        if(e.target === this.node) {
            this.props.clickOutsideModal(false)
        }
    }

    async makeList() {
        const lists = await this.callPublisherApi();
        this.setState({
            lists
        });
    }

    componentDidMount() {
        this.makeList();
    }
    
    render() {
        return (
            <div className = "publisher-modal" onClick = {this.changeModalStatus} ref={node => { this.node = node; }}>
                <div className = "publisher-modal-header"></div>
                    <div className = "content">
                        <form>
                            <button type = "submit" className = "checked-submit-button" onClick = {this.getCheckedPublisher}>등록</button>
                            <div className = "lists">
                                {this.state.lists ? this.renderList() : <LoadingSpinner className = "loading-spinner"/>}
                            </div>
                        </form>
                    </div>
                <div className = "publisher-modal-footer"></div>
            </div>
        );
    }
}

export default ArticleBundle;
