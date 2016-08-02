import React, {Component} from 'react';

import {browserHistory} from 'react-router';

import {Panel} from 'react-bootstrap';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import AddStore from '../container/AddStore';


export default class StoresTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      owner: props.owner,
      stores: props.stores
    };

    this.updateHandler = props.onUpdate;
    this.goToStore = this.goToStore.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({stores: nextProps.stores})
  }

  goToStore(selectedStores){
    const storeId = this.state.stores[selectedStores[0]]._id;
    console.log(storeId);

    browserHistory.push(`/users/${this.state.owner}/stores/${storeId}`);
  }

  render() {
    return (
        <div>
          <Panel style={{marginTop: 20}}>
            <Table onRowSelection={this.goToStore}>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow style={{textAlign: "center"}}>
                  <TableHeaderColumn>Store</TableHeaderColumn>
                  <TableHeaderColumn>Address</TableHeaderColumn>
                  <TableHeaderColumn>Id</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false} showRowHover={true}>
                {this.state.stores.map((store) => {
                  {/*// TableRow has to be present here instead of being a separate component*/}
                  {/*// as a workaround for bug where 'showRowHover' is not being propagated*/}
                  return (
                      <TableRow selectable={true} key={store._id}>
                        <TableRowColumn>{store.name}</TableRowColumn>
                        <TableRowColumn>{store.location ? store.location.address : ''}</TableRowColumn>
                        <TableRowColumn>{store._id}</TableRowColumn>
                      </TableRow>
                  )
                })}
              </TableBody>
            </Table>
            <AddStore owner={this.state.owner} callback={this.updateHandler}/>
          </Panel>
        </div>
    );
  }
}
