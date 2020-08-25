import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Row, Col, Button,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { getCategories, set } from '../Redux/Actions/category';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      isFirstLoad: true,
      isEdit: false,
      removedCategories: [],
      error: '',
    };
  }

  componentDidMount() {
    const { get } = this.props;
    get();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.categoriesDatas && nextProps.categoriesDatas.categories
        && nextProps.categoriesDatas.categories.length && prevState.isFirstLoad) {
      return {
        categories: [...nextProps.categoriesDatas.categories],
        isFirstLoad: false,
        isEdit: false,
        error: '',
      };
    }
    return null;
  }

  validate=() => {
    const { categories, removedCategories } = this.state;
    if (categories.some((category) => !category.title)) {
      this.setState({
        error: 'Kategori ismini boş gönderemezsiniz',
      });
    } else {
      this.setState({
        error: '',
      });
      this.sendCategories(categories, removedCategories);
    }
  }

  sendCategories = (categories, removedCategories) => {
    const { send } = this.props;
    this.setState({
      isEdit: false,
    });
    send(categories, removedCategories);
  }

  addNewCategory = () => {
    const { categories } = this.state;
    const newCategoryArray = [...categories];
    const newCategory = {
      title: 'Lütfen kategori adını giriniz...',
    };
    newCategoryArray.push(newCategory);
    this.setState({
      categories: [...newCategoryArray],
    });
  }

  removeCategory = (key) => {
    const { categories, removedCategories } = this.state;
    const newCategoriesState = [...categories];
    const modifiedCategories = newCategoriesState.splice(key, 1);
    const removedArray = [...removedCategories];
    if (modifiedCategories[0]._id) {
      removedArray.push(modifiedCategories[0]);
    }
    this.setState({
      categories: [
        ...newCategoriesState,
      ],
      removedCategories: [...removedArray],

    });
  }

  changeCategoryName(e, index) {
    const { categories } = this.state;
    const newCategoryArray = categories.map((category, key) => {
      const newCategory = { ...category };
      if (key === index) {
        newCategory.title = e.target.value;
        newCategory.modified = true;
      }
      return newCategory;
    });
    this.setState({
      categories: newCategoryArray,
    });
  }

  render() {
    const { categories, isEdit, error } = this.state;
    return (
      <div>
        <Row className="text-center bg-dark align-items-center w-100 m-0">
          <Col xs={4} md={4}>
            <Button onClick={() => this.setState({ isEdit: !isEdit })} variant="outline-warning  p-1 ml-2 my-2" size="sm">{isEdit ? 'Düzenlemeyi Pasifleştir' : 'Düzenlemeyi Aktifleştir'}</Button>
          </Col>
          <Col xs={4} md={4}>
            <Button onClick={this.addNewCategory} variant="outline-danger text-white p-1 my-2" size="sm">Yeni Kategori Ekle</Button>
          </Col>
          <Col xs={4} md={4}>
            <Button onClick={this.validate} variant="outline-success text-white p-1 my-2" size="sm">Kaydet</Button>
          </Col>
        </Row>
        {error ? (
          <Row className="w-100 m-0 d-flex align-items-center p-2 bg-grad">
            <h3 className="text-danger m-0">Hata : </h3>
            <strong className="ml-2 text-white">{error}</strong>
          </Row>
        ) : ''}
        <Row className="text-center text-white w-100 m-0">
          {categories.length ? categories.map((category, index) => (
            <Col key={index} xs={12} md={4} className={`${index % 2 === 0 ? ' categories-first' : 'categories-second'} py-3`}>
              {isEdit ? (
                <div>
                  <input
                    className="category-inputs"
                    onChange={(e) => this.changeCategoryName(e, index)}
                    value={category.title}
                  />
                  <Button onClick={() => this.removeCategory(index)} variant="outline-danger float-right" size="sm"><FontAwesomeIcon icon={faTimes} size="1x" /></Button>
                </div>
              ) : (
                <div>
                  <span>
                    {category.title}
                  </span>
                  <Button onClick={() => this.removeCategory(index)} variant="outline-danger float-right" size="sm"><FontAwesomeIcon icon={faTimes} size="1x" /></Button>
                </div>
              )}
            </Col>
          )) : ''}

        </Row>
      </div>
    );
  }
}
const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  get: getCategories,
  send: set,
};
export default connect(mapStateToProps, mapDispatchToProps)(Categories);
