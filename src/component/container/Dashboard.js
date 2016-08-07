import React, {Component} from 'react';

// import {
//     Row, Col, Grid
// } from 'react-bootstrap';

import DashboardNavBar from './DashboardNavBar'
import DashboardView from '../presentation/DashboardView'
// import Fa from 'react-fontawesome';

import '../../css/Dashboard.css';
import '../../css/sb-admin.css';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      user: props.params.userId
    }
  }

  render() {
    // TODO remove className="container"
    return (
        <div id="wrapper">
            <DashboardNavBar user={this.state.user}/>
            <DashboardView user={this.state.user}/>
        </div>
    );
  }
}
