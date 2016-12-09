import React, {Component} from 'react';

import AdsTable from '../../presentation/marketing/AdsTable';

import api from 'services/api';

export default class Ads extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: props.userId != null ? props.userId  : props.params.userId,
      ads: []
    };

    this.globalUpdate = props.globalUpdate;
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
        this.setState({ads: res.data});
        this.globalUpdate();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
        <AdsTable userId={this.state.userId} ads={this.state.ads}
          onUpdate={this.handleAdsUpdate}/>
    );
  }
}


