import './App.css';

import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  // c = "John"
  apiKey = process.env.REACT_APP_NEWS_API

  state = {
    progress: 0,
    loadcolor: 'white'
  }


  setProgress = (progress) => {
    this.setState({ progress: progress })
  }

  setLoaderColor = (loadcolor) => {
    this.setState({ loadcolor: loadcolor })
  }

  render() {
    return (
      <Router>
        {/* <div>App {this.c}</div> */}
        <div>
          <Navbar />
          <LoadingBar
            height={3}
            color={this.state.loadcolor}
            progress={this.state.progress}
          // onLoaderFinished={() => setProgress(0)}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} setLoaderColor={this.setLoaderColor} loadcolor="#0d6efd" key="general" pageSize={5} country='in' category="general" scolor="primary" />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} setLoaderColor={this.setLoaderColor} loadcolor="#198754" key="business" pageSize={5} country='in' category="business" scolor="success" />} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} setLoaderColor={this.setLoaderColor} loadcolor="#6c757d" key="sports" pageSize={5} country='in' category="sports" scolor="secondary" />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} setLoaderColor={this.setLoaderColor} loadcolor="#dc3545" key="entertainment" pageSize={5} country='in' category="entertainment" scolor="danger" />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} setLoaderColor={this.setLoaderColor} loadcolor="#212529" key="health" pageSize={5} country='in' category="health" scolor="dark" />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} setLoaderColor={this.setLoaderColor} loadcolor="#ffc107" key="science" pageSize={5} country='in' category="science" scolor="warning" />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} setLoaderColor={this.setLoaderColor} loadcolor="#0dcaf0" key="technology" pageSize={5} country='in' category="technology" scolor="info" />} />
          </Routes>
        </div>
      </Router>
    )
  }
}
