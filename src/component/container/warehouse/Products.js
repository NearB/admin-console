import React, {Component} from 'react';
import fetch from 'request-promise';

import ProductsTable from '../../presentation/warehouse/ProductsTable';

export default class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      owner: props.owner,
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
    return fetch({
          uri: 'http://localhost:10001/api/products',
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          json: true
        }
    ).then((res) => {
      this.setState({products: res.data})
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
        <ProductsTable owner={this.state.owner} products={this.state.products}
                     onUpdate={this.handleProductsUpdate}/>
    );
  }
}
