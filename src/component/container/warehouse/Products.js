import React, {Component} from 'react';

import ProductsTable from '../../presentation/warehouse/ProductsTable';

import api from 'services/api';

export default class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: props.userId != null ? props.userId  : props.params.userId,
      products: []
    };

    this._fetchProducts = this._fetchProducts.bind(this);
    this.handleProductsUpdate = this.handleProductsUpdate.bind(this);
  }

  componentDidMount() {
    this._fetchProducts();
  }

  handleProductsUpdate(){
    return this._fetchProducts();
  }

  _fetchProducts() {
    return api('products')
      .then((res) => {
        this.setState({products: res.data})
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
        <ProductsTable userId={this.state.userId} products={this.state.products}
                       onUpdate={this.handleProductsUpdate}/>
    );
  }
}
