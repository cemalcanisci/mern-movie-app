import React, { Component } from 'react'
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

 class CategoryList extends Component {
    state={
        fields:[],
        isUpdate:false,
        newFields:[]
    }
    newCategoryArr = [];
    componentDidMount() {
        this.setState({
            fields:[...this.props.initialCategories.categories]
        })
    }
    
    activateUpdate = ()=>{
        this.setState({
            isUpdate:!this.state.isUpdate,
            fields:[...this.props.initialCategories.categories]
        })
    }
    changeFields = (i) => (e)=>{
        let newFields = [...this.state.fields];

        newFields[i].title = e.target.value;

        this.setState({
             fields:[
                 ...newFields
             ]
     })
    }
     changeNewFields = (i) => (e)=>{
        this.newCategoryArr[i].title = e.target.value;
        let newFields = [...this.newCategoryArr];
       this.setState({
            newFields:[
                ...newFields
            ]
        })
     }
     removeNewField =(i) =>(e)=>{
        let fields = [];
        this.newCategoryArr.splice(i,1);
         fields = [...this.newCategoryArr];
        this.setState({
            newFields:[...fields]
        })
    }
     addNewCategory = ()=>{
        let newCategory = {
             title:'Kategori ismi giriniz'
         }
         this.newCategoryArr.push(newCategory);

         this.setState({
            newFields:[...this.newCategoryArr]
        })
     }
    save = ()=>{
        console.log(this.state);
    }
    render() {
         return (
           <div className="w-100">
               <div className="w-100 bg-dark d-flex flex-row align-items-center justify-content-around p-2">
                   <h5 className="text-white">İşlemler : </h5>
                <button onClick={this.activateUpdate} className={(!this.state.isUpdate ? 'btn-success ' : 'btn-danger ') + 'btn btn-sm'}>{!this.state.isUpdate ? 'Düzenlemeyi Aktifleştir' : 'Düzenlemeyi Kapat'}</button>
                   {this.state.isUpdate ? <button className="btn btn-sm btn-warning text-white" onClick={this.save}>Kaydet</button> : ''}
                   <button onClick={this.addNewCategory} className="btn btn-sm btn-danger">Yeni Ekle</button>
               </div>
                <div className="d-flex flex-row  wrap">
                {        this.state.fields.map((category,i) => {
                return <div className={(i%2===0 ?'bg-first ' : 'bg-second ' ) + 
                        'col-md-4 w-100 d-flex justify-content-center align-items-center' }
                        key={category._id}>{this.state.isUpdate ? <input name={category.title} onChange={this.changeFields(i)} defaultValue={category.title} /> : <span className=" text-white">{category.title}</span>}
                 </div>
        })}
                   {
                    this.state.newFields && this.state.newFields.length ? 
                    this.state.newFields.map((category,i)=>{
                            return <div className={((i+this.state.fields.length)%2===0 ?'bg-first ' : 'bg-second ' ) + 
                        'col-md-4 w-100 d-flex justify-content-center align-items-center' }
                        key={i}><input name={category.title} onChange={this.changeNewFields(i)} defaultValue={category.title} />
                        <button onClick={this.removeNewField(i)} className="btn btn-danger btn-sm ml-2"><FontAwesomeIcon icon={faTimes} /></button>
                 </div> 
                     }) : ''        
                  }
                </div>
            </div>
            
        )
    }
}
const mapStateToProps = state=>state;

export default connect(mapStateToProps)(CategoryList)