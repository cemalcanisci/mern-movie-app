import React, { Component } from 'react'

export default class Error extends Component {
    render() {
        console.log(this.props);
        return (
            <div className="d-flex flex-row justify-content-center align-items-center">
              <h3 className="mr-3"> Hata :</h3> <h4 className="text-danger">{this.props.error}</h4>
            </div>
        )
    }
}
