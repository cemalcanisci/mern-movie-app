import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMovie } from '../redux/actions/getMovies'
import { InputGroup, FormControl, Form } from 'react-bootstrap';
import Croppie from './Croppie';
class Edit extends Component {
    state = {
        fields: {}
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (!prevState.fields.description && nextProps.movie.description) {
            return { fields: { ...nextProps.movie } }
        }
        return null;
    }
    componentDidMount() {
        if (this.props.match.params.movieId) {
            this.props.getMovie(this.props.match.params.movieId);
        }
    }
    submitForm = (e) => {
        e.preventDefault();
        console.log(this.state);
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
        return (
            <div>
                <form onSubmit={this.submitForm.bind(this)}>
                    <InputGroup className="mt-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="title">Filmin Adı</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl className="mr-3" name="title" onChange={this.changeThis.bind(this)} defaultValue={this.state.fields.title || ''}
                            aria-describedby="title"
                        />
                        <InputGroup.Prepend>
                            <InputGroup.Text id="added">Ekleyen</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl name="description" onChange={this.changeThis.bind(this)} defaultValue={this.state.fields.addedBy || ''}
                            aria-describedby="added"
                        />
                    </InputGroup>
                    <InputGroup className="mt-3 w-100 d-flex flex-row align-items-center justify-content-center">
                        <Form.Group className="mb-0 w-50 mr-3 d-flex flex-row align-items-center justify-content-center">
                            <InputGroup.Text className="only-rounded-left">Kategori</InputGroup.Text>
                            <Form.Control className="rounded-0" name="category" onChange={this.changeThis.bind(this)} value={this.state.fields.category} as="select">
                                <option value="Anime">Anime</option>
                                <option value="Fantastik">Fantastik</option>

                            </Form.Control>

                        </Form.Group>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="author">Yazar</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl name="author" onChange={this.changeThis.bind(this)} defaultValue={this.state.fields.author || ''}
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
                    <img alt={this.state.fields.title} className="detailImage"  src={this.state.fields.image} />
                    <Croppie />
                    <button className="mt-3" type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
const mapStateToProps = state => state;
const mapDispatchToProps = {
    getMovie
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Edit))
