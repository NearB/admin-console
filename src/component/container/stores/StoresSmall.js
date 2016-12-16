import React, {Component} from 'react';

import StoresTableSmall from '../../presentation/stores/StoresTableSmall';

import api from 'services/api';

export default class Stores extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: props.userId != null ? props.userId  : props.params.userId,
      stores: []
    };

    this._fetchStores = this._fetchStores.bind(this);
  }

  componentDidMount() {
    this._fetchStores();
  }

  _fetchStores() {
    return api(`stores?ownerId=${this.state.userId}`)
      .then((res) => {
        this.setState({stores: res.data})
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
        <StoresTableSmall userId={this.state.userId} stores={this.state.stores}/>
    );
  }
}
