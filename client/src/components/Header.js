import React, { Component } from 'react'
import {Link} from "react-router-dom";

export default class Header extends Component {
    render() {
        return (
            <div className="header rounded w-100 d-flex  flex-row justify-content-around align items-center">
                <Link className="btn rounded btn-lg btn-secondary text-white" to="/">Home</Link>
                <Link className="btn rounded btn-lg btn-secondary text-white" to="/about">About</Link>
                <Link className="btn rounded btn-lg btn-secondary text-white" to="/users">Users</Link>
            </div>
        )
    }
}
