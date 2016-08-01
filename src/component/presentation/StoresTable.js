import React, {Component} from 'react';

import {Panel} from 'react-bootstrap';

import AddStore from '../container/AddStore';
import Store from '../presentation/Store';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';


export default class Stores extends Component {
  constructor(props) {
    super(props);

    console.log("CONSTRUCTOR");
    console.log(props.stores);

    this.state = {
      owner: props.owner,
      stores: props.stores
    };
    this.updateHandler = props.onUpdate;
  }

  componentWillReceiveProps(nextProps){
    this.setState({stores: nextProps.stores})
  }

  render() {
    return (
        <div>
          <Panel style={{marginTop: 20}}>
            <Table>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>Store</TableHeaderColumn>
                  <TableHeaderColumn>Address</TableHeaderColumn>
                  <TableHeaderColumn>Id</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {this.state.stores.map((store) => {
                  return (<Store key={store._id} store={store}/>)
                })}
              </TableBody>
            </Table>
            <AddStore owner={this.state.owner} callback={this.updateHandler}/>
          </Panel>
        </div>
    );
  }
}
