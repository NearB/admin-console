import React, {Component} from 'react';

import {browserHistory} from 'react-router';

import {Panel} from 'react-bootstrap';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import AddCampaign from '../../container/marketing/AddCampaign';
import Fa from 'react-fontawesome';

export default class CampaignsTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      owner: props.owner,
      campaigns: props.campaigns
    };

    this.updateHandler = props.onUpdate;
    this.goToCampaign = this.goToCampaign.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({campaigns: nextProps.campaigns})
  }

  goToCampaign(selectedCampaigns){
    const campaignId = this.state.campaigns[selectedCampaigns[0]]._id;
    console.log(campaignId);

    browserHistory.push(`/users/${this.state.owner}/campaigns/${campaignId}`);
  }

  removeStore(campaignId){
    console.log(campaignId);

    // browserHistory.push(`/users/${this.state.owner}/stores/${storeId}`);
  }

  render() {
    return (
        <div>
          <Panel style={{marginTop: 20}}>
            <Table onRowSelection={this.goToCampaign}>
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
                  {/*// TableRow has to be present here instead of being a separate component*/}
                  {/*// as a workaround for bug where 'showRowHover' is not being propagated*/}
                  return (
                      <TableRow selectable={true} key={campaign._id}>
                        <TableRowColumn>{campaign.name}</TableRowColumn>
                        <TableRowColumn>{campaign.tags.join(',')}</TableRowColumn>
                        <TableRowColumn>{campaign.ads.join(',')}</TableRowColumn>
                        <TableRowColumn>{campaign.hasOwnProperty('expiration') ? campaign.expiration : ''}</TableRowColumn>
                        <TableRowColumn>{campaign._id}</TableRowColumn>
                          <TableRowColumn>
                            <a onClick={this.removeStore.bind(this, campaign._id)}>
                              <Fa name='times'/>
                            </a>
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
