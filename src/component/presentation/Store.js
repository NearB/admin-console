import React, {Component} from 'react';

import {TableRow, TableRowColumn} from 'material-ui/Table';

export default class Store extends Component {
  constructor(props) {
    super(props);
    this.store = props.store;
  }

  render() {
    return (
        <TableRow>
          <TableRowColumn>{this.store.name}</TableRowColumn>
          <TableRowColumn>{this.store.location ? this.store.location.address : ''}</TableRowColumn>
          <TableRowColumn>{this.store._id}</TableRowColumn>
        </TableRow>
    );
  }
}
