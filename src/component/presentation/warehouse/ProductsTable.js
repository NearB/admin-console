import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Panel} from 'react-bootstrap';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import RemoveButton from '../../shared/RemoveButton';
import AddProduct from '../../container/warehouse/AddProduct';


export default class ProductsTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      owner: props.owner,
      products: props.products
    };

    this.updateHandler = props.onUpdate;
    this.handleRowSelection = this.handleRowSelection.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      products: nextProps.products,
      height: nextProps.products.length > 6 ? '300px' : ''
    })
  }

  handleRowSelection(selectedProducts){
    const productId = this.state.products[selectedProducts[0]]._id;
    console.log(productId);

    browserHistory.push(`/users/${this.state.owner}/products/${productId}`);
  }

  handleRemove(res) {
    return this.updateHandler();
  }

  render() {
    return (
        <div>
          <Panel style={{marginTop: 20}}>
            <Table onRowSelection={this.handleRowSelection}
                   height={this.state.height}
                   fixedHeader={true}>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow style={{textAlign: "center"}}>
                  <TableHeaderColumn>Product</TableHeaderColumn>
                  <TableHeaderColumn>Tags</TableHeaderColumn>
                  <TableHeaderColumn>Img</TableHeaderColumn>
                  <TableHeaderColumn>Id</TableHeaderColumn>
                  <TableHeaderColumn></TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false} showRowHover={true}>
                {this.state.products.map((product) => {
                  // TableRow has to be present here instead of being a separate component
                  // as a workaround for bug where 'showRowHover' is not being propagated
                  return (
                      <TableRow selectable={true} key={product._id}>
                        <TableRowColumn>{product.name}</TableRowColumn>
                        <TableRowColumn>{product.tags.join(',')}</TableRowColumn>
                        <TableRowColumn>{product.img}</TableRowColumn>
                        <TableRowColumn>{product._id}</TableRowColumn>
                          <TableRowColumn>
                            <RemoveButton
                              resource='products'
                              resourceId={product._id}
                              onRemove={this.handleRemove}
                            />
                          </TableRowColumn>
                      </TableRow>
                  )
                })}
              </TableBody>
            </Table>
            <AddProduct callback={this.updateHandler}/>
          </Panel>
        </div>
    );
  }
}
