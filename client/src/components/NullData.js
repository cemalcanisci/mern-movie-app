import React, { Component } from 'react'

export default class NullData extends Component {
    render() {
        return (
            <div className="d-flex flex-column">
                <h2 className="text-center text-danger">Önemli Uyarı!!</h2>
                {this.props.message ? <h3 className="text-center">{this.props.message}</h3> : 'Boş'}

                <img src="/null.jpg" alt="Null Data Image" className="w-100" ></img>
            </div>
        )
    }
}
