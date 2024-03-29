import React, { Component } from 'react'
import {
    Link
  } from "react-router-dom";

export default class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">NewsTracker</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page"  href="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/about">About</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        News Types
                                    </Link>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><Link className="dropdown-item" to="/">General</Link></li>
                                        <li><Link className="dropdown-item" to="/business">Business</Link></li>
                                        <li><Link className="dropdown-item" to="/sports">Sports</Link></li>
                                        <li><Link className="dropdown-item" to="/entertainment">Entertainment</Link></li>
                                        <li><Link className="dropdown-item" to="/health">Health</Link></li>
                                        <li><Link className="dropdown-item" to="/science">Science</Link></li>
                                        <li><Link className="dropdown-item" to="/technology">Technology</Link></li>
                                        <li><hr className="dropdown-divider"/></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}
