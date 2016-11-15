import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Panel} from 'react-bootstrap';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import RemoveButton from '../../shared/RemoveButton';
import AddCampaign from '../../container/marketing/AddCampaign';


export default class CampaignsTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      owner: props.owner,
      campaigns: props.campaigns
    };

    this.updateHandler = props.onUpdate;
    this.handleRowSelection = this.handleRowSelection.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      campaigns: nextProps.campaigns,
      height: nextProps.campaigns.length > 6 ? '300px' : ''
    })
  }

  handleRowSelection(selectedCampaigns){
    const campaignId = this.state.campaigns[selectedCampaigns[0]]._id;
    console.log(campaignId);

    browserHistory.push(`/users/${this.state.owner}/campaigns/${campaignId}`);
  }

  handleRemove(res) {
    return this.updateHandler();
  }

  render() {
    return (
        <div>
          <Panel style={{marginTop: 20}}>
            <Table onRowSelection={this.handleRowSelection}
                   height={this.state.height}
                   fixedHeader={true}>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow style={{textAlign: "center"}}>
                  <TableHeaderColumn>Campaign</TableHeaderColumn>
                  <TableHeaderColumn>Tags</TableHeaderColumn>
                  <TableHeaderColumn>Ads</TableHeaderColumn>
                  <TableHeaderColumn>Expiration</TableHeaderColumn>
                  <TableHeaderColumn>Id</TableHeaderColumn>
                  <TableHeaderColumn></TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false} showRowHover={true}>
                {this.state.campaigns.map((campaign) => {
                  // TableRow has to be present here instead of being a separate component
                  // as a workaround for bug where 'showRowHover' is not being propagated
                  return (
                      <TableRow selectable={true} key={campaign._id}>
                        <TableRowColumn>{campaign.name}</TableRowColumn>
                        <TableRowColumn>{campaign.tags.join(',')}</TableRowColumn>
                        <TableRowColumn>{campaign.ads.join(',')}</TableRowColumn>
                        <TableRowColumn>{campaign.hasOwnProperty('expiration') ? campaign.expiration : ''}</TableRowColumn>
                        <TableRowColumn>{campaign._id}</TableRowColumn>
                          <TableRowColumn>
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
            <AddCampaign callback={this.updateHandler}/>
          </Panel>
        </div>
    );
  }
}
