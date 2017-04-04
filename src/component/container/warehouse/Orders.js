import React, {Component} from 'react';

import api from 'services/api';
import ProductContainerList from '../../presentation/warehouse/ProductContainerList';
import _ from 'lodash';
import Dialog from 'material-ui/Dialog';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Fa from 'react-fontawesome';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';


export default class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      storeId: props.storeId,
      orders: [],
      orderModal: false,
      products: {},
      selectedOrder: {},
    };

    this.handleItemSelected = this.handleItemSelected.bind(this);
  }

  componentDidMount() {
    return api(`stores/${this.state.storeId}/products`)
        .then((res) => {
          console.log(res);
          this.setState({products: _.keyBy(_.map(res.data, 'product'), '_id')})
        })
        .catch((error) => {
          console.log(error);
        });
  }

  handleDone(order) {
    return api(`orders/${order._id}`, 'PUT', {status: 'DONE'});
  }

  handleCancel(order) {
    // TODO review if something else is done here
    return api(`orders/${order._id}`, 'PUT', {status: 'CANCELED'});
  }

  handleItemSelected(order) {
    order.products = _.map(order.products, (product) => {
      return {
        ...product,
        product: this.state.products[product.productId]
      };
    });
    this.setState({orderModal: true, selectedOrder: order})
  }

  render() {
    const orderModal = (
      <Dialog
          title="Ale Marra's Order"
          modal={false}
          open={this.state.orderModal}
          autoScrollBodyContent={true}
          actions={[<FlatButton label="OK" primary onTouchTap={() => this.setState({orderModal: false})} />]}
          onRequestClose={() => this.setState({orderModal: false})}
      >
        <Table fixedHeader>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow style={{textAlign: "center"}}>
              <TableHeaderColumn></TableHeaderColumn>
              <TableHeaderColumn>Product</TableHeaderColumn>
              <TableHeaderColumn style={{textAlign: "right"}}>
                <Fa name="dollar" fixedWidth/> Price
              </TableHeaderColumn>
              <TableHeaderColumn style={{textAlign: "right"}}>
                Quantity
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover={true}>
            {this.state.selectedOrder.products && this.state.selectedOrder.products.map((item) => {
              if (!item.product) return ; //eslint-disable-line array-callback-return

              // TableRow has to be present here instead of being a separate component
              // as a workaround for bug where 'showRowHover' is not being propagated
              return (
                <TableRow selectable={false} key={item.product._id}>
                  <TableRowColumn style={{textAlign: "center"}}><Avatar src={item.product.img}/></TableRowColumn>
                  <TableRowColumn>{item.product.name}</TableRowColumn>
                  <TableRowColumn style={{textAlign: "right"}}>{`$${item.price.toFixed(2)}`}</TableRowColumn>
                  <TableRowColumn style={{textAlign: "right"}}>{item.quantity}</TableRowColumn>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Dialog>
    );

    return (
      <div>
        {orderModal}
        <ProductContainerList name="Orders"
                              dataUrl={`stores/${this.state.storeId}/orders?status=PENDING`}
                              doneLabel="Done" cancelLabel="Cancel"
                              onDone={this.handleDone} onCancel={this.handleCancel}
                              onItemSelected={this.handleItemSelected}/>
      </div>
    );
  }
}
