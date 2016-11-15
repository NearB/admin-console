import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Panel} from 'react-bootstrap';
import Fa from 'react-fontawesome';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import fetch from 'request-promise';

import AddStore from '../../container/stores/AddStore';


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
    console.log(storeId);

    browserHistory.push(`/users/${this.state.owner}/stores/${storeId}`);
  }

  handleRemove(res) {
    return this.updateHandler();
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
                    <RemoveButton
                      resource='stores'
                      resourceId={store._id}
                      onRemove={this.handleRemove}
                      icon={<Fa name='times'/>}
                    />
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

class RemoveButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    // To avoid row selection
    e.preventDefault();
    e.stopPropagation();

    fetch({
        uri: `http://localhost:10001/api/${this.props.resource}/${this.props.resourceId}`,
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        json: true,
      }
    )
      .then((res) => {
        return this.props.onRemove(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <FlatButton
        onClick={this.handleClick}
        icon={<Fa name='times'/>}
      />
    );
  }
}

RemoveButton.propTypes = {
  resource: React.PropTypes.string.isRequired,
  resourceId: React.PropTypes.string.isRequired,
  onRemove: React.PropTypes.func
};

RemoveButton.defaultProps = {
  onRemove: () => {}
};
