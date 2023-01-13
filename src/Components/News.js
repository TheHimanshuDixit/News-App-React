import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general',
        scolor: 'primary'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        scolor: PropTypes.string
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        // console.log("Hello I am a constructor from News component");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `NewsTracker - ${this.capitalizeFirstLetter(this.props.category)}`
    }

    async updateNews() {
        await this.props.setLoaderColor(this.props.loadcolor)
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bc7abbd8f7aa468c83ed108d9b24e8ee&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        console.log(parsedData);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
        this.props.setProgress(100);
    }


    // it will automatic run just after render
    componentDidMount() {

        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bc7abbd8f7aa468c83ed108d9b24e8ee&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true })
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // // this.setState({loading : false})
        // this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
        // // console.log(this.state.totalResults)
        this.updateNews();
    }

    handleprevclick = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bc7abbd8f7aa468c83ed108d9b24e8ee&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true })
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // this.setState({ articles: parsedData.articles, loading: false })

        await this.setState({
            page: this.state.page - 1
        })
        this.updateNews();
        console.log(this.state.page);

    }

    // changenext = () => {
    //     this.setState({
    //         page: this.state.page + 1,
    //     })
    // }

    handlenextclick = async () => {
        // if (this.state.page + 1 > Math.ceil(this.state.totalResult / this.props.pageSize)) {
        // }
        // else {
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bc7abbd8f7aa468c83ed108d9b24e8ee&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //     this.setState({ loading: true })
        //     let data = await fetch(url);
        //     let parsedData = await data.json();
        //     this.setState({ articles: parsedData.articles ,loading: false})
        // await this.changenext();
        await this.setState({
            page: this.state.page + 1,
        })

        this.updateNews()
        console.log(this.state.page);
        // }    
    }

    fetchMoreData = async () => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        this.setState({
            page: this.state.page + 1,
        })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bc7abbd8f7aa468c83ed108d9b24e8ee&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({ articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults})
    };

    render() {
        return (
            <>
                {/* <div className='container my-3'> */}
                <h1 className='text-center'>News Tracker - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner />}
                {/* <Spinner/> */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className='row'>
                            {/* {!this.state.loading && this.state.articles.map((element) => { */}
                            {this.state.articles.map((element) => {
                                if (element.title !== null && element.description !== null && element.urlToImage !== null && element.url !== null) {
                                    return <div className='col-md-4' key={element.url}>
                                        <Newsitem title={element.title.slice(0, 40)} description={element.description.slice(0, 80)} imageurl={element.urlToImage} newsurl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name} scolor={this.props.scolor} />
                                    </div>
                                }
                                return ""
                                //     return <div className='col-md-4' key={element.url}>
                                //         <Newsitem title={element.title?element.title.slice(0, 40):""} description={element.description?element.description.slice(0, 80):""} imageurl={element.urlToImage?element.urlToImage:"url of any link"} newsurl={element.url} />
                                //     </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1 ? true : false} type="button" className="btn btn-dark" onClick={this.handleprevclick}>&larr; Previous</button>
                    <button disabled={this.state.page === Math.ceil(this.state.totalResults / this.props.pageSize) ? true : false} type="button" className="btn btn-dark" onClick={this.handlenextclick}>Next &rarr;</button>
                </div> */}
                {/* </div> */}
            </>
        )
    }
}
