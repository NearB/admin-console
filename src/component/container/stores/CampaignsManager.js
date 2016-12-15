import React, {Component} from 'react';


import Avatar from 'material-ui/Avatar';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Fa from 'react-fontawesome';
import {Panel} from 'react-bootstrap';
import AddCampaignToStore from './AddCampaignToStore';
import RemoveButton from '../../shared/RemoveButton';

import api from 'services/api';
import { map } from 'lodash';

export default class CampaignsManager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      storeId: props.storeId != null ? props.storeId : props.params.storeId,
      current: [],
    };

    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    this._fetchContent();
  }

  _fetchContent() {
    //TODO filter expiration
    return api(`stores/${this.state.storeId}/campaigns`)
      .then((res) => {
        console.log(res);
        this.setState({current: res.data})
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
      <Panel style={{marginTop: 20}}  header="Active Campaigns">
        <Table height={this.state.height}
               fixedHeader={true}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow style={{textAlign: "center"}}>
              <TableHeaderColumn></TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>
                <Fa name="tags" fixedWidth={true}/> Tags
              </TableHeaderColumn>
              <TableHeaderColumn>
                <Fa name="cubes" fixedWidth={true}/> Ads
              </TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover={true}>
            {this.state.current.map((campaign) => {
              if (!campaign) return ; //eslint-disable-line array-callback-return
              
              // TableRow has to be present here instead of being a separate component
              // as a workaround for bug where 'showRowHover' is not being propagated
              return (
                <TableRow selectable={false} key={campaign._id}>
                  <TableRowColumn style={{textAlign: "center"}}><Avatar src={campaign.img}/></TableRowColumn>
                  <TableRowColumn>{campaign.name}</TableRowColumn>
                  <TableRowColumn>{campaign.tags.join(', ')}</TableRowColumn>
                  <TableRowColumn>{map(campaign.ads, 'name').join(', ')}</TableRowColumn>
                  <TableRowColumn>
                    <RemoveButton
                      resource={`stores/${this.state.storeId}/campaigns`}
                      resourceId={campaign._id}
                      onRemove={this.handleRemove}
                    />
                  </TableRowColumn>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <AddCampaignToStore storeId={this.state.storeId} onUpdate={this.handleUpdate} current={this.state.current}/>
      </Panel>
    );
  }
}
