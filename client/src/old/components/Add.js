import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InputGroup, FormControl, Form } from 'react-bootstrap';
import Croppie from './Croppie';
import Editor from './Editor';
import {add} from '../redux/actions/addMovie'
import { withRouter } from 'react-router-dom';
import {get} from '../redux/actions/category';
import {getMovies} from '../redux/actions/getMovies';
import NullData from './NullData';

class Add extends Component {

 
    state = {
        fields: {
            watched:true
        },
        update:false,
        image : undefined,
        file:undefined,
        history:undefined
    }
    componentDidMount() {
        this.props.get();
        this.props.getMovies();
    }
    
    setNewImage = (image)=>{
        this.setState({image})
    }
    setFile = (file) =>{
        this.setState({file});
    }
    submitForm = (e) => {
        e.preventDefault();
        let fields = {...this.state.fields}
        if(!fields.category){
            fields.category = this.props.initialCategories.categories[0]._id
        }
        this.props.add(fields,this.state.file,this.props.history,this.props.initialState.movies)

    }

    setDescrpition = (description)=>{
        this.setState(prevState=>{
            let fields = Object.assign({},prevState.fields);
            fields.description = description;
            return {fields};
        })
    }
    changeThis = (e) => {

        let name = e.target.name;
        let value = e.target.value;
        if(name === 'watched'){
            value === "true" ? value = true : value = false;
        }
        let fields = this.state.fields;
        fields[name] = value;
        this.setState({
            fields : {...fields} })
    }
        
    
    render() {
    const Image = this.state.image ? <img alt={this.state.fields.title} className="detailImage"  src={this.state.image} /> : 
        ''
    return (
            <div>

                {
                    this.props.initialCategories && this.props.initialCategories.categories && this.props.initialCategories.categories.length ?
                    <form onSubmit={this.submitForm.bind(this)}>
                    <InputGroup className="mt-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="title">Filmin Adı</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl required className="mr-3" name="title" onChange={this.changeThis.bind(this)} defaultValue={this.state.fields.title || ''}
                            aria-describedby="title"
                        />
                        <InputGroup.Prepend>
                            <InputGroup.Text id="added">Ekleyen</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl required name="addedBy" onChange={this.changeThis.bind(this)} defaultValue={this.state.fields.addedBy || ''}
                            aria-describedby="added"
                        />
                    </InputGroup>
                    <InputGroup className="mt-3 w-100 d-flex flex-row align-items-center justify-content-center">
                        <Form.Group className="mb-0 w-50 mr-3 d-flex flex-row align-items-center justify-content-center">
                            <InputGroup.Text className="only-rounded-left">Kategori</InputGroup.Text>
                            <Form.Control className="rounded-0" name="category" onChange={this.changeThis.bind(this)}  as="select">
                               {this.props.initialCategories && this.props.initialCategories.categories && this.props.initialCategories.categories.length ? this.props.initialCategories.categories.map(q=>{
                                return <option key={q._id} value={q._id}>{q.title}</option> 
                               }) : '' 
                            } 

                               
                            </Form.Control>

                        </Form.Group>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="author">Yazar</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl required name="author" onChange={this.changeThis.bind(this)} defaultValue={this.state.fields.author || ''}
                            aria-describedby="author"
                        />
                    </InputGroup>
                    <InputGroup className="mt-3 w-100 d-flex flex-row align-items-center justify-content-start">
                        <Form.Group className="mb-0 w-50 mr-3 d-flex flex-row align-items-center justify-content-center">
                            <InputGroup.Text className="only-rounded-left">İzlenildi Mi</InputGroup.Text>
                            <Form.Control className="rounded-0" name="watched" onChange={this.changeThis.bind(this)} value={this.state.fields.watched} as="select">
                            <option value={true}>Evet</option>

                                <option value={false}>Hayır</option>
                            </Form.Control>

                        </Form.Group>

                    </InputGroup>
                    <Editor setDescrpition={this.setDescrpition} data="İçerik giriniz.." />
                    <div className="d-flex align-items-center justify-content-between">
                    {Image}
                    <Croppie setFile={this.setFile}  setNewImage={this.setNewImage}/>
                    <button className="btn btn-success" type="submit">Kaydet</button>

                    </div>
                </form> : <NullData message="Film eklemek için önce kategori eklemelisiniz."/>
                }

            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return state
};
const mapDispatchToProps = {
    add,
    get,
    getMovies
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Add))
