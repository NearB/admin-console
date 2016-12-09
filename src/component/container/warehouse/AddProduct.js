import React, {Component} from 'react';

import ProductModal from '../../presentation/warehouse/ProductModal';
import FlatButton from 'material-ui/FlatButton';

import api from 'services/api';

export default class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };

    this.callback = props.onUpdate;

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
    api.post('products', productData)
      .then((res) => {
        console.log(res);
        return this.callback();
      })
      .catch((error) => {
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
