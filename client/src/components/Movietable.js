import React, { Component } from 'react'
import {Table} from 'react-bootstrap';
import {Link} from "react-router-dom";

export default class Movietable extends Component {
    render() {

        return (
            <div>
                <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>#</th>
      <th>Resim</th>
      <th>Adı</th>
      <th>Ekleyen</th>
      <th>Türü</th> 
      <th>İzlenildi mi?</th> 
      <th>İşlemler</th> 
    </tr>
  </thead>
  <tbody>
      {this.props.movies.map((q,index)=>{
          return  <tr key={q._id}>
          <td>{index+1}</td>
          <td><img className="tableImages" src={q.image} alt={q.title}/></td>
          <td>{q.title}</td>
          <td>{q.addedBy}</td>
      <td>{q.category}</td>
      <td>{q.isWatched  ? 'Evet' : 'Hayır'}</td>
      <td><Link className="btn rounded btn-sm btn-success text-white" to={'/detay/'+q._id}>Detay</Link>
</td>
        </tr>
      })}
    
  </tbody>
</Table>
            </div>
        )
    }
}
