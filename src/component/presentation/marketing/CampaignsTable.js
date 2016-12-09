import React, {Component} from 'react';
import {Panel} from 'react-bootstrap';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { map } from 'lodash';

import Fa from 'react-fontawesome';

import RemoveButton from '../../shared/RemoveButton';
import AddCampaign from '../../container/marketing/AddCampaign';
import EditCampaign from '../../container/marketing/EditCampaign';


export default class CampaignsTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: props.userId != null ? props.userId  : props.params.userId,
      campaigns: props.campaigns,
      ads: props.ads,
    };

    if (this.state.ads == null){
      throw new Error(`Missing ads: ${this.campaign} or ${this.ads}`);
    }

    this.updateHandler = props.handleUpdate;
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      campaigns: nextProps.campaigns,
      ads: nextProps.ads,
      height: nextProps.campaigns.length > 6 ? '300px' : ''
    })
  }

  handleRemove(res) {
    return this.updateHandler();
  }

  render() {
    return (
      <Panel style={{marginTop: 20}}>
        <Table onRowSelection={this.handleRowSelection}
               height={this.state.height}
               fixedHeader={true}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow style={{textAlign: "center"}}>
              <TableHeaderColumn>Campaign</TableHeaderColumn>
              <TableHeaderColumn>
                <Fa name="tags" fixedWidth={true}/> Tags
              </TableHeaderColumn>
              <TableHeaderColumn>
                <Fa name="cubes" fixedWidth={true}/> Ads
              </TableHeaderColumn>
              <TableHeaderColumn>
                <Fa name="clock-o" fixedWidth={true}/> Expiration
              </TableHeaderColumn>
              <TableHeaderColumn>
                <Fa name="bars" fixedWidth={true}/> Description
              </TableHeaderColumn>
              <TableHeaderColumn>
                <Fa name="key" fixedWidth={true}/> Id
              </TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover={true}>
            {this.state.campaigns.map((campaign) => {
              // TableRow has to be present here instead of being a separate component
              // as a workaround for bug where 'showRowHover' is not being propagated
              return (
                <TableRow selectable={false} key={campaign._id}>
                  <TableRowColumn>{campaign.name}</TableRowColumn>
                  <TableRowColumn>{campaign.tags.join(', ')}</TableRowColumn>
                  <TableRowColumn>{map(campaign.ads, 'name').join(', ')}</TableRowColumn>
                  <TableRowColumn>{campaign.expiration == null ? 'Never' : campaign.expiration}</TableRowColumn>
                  <TableRowColumn>{campaign.description}</TableRowColumn>
                  <TableRowColumn>{campaign._id}</TableRowColumn>
                  <TableRowColumn>
                    <EditCampaign userId={this.state.userId} ads={this.state.ads} data={campaign}
                                  onUpdate={this.updateHandler}/>
                    <RemoveButton
                        resource='marketing/campaigns'
                        resourceId={campaign._id}
                        onRemove={this.handleRemove}
                    />
                  </TableRowColumn>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <AddCampaign callback={this.updateHandler} ads={this.state.ads}/>
      </Panel>
    );
  }
}
