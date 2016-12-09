import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Panel} from 'react-bootstrap';
import Fa from 'react-fontawesome';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import RemoveButton from '../../shared/RemoveButton';
import AddStore from '../../container/stores/AddStore';


export default class StoresTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: props.userId != null ? props.userId  : props.params.userId,
      stores: props.stores,
      height: ''
    };

    this.handleUpdate = props.onUpdate;
    this.handleRowSelection = this.handleRowSelection.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        stores: nextProps.stores,
        height: nextProps.stores.length > 6 ? '300px' : ''
    });
  }

  handleRowSelection(selectedStores) {
    const storeId = this.state.stores[selectedStores[0]]._id;
    browserHistory.push(`/users/${this.state.userId}/stores/${storeId}`);
  }

  handleRemove(res) {
    return this.handleUpdate();
  }

  render() {
    return (
      <Panel style={{marginTop: 20}}>
        <Table
          onRowSelection={this.handleRowSelection}
          height={this.state.height}
          fixedHeader={true}
          >
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow style={{textAlign: "center"}}>
              <TableHeaderColumn>Store</TableHeaderColumn>
              <TableHeaderColumn>
                <Fa name="home" fixedWidth={true}/> Address
              </TableHeaderColumn>
              <TableHeaderColumn>
                <Fa name="map-marker" fixedWidth={true}/> Locations
              </TableHeaderColumn>
              <TableHeaderColumn>
                <Fa name="shopping-cart" fixedWidth={true}/> Stock
              </TableHeaderColumn>
              <TableHeaderColumn>
                <Fa name="cubes" fixedWidth={true}/> Ads
              </TableHeaderColumn>
              <TableHeaderColumn>
                <Fa name="users" fixedWidth={true}/> Campaigns
              </TableHeaderColumn>
              <TableHeaderColumn>
                <Fa name="key" fixedWidth={true}/> Id
              </TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover={true}>
            {this.state.stores.map((store) => {
              // TableRow has to be present here instead of being a separate component
              // as a workaround for bug where 'showRowHover' is not being propagated
              return (
                <TableRow selectable={true} key={store._id}>
                  <TableRowColumn>{store.name}</TableRowColumn>
                  <TableRowColumn>{store.hasOwnProperty('address') ? store.address : ''}</TableRowColumn>
                  <TableRowColumn>{store.locations.map(loc => {return loc.split(':')[1]}).join(',')}</TableRowColumn>
                  <TableRowColumn>{store.stock.length}</TableRowColumn>
                  <TableRowColumn>{store.adIds.length}</TableRowColumn>
                  <TableRowColumn>{store.campaignIds.length}</TableRowColumn>
                  <TableRowColumn>{store._id}</TableRowColumn>
                  <TableRowColumn>
                    <RemoveButton
                      resource='stores'
                      resourceId={store._id}
                      onRemove={this.handleRemove}
                    />
                  </TableRowColumn>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <AddStore userId={this.state.userId} onUpdate={this.handleUpdate}/>
      </Panel>
    );
  }
}
