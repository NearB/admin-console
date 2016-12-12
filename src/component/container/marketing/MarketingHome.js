import React, {Component} from 'react';


import NavedContainer from './../NavedContainer'
import Campaigns from './Campaigns'
import Ads from './Ads'


export default class MarketingHome extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userId: props.userId != null ? props.userId  : props.params.userId,
    };
  }

  render() {
    return (
      <NavedContainer userId={this.state.userId}>
        <Campaigns userId={this.state.userId}/>
        <Ads userId={this.state.userId} globalUpdate={this.forceUpdate}/>
      </NavedContainer>
    );
  }

}
