import React, {Component} from 'react';


import Avatar from 'material-ui/Avatar';
import {grey400} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Fa from 'react-fontawesome';
import {Panel} from 'react-bootstrap';
import AddProductToStore from './AddProductToStore';

import api from 'services/api';

const iconButtonElement = (
    <IconButton touch={true} tooltip="more" tooltipPosition="bottom-left">
      <MoreVertIcon color={grey400}/>
    </IconButton>
);

export default class ContentManager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      storeId: props.storeId != null ? props.storeId : props.params.storeId,
      content: [],
    };

    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    this._fetchContent();
  }

  _fetchContent() {
    return api(`stores/${this.state.storeId}/products`)
      .then((res) => {
        console.log(res);
        this.setState({content: res.data})
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleUpdate() {
    this._fetchContent();
  }

  render() {
    return (
      <Panel style={{marginTop: 20}}  header="Products In Stock">
        <Table height={this.state.height}
               fixedHeader={true}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow style={{textAlign: "center"}}>
              <TableHeaderColumn></TableHeaderColumn>
              <TableHeaderColumn>Product</TableHeaderColumn>
              <TableHeaderColumn>
                <Fa name="bars" fixedWidth/> Description
              </TableHeaderColumn>
              <TableHeaderColumn style={{textAlign: "center"}}>
                <Fa name="dollar" fixedWidth/> Price
              </TableHeaderColumn>
              <TableHeaderColumn style={{textAlign: "center"}}>
                Stock
              </TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover={true}>
            {this.state.content.map((item) => {
              if (!item.product) return ; //eslint-disable-line array-callback-return
              
              // TableRow has to be present here instead of being a separate component
              // as a workaround for bug where 'showRowHover' is not being propagated
              return (
                <TableRow selectable={false} key={item.product._id}>
                  <TableRowColumn style={{textAlign: "center"}}><Avatar src={item.product.img}/></TableRowColumn>
                  <TableRowColumn>{item.product.name}</TableRowColumn>
                  <TableRowColumn>{item.product.description}</TableRowColumn>
                  <TableRowColumn style={{textAlign: "right"}}>{`$${item.price.toFixed(2)}`}</TableRowColumn>
                  <TableRowColumn style={{textAlign: "right"}}>{item.stock}</TableRowColumn>
                  <TableRowColumn>
                    {/* TODO: endpoints to edit stock and remove product from store
                    <EditProduct  userId={this.state.userId} data={item.product}
                                  onUpdate={this.handleUpdate}/>
                    <RemoveButton
                      resource='products'
                      resourceId={item.product._id}
                      onRemove={this.handleRemove}
                    />*/}
                  </TableRowColumn>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <AddProductToStore storeId={this.state.storeId} content={this.state.content} onUpdate={this.handleUpdate}/>
      </Panel>
    );
  }
}
