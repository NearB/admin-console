import React, {Component} from 'react';
import fetch from 'request-promise';

import AdsTable from '../../presentation/marketing/AdsTable';

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
      console.log(res);
      this.setState({ads: res.data})
    }).catch((error) => {
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
