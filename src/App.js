import './App.css';

import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,  
} from "react-router-dom";

export default class App extends Component {
  // c = "John"
  render() {
    return (
      <Router>
       {/* <div>App {this.c}</div> */}
        <div>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<News key="general" pageSize={5} country='in' category="general" scolor="primary"/>} />
            <Route exact path="/business" element={<News key="business" pageSize={5} country='in' category="business" scolor="success" />} />
            <Route exact path="/sports" element={<News key="sports" pageSize={5} country='in' category="sports" scolor="secondary" />} />
            <Route exact path="/entertainment" element={<News key="entertainment" pageSize={5} country='in' category="entertainment" scolor="danger" />} />
            <Route exact path="/health" element={<News key="health" pageSize={5} country='in' category="health" scolor="dark" />} />
            <Route exact path="/science" element={<News key="science" pageSize={5} country='in' category="science" scolor="warning" />} />
            <Route exact path="/technology" element={<News key="technology" pageSize={5} country='in' category="technology" scolor="info" />} />
          </Routes>
        </div>
      </Router>
    )
  }
}
