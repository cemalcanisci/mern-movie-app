import React, { Component } from 'react'
import {connect} from 'react-redux';
 class CategoryList extends Component {
    state={
        fields:[],
        isUpdate:false
    }
    activateUpdate = ()=>{
        this.setState({
            isUpdate:!this.state.isUpdate,
            fields:[...this.props.initialCategories.categories]
        })
    }
    changeFields = (e)=>{
        let newFields = [...this.state.fields];
        newFields.forEach(q=>{
            if(q.title === e.target.name){
                q.title = e.target.value
            }
        })

        this.setState({
            fields:[
                ...newFields
            ]
        })
     }
    save = ()=>{
        console.log(this.state);
    }
    render() {
 
        let rows = [];
        let editRows = [];
        this.props.initialCategories.categories.forEach((category,i) => {
                rows.push(
                    <div className={(i%2===0 ?'bg-first ' : 'bg-second ' ) + 
                            'col-md-4 w-100 d-flex justify-content-center align-items-center' }
                            key={category._id}><span className=" text-white">{category.title}</span>
                     </div>
                )
            });        
        if(this.state.fields.length){
            this.state.fields.forEach((category,i)=>{
                editRows.push(
                    <div className={(i%2===0 ?'bg-first ' : 'bg-second ' ) + 
                            'col-md-4 w-100 d-flex justify-content-center align-items-center' }
                            key={category._id}><input name={category.title} onChange={this.changeFields} defaultValue={category.title} />
                     </div>
                )
            })
           
        }
        return (
           <div className="w-100">
               <div className="w-100 bg-dark d-flex flex-row align-items-center justify-content-around p-2">
                   <h5 className="text-white">İşlemler : </h5>
                <button onClick={this.activateUpdate} className={(!this.state.isUpdate ? 'btn-success ' : 'btn-danger ') + 'btn btn-sm'}>{!this.state.isUpdate ? 'Düzenlemeyi Aktifleştir' : 'Düzenlemeyi Kapat'}</button>
                   {this.state.isUpdate ? <button className="btn btn-sm btn-warning text-white" onClick={this.save}>Kaydet</button> : ''}
                   <button className="btn btn-sm btn-danger">Yeni Ekle</button>
               </div>
                <div className="d-flex flex-row  wrap">
                   {!this.state.isUpdate ? rows : editRows}
                </div>
            </div>
            
        )
    }
}
const mapStateToProps = state=>state;

export default connect(mapStateToProps)(CategoryList)