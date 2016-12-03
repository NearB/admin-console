import React, {Component} from 'react';

import api from 'services/api';
import ProductContainerList from '../../presentation/warehouse/ProductContainerList';


export default class Carts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      storeId: props.storeId,
      carts: []
    };

  }

  _done(cart) {
    return api(`carts/${cart._id}`, 'PUT', {status: 'CLOSED'});
  }

  _cancel(cart) {
    // TODO review if something else is done here
    return api(`carts/${cart._id}`, 'PUT', {status: 'CLOSED'});
  }

  _showModal(cart){
    console.log("SHOULD SHOW MODAL, BUT I HAVE TO GO =(");
    console.log(cart);
  }

  render() {
    return (
        <ProductContainerList name="Carts"
                              dataUrl={`stores/${this.state.storeId}/carts?status=OPEN,CHECKOUT`}
                              doneLabel="Done" cancelLabel="Close"
                              onDone={this._done} onCancel={this._cancel}
                              onItemSelected={this._showModal}/>
    );
  }
}
