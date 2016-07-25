import React, {Component} from 'react';

import {
    Row,Col
} from 'react-bootstrap';

import DashboardNavBar from './DashboardNavBar'
import Fa from 'react-fontawesome';

import '../../css/Dashboard.css';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      user: props.params.userId
    }
  }

  render() {
    return (
        <div className="dashboard">
          <DashboardNavBar user={this.state.user}/>
          <Row>
            <Col md="4" bsClass="add-block">
              <Fa name="plus"/>
            </Col>
            <Col md="4" bsClass="add-block">
              <Fa name="plus"/>
            </Col>
            <Col md="4" bsClass="add-block">
              <Fa name="plus"/>
            </Col>
          </Row>
        </div>
    );
  }
}
