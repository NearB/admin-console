import React, {Component} from 'react';

import CampaignsTable from '../../presentation/marketing/CampaignsTable';

import api from 'services/api';

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
    return api('marketing/campaigns')
      .then((res) => {
        this.setState({campaigns: res.data})
      })
      .catch((error) => {
        console.log(error);
      });
  }

  _fetchAds() {
    return api('marketing/ads')
      .then((res) => {
        this.setState({ads: res.data})
      })
      .catch((error) => {
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
