import React, {Component} from 'react';

import NavedContainer from './../NavedContainer'
import Stores from '../stores/Stores'

export default class StoresHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: props.userId != null ? props.userId  : props.params.userId
    };

    this.renderContent = this.renderContent.bind(this);
  }

  renderContent(){
    return (<Stores userId={this.state.userId}/>);
  }
  render() {
    return (
      <NavedContainer userId={this.state.userId}
                      content={this.renderContent}
      />
    );
  }
}
