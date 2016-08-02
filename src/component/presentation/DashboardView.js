import React, {Component} from 'react';


import Fa from 'react-fontawesome';
import {Panel} from 'react-bootstrap';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import Stores from '../container/Stores'

import {
    Row, Col
} from 'react-bootstrap';

export default class DashboardView extends Component {
  constructor(props){
    super(props);
    this.user = props.user;
  }

  render() {
    return (
        <div id="page-wrapper" className="container-fluid">
            <Row>
              <Col lg={8}>
                <Stores owner={this.user}/>
              </Col>
            </Row>
            <Row>
              <Col lg={4}>
                <Panel style={{marginTop: 20}} header={<i><Fa name="long-arrow-right" /> Donut Chart</i>}>
                  <div id="morris-donut-chart"></div>
                  <div className="text-right">
                    <a href="#">View Details <i className="fa fa-arrow-circle-right"></i></a>
                  </div>
                </Panel>
              </Col>
              <Col lg={4}>
                <Panel style={{marginTop: 20}} header={<i><Fa name="clock-o" /> Tasks Panel</i>}>
                  <div className="list-group">
                    <a href="#" className="list-group-item">
                      <span className="badge">23 minutes ago</span>
                      <i className="fa fa-fw fa-truck"></i> Order 392 shipped
                    </a>
                  </div>
                  <div className="text-right">
                    <a href="#">View All Activity <i className="fa fa-arrow-circle-right"></i></a>
                  </div>
                </Panel>
              </Col>
            </Row>
        </div>
    );
  }
}