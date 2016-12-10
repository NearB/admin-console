import React, {Component} from 'react';

import DashboardNavBar from './DashboardNavBar'

import '../../css/Dashboard.css';
import '../../css/sb-admin.css';

const style = {
  paddingLeft: '15px',
  paddingRight: '15px',
};

export default class NavedContainer extends Component {
  constructor(props) {
    super(props);

    this.state ={
      userId: props.userId != null ? props.userId  : props.params.userId
    };
  }

  render() {
    return (
      <div id="wrapper">
        <DashboardNavBar userId={this.state.userId}/>
        <div id="page-wrapper" style={style}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
