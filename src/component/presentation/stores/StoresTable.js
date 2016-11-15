import React, {Component} from 'react';

import {browserHistory} from 'react-router';

import {Panel} from 'react-bootstrap';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import AddStore from '../../container/stores/AddStore';
import Fa from 'react-fontawesome';

export default class StoresTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      owner: props.owner,
      stores: props.stores,
      height: ''
    };

    this.updateHandler = props.onUpdate;
    this.handleRowSelection = this.handleRowSelection.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        stores: nextProps.stores,
        height: nextProps.stores.length > 6 ? '300px' : ''
    });
  }

  handleRowSelection(selectedStores) {
    const storeId = this.state.stores[selectedStores[0]]._id;
    console.log(storeId);

    browserHistory.push(`/users/${this.state.owner}/stores/${storeId}`);
  }

  removeStore(storeId) {
    console.log(storeId);

    // browserHistory.push(`/users/${this.state.owner}/stores/${storeId}`);
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
              <TableHeaderColumn>Address</TableHeaderColumn>
              <TableHeaderColumn>Locations</TableHeaderColumn>
              <TableHeaderColumn>Stock</TableHeaderColumn>
              <TableHeaderColumn>Ads</TableHeaderColumn>
              <TableHeaderColumn>Campaigns</TableHeaderColumn>
              <TableHeaderColumn>Id</TableHeaderColumn>
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
                    <a onClick={this.removeStore.bind(this, store._id)}>
                      <Fa name='times'/>
                    </a>
                  </TableRowColumn>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <AddStore owner={this.state.owner} callback={this.updateHandler}/>
      </Panel>
    );
  }
}
