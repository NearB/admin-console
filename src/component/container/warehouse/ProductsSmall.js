import React, {Component} from 'react';

import ProductsTableSmall from '../../presentation/warehouse/ProductsTableSmall';

import api from 'services/api';

export default class ProductsSmall extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: props.userId != null ? props.userId  : props.params.userId,
      products: []
    };

    this._fetchProducts = this._fetchProducts.bind(this);
  }

  componentDidMount() {
    this._fetchProducts();
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
        <ProductsTableSmall userId={this.state.userId} products={this.state.products}/>
    );
  }
}
