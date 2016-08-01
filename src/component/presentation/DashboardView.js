import React, {Component} from 'react';

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
        <div id="page-wrapper">
          <div className="container-fluid">
            <Row>
              <Col lg={8}>
                <Stores owner={this.user}/>
              </Col>
            </Row>

            <div className="row">
              <div className="col-lg-4">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h3 className="panel-title"><i className="fa fa-long-arrow-right fa-fw"></i> Donut Chart</h3>
                  </div>
                  <div className="panel-body">
                    <div id="morris-donut-chart"></div>
                    <div className="text-right">
                      <a href="#">View Details <i className="fa fa-arrow-circle-right"></i></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h3 className="panel-title"><i className="fa fa-clock-o fa-fw"></i> Tasks Panel</h3>
                  </div>
                  <div className="panel-body">
                    <div className="list-group">
                      <a href="#" className="list-group-item">
                        <span className="badge">23 minutes ago</span>
                        <i className="fa fa-fw fa-truck"></i> Order 392 shipped
                      </a>
                    </div>
                    <div className="text-right">
                      <a href="#">View All Activity <i className="fa fa-arrow-circle-right"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}