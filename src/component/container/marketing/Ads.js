import React, {Component} from 'react';

import AdsTable from '../../presentation/marketing/AdsTable';

import api from 'services/api';

export default class Ads extends Component {
  constructor(props) {
    super(props);

    this.state = {
      owner: props.owner,
      ads: []
    };

    this._fetchAds = this._fetchAds.bind(this);
    this.handleAdsUpdate = this.handleAdsUpdate.bind(this);
  }

  componentDidMount() {
    this._fetchAds();
  }

  handleAdsUpdate(){
    return this._fetchAds();
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
        <AdsTable owner={this.state.owner} ads={this.state.ads}
                     onUpdate={this.handleAdsUpdate}/>
    );
  }
}
