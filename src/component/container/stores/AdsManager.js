import React, {Component} from 'react';


import Avatar from 'material-ui/Avatar';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Fa from 'react-fontawesome';
import {Panel} from 'react-bootstrap';
import AddProductToStore from './AddProductToStore';

import api from 'services/api';

export default class AdsManager extends Component {

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
    //TODO filter expiration
    return api(`stores/${this.state.storeId}/ads`)
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
      <Panel style={{marginTop: 20}}  header="Linked Ads">
        <Table height={this.state.height}
               fixedHeader={true}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow style={{textAlign: "center"}}>
              <TableHeaderColumn></TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>
                <Fa name="tags" fixedWidth={true}/> Tags
              </TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover={true}>
            {this.state.content.map((ad) => {
              if (!ad) return ; //eslint-disable-line array-callback-return
              
              // TableRow has to be present here instead of being a separate component
              // as a workaround for bug where 'showRowHover' is not being propagated
              return (
                <TableRow selectable={false} key={ad._id}>
                  <TableRowColumn style={{textAlign: "center"}}><Avatar src={ad.img}/></TableRowColumn>
                  <TableRowColumn>{ad.name}</TableRowColumn>
                  <TableRowColumn>{ad.tags.join(', ')}</TableRowColumn>
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
        <AddProductToStore storeId={this.state.storeId} onUpdate={this.handleUpdate}/>
      </Panel>
    );
  }
}
