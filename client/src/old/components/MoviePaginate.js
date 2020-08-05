import React, { Component } from 'react'
import ReactPaginate from 'react-paginate';
export default class MoviePaginate extends Component {
    render() {
        return (
            <div className="d-flex justify-content-between">
                
                <ReactPaginate
                    pageCount={Math.ceil(this.props.values.total / this.props.stateValues.limit)}
                    previousLabel={'Önceki'}
                    nextLabel={'Sonraki'}
                    breakLabel={'...'}
                    breakClassName={'breaked'}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={this.props.handleFunction}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                />
                <strong>Toplam : <span className="text-danger">{this.props.values.total} </span> Adet eşleşme bulundu</strong>  
            </div>
        )
    }
}
