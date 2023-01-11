import './App.css';

import React, { Component } from 'react'
import Navbar from './Components/Navbar'; 
import News from './Components/News';

export default class App extends Component {
  // c = "John"
  render() {
    return (
      // <div>App {this.c}</div>
      <div>
        <Navbar/>
        <News pageSize={5} country='in'/>
      </div>
    )
  }
}
