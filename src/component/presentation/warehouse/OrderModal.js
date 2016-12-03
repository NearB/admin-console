import React, {Component} from 'react';
import _s from 'underscore.string';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


export default class OrderModal extends Component {

  constructor(props) {
    super(props);
    console.log(props);

    /*
     {
       cartId: { type: String
       storeId: { type: String
       engagement: { type: String
       status: { type: String
       products: [{
         productId:{ type: String
         quantity:{ type: Number
         price:{ type: Number
         }]
     }
     */


    this.data = {
      cartId: props.order.cartId, // sonner than later this would relate to somthing like "Table number"
      clientId: props.order.engagement.split(':')[0],
      pendingSince: 'TODO', //TODO timestamp to the order
      total: props.order.total,
      products: props.order.products
    };

    this.handleClose = props.onClose;
  }

  render() {
    const modalActions = [
      <FlatButton label="Close" primary={true} onTouchTap={this.handleClose}/>
    ];

    return (
        <Dialog title="Order Data" actions={modalActions} modal={true} open={true} autoScrollBodyContent={true}>
          <h3>Table: </h3> {this.data.cartId}
          <br />
          <h3>Client: </h3> {this.data.cartId}
          <br />
          <h3>Total: </h3> {this.data.total}
          <br />
          <h3>TODO this should be a list =): </h3> {this.data.products.length}
        </Dialog>
    );
  }
}
