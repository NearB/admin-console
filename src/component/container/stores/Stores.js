import React, {Component} from 'react';

import StoresTable from '../../presentation/stores/StoresTable';

import api from 'services/api';

export default class Stores extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: props.userId != null ? props.userId  : props.params.userId,
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
    return api('stores')
      .then((res) => {
        this.setState({stores: res.data})
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
        <StoresTable userId={this.state.userId} stores={this.state.stores}
                       onUpdate={this.handleStoresUpdate}/>
    );
  }
}
