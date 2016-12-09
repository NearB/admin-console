import React, {Component} from 'react';
import {Panel} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Avatar from 'material-ui/Avatar';
import Fa from 'react-fontawesome';
import FlatButton from 'material-ui/FlatButton';


export default class ProductsTableSmall extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: props.userId != null ? props.userId  : props.params.userId,
      products: props.products
    };

    this.handleViewAll = this.handleViewAll.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      products: nextProps.products,
      height: nextProps.products.length > 6 ? '300px' : ''
    })
  }

  handleViewAll() {
    browserHistory.push(`/users/${this.state.userId}/products/`);
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
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <FlatButton label="View All" primary={true} onTouchTap={this.handleViewAll}/>
      </Panel>
    );
  }
}
