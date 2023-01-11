import React, { Component } from 'react'
import Newsitem from './Newsitem'

export default class News extends Component {
    constructor() {
        super();
        console.log("Hello I am a constructor from News component");
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    // it will automatic run just after render
    async componentDidMount() {
        
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=bc7abbd8f7aa468c83ed108d9b24e8ee&page=1&pagesize=20";
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults })
        console.log(this.state.totalResults)
    }

    handleprevclick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=bc7abbd8f7aa468c83ed108d9b24e8ee&page=${this.state.page - 1}&pagesize=20`;;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles })
        this.setState({
            page: this.state.page - 1
        })
    }
    handlenextclick = async () => {
        if (this.state.page + 1 > Math.ceil(this.state.totalResult / 20)) {
        }
        else {
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=bc7abbd8f7aa468c83ed108d9b24e8ee&page=${this.state.page + 1}&pagesize=20`;
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({ articles: parsedData.articles })
            this.setState({
                page: this.state.page + 1
            })
        }
    }

    render() {
        return (
            <div className='container my-3'>News
                <div className='row'>
                    {this.state.articles.map((element) => {
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
                    <button disabled={this.state.page === Math.ceil(this.state.totalResults / 20) ? true : false} type="button" className="btn btn-dark" onClick={this.handlenextclick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}
