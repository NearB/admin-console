import React, {Component} from 'react';
import fetch from 'request-promise';

import CampaignsTable from '../../presentation/marketing/CampaignsTable';

export default class Campaigns extends Component {
  constructor(props) {
    super(props);

    this.state = {
      owner: props.owner,
      campaigns: [],
      ads: []
    };

    this._fetchCampaigns = this._fetchCampaigns.bind(this);
    this.handleCampaignsUpdate = this.handleCampaignsUpdate.bind(this);
  }

  componentDidMount() {
    this._fetchCampaigns();
    this._fetchAds();
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
      this.setState({campaigns: res.data})
    }).catch((error) => {
      console.log(error);
    });
  }

  _fetchAds() {
    return fetch({
        uri: 'http://localhost:10001/api/marketing/ads',
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        json: true
      }
    ).then((res) => {
      this.setState({ads: res.data})
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <CampaignsTable
        owner={this.state.owner}
        campaigns={this.state.campaigns}
        ads={this.state.ads}
        onUpdate={this.handleCampaignsUpdate}
      />
    );
  }
}
