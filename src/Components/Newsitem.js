import React, { Component } from 'react'

export default class Newsitem extends Component {
    // constructor(){
    //     super();

    // }
    render() {
        let { title, description, imageurl, newsurl, author, publishedAt, source, scolor} = this.props;
        return (
            <div className='my-3'>
                <div className="card">
                    <div className='text-center my-1'><span className={`badge bg-${scolor}`}>{source}</span></div>
                    <img src={imageurl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(publishedAt).toUTCString()}</small></p>
                        {/* {console.log(publishedAt)} */}
                        <a rel='noreferrer' href={newsurl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}
