import React, {Component} from 'react';
import fetch from 'request-promise';

import ProductModal from '../../presentation/warehouse/AddProductModal';
import FlatButton from 'material-ui/FlatButton';

export default class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };

    this.callback = props.callback;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleClose() {
    this.setState({showModal: false});
  }

  handleOpen() {
    this.setState({showModal: true});
  }

  handleSubmit(productData) {
    fetch({
          uri: 'http://localhost:10001/api/products',
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          json: true,
          body: productData
        }
    ).then((res) => {
      console.log(res);
      return this.callback();
    }).catch((error) => {
      console.log(error);
    });
    this.handleClose();
  }

  render() {
    return (
        <div style={{textAlign: "right"}}>
          <FlatButton label="Create Product" primary={true} onTouchTap={this.handleOpen}/>
          {this.state.showModal ?
              <ProductModal onClose={this.handleClose} onSubmit={this.handleSubmit}/>
              : null}
        </div>

    );
  }
}
