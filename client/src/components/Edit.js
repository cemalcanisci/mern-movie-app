import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMovie } from '../redux/actions/getMovies'
import { InputGroup, FormControl, Form } from 'react-bootstrap';
import Croppie from './Croppie';
import {update} from '../redux/actions/updateMovie';
import Editor from './Editor';
import {get} from '../redux/actions/category';

class Edit extends Component {
    state = {
        fields: {},
        update:false,
        image : undefined,
        file:undefined,
        history:undefined
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        let newFields = Object.assign({},nextProps.movie);
        if (nextProps.movie._id=== nextProps.match.params.movieId && !prevState.update) {
            return { fields: newFields,update:true,history:nextProps.history }
        }
        return null;
    }

    componentDidMount() {
        if (this.props.match.params.movieId) {
            this.props.getMovie(this.props.match.params.movieId);
            this.props.get();

        }
    }
    setNewImage = (image)=>{
        this.setState({image})
    }
    setFile = (file) =>{
        this.setState({file});
    }
    submitForm = (e) => {
        e.preventDefault();
        this.props.update(this.state.fields,this.state.file,this.state.history)

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
        this.setState(prevState => {
            let fields = { ...prevState.fields }
            fields[name] = value;
            return { fields };
        })
    }
        
    
    render() {
    const Image = this.state.image ? <img alt={this.state.fields.title} className="detailImage"  src={this.state.image} /> : 
    <img alt={this.state.fields.title} className="detailImage"  src={'/assets/'+this.state.fields.image} 
    />
    return (
            <div>
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
                            <Form.Control className="rounded-0" name="category" onChange={this.changeThis.bind(this)} value={this.state.fields.category} as="select">
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
                    <Editor setDescrpition={this.setDescrpition} data={this.props.movie.description} />
                    <div className="d-flex align-items-center justify-content-between">
                    {Image}
                    <Croppie setFile={this.setFile}  setNewImage={this.setNewImage}/>
                    <button className="btn btn-success" type="submit">Kaydet</button>

                    </div>
                </form>
            </div>
        )
    }
}
const mapStateToProps = state => state;
const mapDispatchToProps = {
    getMovie,
    update,
    get
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Edit))
