import React, { Component } from 'react'
import {Link} from "react-router-dom";

export default class Header extends Component {
    render() {
        return (
            <div className="header rounded w-100 d-flex  flex-row justify-content-around align items-center">
                <Link className="btn rounded btn-lg btn-dark text-white" to="/">Film Listesi</Link>
                <Link className="btn rounded btn-lg btn-dark text-white" to="/ekle">Yeni Film</Link>
                <Link className="btn rounded btn-lg btn-dark text-white" to="/kategori">Kategoriler</Link>
                <Link className="btn rounded btn-lg btn-dark text-white" to="/siralama">Sıralama</Link>
            </div>
        )
    }
}
