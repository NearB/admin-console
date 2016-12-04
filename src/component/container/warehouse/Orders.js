import React, {Component} from 'react';

import api from 'services/api';
import ProductContainerList from '../../presentation/warehouse/ProductContainerList';

export default class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      storeId: props.storeId,
      orders: []
    };

  }

  handleDone(order) {
    return api(`orders/${order._id}`, 'PUT', {status: 'DONE'});
  }

  handleCancel(order) {
    // TODO review if something else is done here
    return api(`orders/${order._id}`, 'PUT', {status: 'CANCELED'});
  }

  handleItemSelected(order){
    console.log("SHOULD SHOW MODAL, BUT I HAVE TO GO =(");
    console.log(order);
  }

  render() {
    return (
        <ProductContainerList name="Orders"
                              dataUrl={`stores/${this.state.storeId}/orders?status=PENDING`}
                              doneLabel="Done" cancelLabel="Cancel"
                              onDone={this.handleDone} onCancel={this.handleCancel}
                              onItemSelected={this.handleItemSelected}/>
    );
  }
}
