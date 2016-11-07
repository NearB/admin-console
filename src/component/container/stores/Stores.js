import React, {Component} from 'react';
import fetch from 'request-promise';

import StoresTable from '../../presentation/stores/StoresTable';

export default class Stores extends Component {
  constructor(props) {
    super(props);

    this.state = {
      owner: props.owner,
      stores: []
    };

    this._fetchStores = this._fetchStores.bind(this);
    this.handleStoresUpdate = this.handleStoresUpdate.bind(this);
  }

  componentDidMount() {
    this._fetchStores();
  }

  handleStoresUpdate(){
    return this._fetchStores();
  }

  _fetchStores() {
    return fetch({
          uri: 'http://localhost:10001/api/stores',
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          json: true
        }
    ).then((res) => {
      console.log(res);
      this.setState({stores: res.data})
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
        <StoresTable owner={this.state.owner} stores={this.state.stores}
                     onUpdate={this.handleStoresUpdate}/>
    );
  }
}
