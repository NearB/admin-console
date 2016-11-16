import React, {Component} from 'react';
import fetch from 'request-promise';

import CampaignsTable from '../../presentation/marketing/CampaignsTable';

export default class Campaigns extends Component {
  constructor(props) {
    super(props);

    this.state = {
      owner: props.owner,
      campaigns: [],
      ads: props.ads || [
        {
          "_id": "582141464fd49043497e57b5",
          "name": "05 Ad",
          "img": "/some/path",
          "tags": [
            "tag03"
          ]
        },
        {
          "_id": "582141464fd49043497e57b2",
          "name": "02 Ad",
          "img": "/some/path",
          "tags": [
            "tag01"
          ]
        },
        {
          "_id": "582141464fd49043497e57b4",
          "name": "04 Ad",
          "img": "/some/path",
          "tags": [
            "tag01",
            "tag02"
          ]
        },
        {
          "_id": "582141464fd49043497e57b6",
          "name": "06 Ad",
          "img": "/some/path",
          "expiration": "20161212",
          "tags": [
            "tag01"
          ]
        },
        {
          "_id": "58214215c877144ce9e1ae64",
          "name": "01 Ad",
          "img": "/some/path",
          "tags": [
            "tag01"
          ]
        },
        {
          "_id": "58214215c877144ce9e1ae65",
          "name": "02 Ad",
          "img": "/some/path",
          "tags": [
            "tag01"
          ]
        },
        {
          "_id": "58214215c877144ce9e1ae66",
          "name": "03 Ad",
          "img": "/some/path",
          "tags": [
            "tag01",
            "tag02"
          ]
        },
        {
          "_id": "58214215c877144ce9e1ae67",
          "name": "04 Ad",
          "img": "/some/path",
          "tags": [
            "tag01",
            "tag02"
          ]
        },
        {
          "_id": "58214215c877144ce9e1ae68",
          "name": "05 Ad",
          "img": "/some/path",
          "tags": [
            "tag03"
          ]
        },
        {
          "_id": "58214215c877144ce9e1ae69",
          "name": "06 Ad",
          "img": "/some/path",
          "expiration": "20161212",
          "tags": [
            "tag01"
          ]
        },
        {
          "_id": "582143b6d27c0756cd92f90f",
          "name": "01 Ad",
          "img": "/some/path",
          "tags": [
            "tag01"
          ]
        },
        {
          "_id": "582143b6d27c0756cd92f910",
          "name": "02 Ad",
          "img": "/some/path",
          "tags": [
            "tag01"
          ]
        },
        {
          "_id": "582143b6d27c0756cd92f911",
          "name": "03 Ad",
          "img": "/some/path",
          "tags": [
            "tag01",
            "tag02"
          ]
        },
        {
          "_id": "582143b6d27c0756cd92f912",
          "name": "04 Ad",
          "img": "/some/path",
          "tags": [
            "tag01",
            "tag02"
          ]
        },
        {
          "_id": "582143b6d27c0756cd92f913",
          "name": "05 Ad",
          "img": "/some/path",
          "tags": [
            "tag03"
          ]
        },
        {
          "_id": "582143b6d27c0756cd92f914",
          "name": "06 Ad",
          "img": "/some/path",
          "expiration": "20161212",
          "tags": [
            "tag01"
          ]
        },
        {
          "_id": "58214487473cf9600c1b5b1d",
          "name": "01 Ad",
          "img": "/some/path",
          "tags": [
            "tag01"
          ]
        },
        {
          "_id": "58214487473cf9600c1b5b1e",
          "name": "02 Ad",
          "img": "/some/path",
          "tags": [
            "tag01"
          ]
        },
        {
          "_id": "58214487473cf9600c1b5b1f",
          "name": "03 Ad",
          "img": "/some/path",
          "tags": [
            "tag01",
            "tag02"
          ]
        },
        {
          "_id": "58214487473cf9600c1b5b20",
          "name": "04 Ad",
          "img": "/some/path",
          "tags": [
            "tag01",
            "tag02"
          ]
        },
        {
          "_id": "58214487473cf9600c1b5b21",
          "name": "05 Ad",
          "img": "/some/path",
          "tags": [
            "tag03"
          ]
        },
        {
          "_id": "58214487473cf9600c1b5b22",
          "name": "06 Ad",
          "img": "/some/path",
          "expiration": "20161212",
          "tags": [
            "tag01"
          ]
        }
      ]
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
      <CampaignsTable
        owner={this.state.owner}
        campaigns={this.state.campaigns}
        ads={this.state.ads}
        onUpdate={this.handleCampaignsUpdate}
      />
    );
  }
}
