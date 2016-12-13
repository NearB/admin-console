import React, {Component} from 'react';

import AddProductToStoreModal from '../../presentation/stores/AddProductToStoreModal';
import FlatButton from 'material-ui/FlatButton';

import api from 'services/api';

export default class AddProductToStore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      products: [],
    };

    this.callback = props.onUpdate;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  componentDidMount() {
    this._fetchProducts();
  }

  _fetchProducts() {
    return api('products')
      .then((res) => {
        if (res.err == null){
          this.setState({products: res.data})
        } else {
          console.log(res.err);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleClose() {
    this.setState({showModal: false});
  }

  handleOpen() {
    this.setState({showModal: true});
  }

  handleSubmit(stockData) {
    return api.put(`stores/${this.props.storeId}/products`, stockData)
      .then((res) => {
        this.handleClose();
        return this.callback();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div style={{textAlign: "right"}}>
        <FlatButton label="Add Product" primary={true} onTouchTap={this.handleOpen}/>
        {this.state.showModal ?
          <AddProductToStoreModal onClose={this.handleClose} onSubmit={this.handleSubmit} products={this.state.products}/>
          : null}
      </div>
    );
  }
}

AddProductToStore.propTypes = {
  storeId: React.PropTypes.string.isRequired
};

