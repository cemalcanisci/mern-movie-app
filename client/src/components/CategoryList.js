import React, { Component } from 'react'
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import {set,get} from '../redux/actions/category'
import Loading from './Loading'
 class CategoryList extends Component {
    state={
        fields:[],
        isUpdate:false,
        newFields:[],
        removedFields:[],
        loading:true,
        nullData:true
    }
    static getDerivedStateFromProps(nextProps,prevState){
        if(nextProps.initialCategories.categories && nextProps.initialCategories.categories.length && prevState.fields.length !==nextProps.initialCategories.categories.length){
            return{
                
                fields:[...nextProps.initialCategories.categories],
                loading:false,
                nullData:false
            }
        }
        if(!nextProps.initialCategories.categories || nextProps.initialCategories.categories.length){
            return{
                nullData:true
            }
        }
        return null;
    }
    componentDidMount() {
        this.props.get();       
    }
    
    activateUpdate = ()=>{
        this.setState({
            isUpdate:!this.state.isUpdate
        })
    }
    changeFields = (i) => (e)=>{
        let newFields = [...this.state.fields];
        newFields[i].title = e.target.value;
        newFields[i].status = 'updated';

        this.setState({
             fields:[
                 ...newFields
             ]
     })
    }
     changeNewFields = (i) => (e)=>{
        let value = e.target.value

       this.setState(prevState=>{

        let newArr = [...prevState.newFields];
           newArr.forEach((q,index)=>{if(index===i){ q.title=value}})
          return {
              newFields:[...newArr]
          }

        })
     }
     removeNewField =(i) =>(e)=>{
        this.setState({
            newFields:[...this.state.newFields.filter((q,index)=>{return index!==i})]
        })
    }
    removeField =(i) =>(e)=>{
        this.setState(prevState=>{
            return {
            removedFields:[
                ...prevState.removedFields,
                ...this.state.fields.filter((q,index)=>{return index===i})
            ],
            fields:[...this.state.fields.filter((q,index)=>{return index!==i})]}
        })
    }
     addNewCategory = ()=>{
        let newCategory = {
             title:'Kategori ismi giriniz'
         }
         this.setState(prevState=>{
            return {
                newFields:[
                    ...prevState.newFields,
                    newCategory
                ]
            }
        })
     }
    save = ()=>{
        this.props.set(this.state)
        this.setState({
            fields:[
                ...this.state.fields,
                ...this.state.newFields
            ],
            isUpdate:false,
            newFields:[],
            removedFields:[]
        })
    }
    render() {
         return (
           <div className="w-100">
               <div className="w-100 bg-dark d-flex flex-row align-items-center justify-content-around p-2">
                   <h5 className="text-white">İşlemler : </h5>
                <button onClick={this.activateUpdate} className={(!this.state.isUpdate ? 'btn-success ' : 'btn-danger ') + 'btn btn-sm'}>{!this.state.isUpdate ? 'Düzenlemeyi Aktifleştir' : 'Düzenlemeyi Kapat'}</button>
                   <button onClick={this.addNewCategory} className="btn btn-sm btn-info">Yeni Ekle</button>
                   <button onClick={this.save} className="btn btn-sm btn-warning text-white">Kaydet</button>
               </div>
                <div className="d-flex flex-row  wrap">
                {    this.state.fields.map((category,i) => {
                return <div className={(i%2===0 ?'bg-first ' : 'bg-second ' ) + 
                        'col-md-4 w-100 d-flex justify-content-around align-items-center' }
                        key={category._id ? category._id : i}>{this.state.isUpdate ? <input name={category.title} onChange={this.changeFields(i)} defaultValue={category.title} /> : <span className=" text-white">{category.title}</span>
                }
                        <button onClick={this.removeField(i)} className="btn btn-danger btn-sm ml-2"><FontAwesomeIcon icon={faTimes} /></button>
                        
                 </div>
        }) }
                   {
                    this.state.newFields && this.state.newFields.length ? 
                    this.state.newFields.map((category,i)=>{
                            return <div className={((i+this.state.fields.length)%2===0 ?'bg-first ' : 'bg-second ' ) + 
                        'col-md-4 w-100 d-flex justify-content-around align-items-center' }
                        key={i}><input name={category.title} onChange={this.changeNewFields(i)} value={category.title} />
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
const mapDispatchToProps = {set,get}
export default connect(mapStateToProps,mapDispatchToProps)(CategoryList)