import React, {Component} from 'react';
import fetch from 'request-promise';

import CampaignsTable from '../../presentation/marketing/CampaignsTable';

export default class Campaigns extends Component {
  constructor(props) {
    super(props);

    this.state = {
      owner: props.owner,
      campaigns: []
    };

    this._fetchCampaigns = this._fetchCampaigns.bind(this);
    this.handleCampaignsUpdate = this.handleCampaignsUpdate.bind(this);
  }

  componentDidMount() {
    this._fetchCampaigns();
  }

  handleCampaignsUpdate(){
    return this._fetchCampaigns();
  }

  _fetchCampaigns() {
    return fetch({
          uri: 'http://localhost:10001/api/marketing/campaigns',
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          json: true
        }
    ).then((res) => {
      console.log(res);
      this.setState({campaigns: res.data})
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
        <CampaignsTable owner={this.state.owner} campaigns={this.state.campaigns}
                     onUpdate={this.handleCampaignsUpdate}/>
    );
  }
}
