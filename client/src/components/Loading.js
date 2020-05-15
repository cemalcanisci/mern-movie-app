import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
export default class Loading extends Component {
    render() {
        return (
            <div className="d-flex justify-content-center mt-3">
                <FontAwesomeIcon icon={faSpinner} className="text-danger"  pulse size="5x"/>
            </div>
        )
    }
}
