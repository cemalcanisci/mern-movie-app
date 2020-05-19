import React, { Component } from 'react'
import {Table} from 'react-bootstrap';
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck,faTimes } from '@fortawesome/free-solid-svg-icons';
import {updateMovie} from '../redux/actions/updateMovie';
import {connect} from 'react-redux';
 class Movietable extends Component {
  changeStatus(status,id,query){
    this.props.updateMovie(id,status,query)

  }
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
      <td>{q.watched  ? 'Evet' : 'Hayır'}</td>
      <td><Link className="btn rounded btn-sm btn-success text-white" to={'/detay/'+q._id}>Detay</Link>
      <button onClick={this.changeStatus.bind(this,q.watched,q._id)} className={"btn btn-sm ml-2 " + (q.watched ? 'btn-danger' : 'btn-success')}><FontAwesomeIcon icon={q.watched ? faTimes : faCheck} className="text-white"/>
</button>
</td>
        </tr>
      })}
    
  </tbody>
</Table>
            </div>
        )
    }
}
const mapStateToProps = (state)=>state;
const mapDispatchToProps = {
  updateMovie
}
export default connect(mapStateToProps,mapDispatchToProps)(Movietable);