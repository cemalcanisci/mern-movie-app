import React, { Component } from 'react'
import {connect} from 'react-redux';
import {get} from '../redux/actions/category'
import Loading from './Loading';
import CategoryList from './CategoryList';
import NullData from './NullData';
 class Category extends Component {
    componentDidMount() {
        this.props.get();
    }
    
    render() {

        const categories = (this.props.initialCategories.categories && this.props.initialCategories.categories.length ? <CategoryList /> : <Loading />)
        return (
            <div>
                {categories}
            </div>
        )
    }
}
const mapStateToProps = state =>state;
const mapDispatchToProps = {
    get
}
export default connect(mapStateToProps,mapDispatchToProps)(Category);