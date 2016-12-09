import React, {Component} from 'react';
import {Panel} from 'react-bootstrap';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Avatar from 'material-ui/Avatar';
import Fa from 'react-fontawesome';
import RemoveButton from '../../shared/RemoveButton';
import AddProduct from '../../container/warehouse/AddProduct';
import EditProduct from '../../container/warehouse/EditProduct';


export default class ProductsTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: props.userId != null ? props.userId  : props.params.userId,
      products: props.products
    };

    this.updateHandler = props.onUpdate;
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      products: nextProps.products,
      height: nextProps.products.length > 6 ? '300px' : ''
    })
  }

  handleRemove(res) {
    return this.updateHandler();
  }

  render() {
    return (
      <Panel style={{marginTop: 20}}>
        <Table height={this.state.height}
               fixedHeader={true}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow style={{textAlign: "center"}}>
              <TableHeaderColumn></TableHeaderColumn>
              <TableHeaderColumn>Product</TableHeaderColumn>
              <TableHeaderColumn>
                <Fa name="tags" fixedWidth={true}/> Tags
              </TableHeaderColumn>
              <TableHeaderColumn>
                <Fa name="bars" fixedWidth={true}/> Description
              </TableHeaderColumn>
              <TableHeaderColumn>
                <Fa name="key" fixedWidth={true}/> Id
              </TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover={true}>
            {this.state.products.map((product) => {
              // TableRow has to be present here instead of being a separate component
              // as a workaround for bug where 'showRowHover' is not being propagated
              return (
                <TableRow selectable={false} key={product._id}>
                  <TableRowColumn  style={{textAlign: "center"}}><Avatar src={product.img}/></TableRowColumn>
                  <TableRowColumn>{product.name}</TableRowColumn>
                  <TableRowColumn>{product.tags.join(',')}</TableRowColumn>
                  <TableRowColumn>{product.description}</TableRowColumn>
                  <TableRowColumn>{product._id}</TableRowColumn>
                  <TableRowColumn>
                    <EditProduct  userId={this.state.userId} data={product}
                                  onUpdate={this.updateHandler}/>
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
    );
  }
}
