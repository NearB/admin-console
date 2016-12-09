import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Panel} from 'react-bootstrap';
import Fa from 'react-fontawesome';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import FlatButton from 'material-ui/FlatButton';

export default class StoresTableSmall extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: props.userId != null ? props.userId  : props.params.userId,
      stores: props.stores,
      height: ''
    };

    this.handleViewAll = this.handleViewAll.bind(this);
    this.handleRowSelection = this.handleRowSelection.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        stores: nextProps.stores,
        height: nextProps.stores.length > 6 ? '300px' : ''
    });
  }

  handleViewAll() {
    browserHistory.push(`/users/${this.state.userId}/stores/`);
  }

  handleRowSelection(selectedStores) {
    const storeId = this.state.stores[selectedStores[0]]._id;
    browserHistory.push(`/users/${this.state.userId}/stores/${storeId}`);
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
              <TableHeaderColumn>
                Store
              </TableHeaderColumn>
              <TableHeaderColumn>
                <Fa name="map-marker" fixedWidth={true}/> Locations
              </TableHeaderColumn>
              <TableHeaderColumn>
                <Fa name="shopping-cart" fixedWidth={true}/> Orders
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover={true}>
            {this.state.stores.map((store) => {
              // TableRow has to be present here instead of being a separate component
              // as a workaround for bug where 'showRowHover' is not being propagated
              return (
                <TableRow selectable={true} key={store._id}>
                  <TableRowColumn>{store.name}</TableRowColumn>
                  <TableRowColumn>{store.locations.map(loc => {return loc.split(':')[1]}).join(',')}</TableRowColumn>

                  {/*FIXME hardcoded value*/}
                  <TableRowColumn>{0}</TableRowColumn>
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
