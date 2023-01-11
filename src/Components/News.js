import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export default class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor() {
        super();
        // console.log("Hello I am a constructor from News component");
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    // it will automatic run just after render
    async componentDidMount() {

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bc7abbd8f7aa468c83ed108d9b24e8ee&page=1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        // this.setState({loading : false})
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
        // console.log(this.state.totalResults)
    }

    handleprevclick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bc7abbd8f7aa468c83ed108d9b24e8ee&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles, loading: false })
        this.setState({
            page: this.state.page - 1
        })
    }
    handlenextclick = async () => {
        if (this.state.page + 1 > Math.ceil(this.state.totalResult / this.props.pageSize)) {
        }
        else {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bc7abbd8f7aa468c83ed108d9b24e8ee&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({ loading: true })
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({ articles: parsedData.articles })
            this.setState({
                page: this.state.page + 1,
                loading: false
            })
        }
    }

    render() {
        return (
            <div className='container my-3'>
                News
                {this.state.loading && <Spinner />}
                {/* <Spinner/> */}
                <div className='row'>
                    {!this.state.loading && this.state.articles.map((element) => {
                        if (element.title !== null && element.description !== null && element.urlToImage !== null && element.url !== null) {
                            return <div className='col-md-4' key={element.url}>
                                <Newsitem title={element.title.slice(0, 40)} description={element.description.slice(0, 80)} imageurl={element.urlToImage} newsurl={element.url} />
                            </div>
                        }
                        return ""
                        //     return <div className='col-md-4' key={element.url}>
                        //         <Newsitem title={element.title?element.title.slice(0, 40):""} description={element.description?element.description.slice(0, 80):""} imageurl={element.urlToImage?element.urlToImage:"url of any link"} newsurl={element.url} />
                        //     </div>
                    })}
                </div>
                <div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1 ? true : false} type="button" className="btn btn-dark" onClick={this.handleprevclick}>&larr; Previous</button>
                    <button disabled={this.state.page === Math.ceil(this.state.totalResults / this.props.pageSize) ? true : false} type="button" className="btn btn-dark" onClick={this.handlenextclick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}
