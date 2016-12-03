import React, {Component} from 'react';


import Stores from '../container/stores/Stores'
import Products from '../container/warehouse/Products'
import Campaigns from '../container/marketing/Campaigns'
import Ads from '../container/marketing/Ads'

import {
    Row, Col
} from 'react-bootstrap';

const style = {
    paddingLeft: '15px',
    paddingRight: '15px',
};

export default class DashboardView extends Component {
  constructor(props){
    super(props);
    this.user = props.user;
  }

  render() {
    return (
        <div id="page-wrapper" style={style}>
            <Row>
              <Col lg={12}>
                <Stores owner={this.user}/>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <Products owner={this.user}/>
              </Col>
            </Row>
            <Row>
              <Col lg={6}>
                <Campaigns owner={this.user}/>
              </Col>
              <Col lg={6}>
                <Ads owner={this.user}/>
              </Col>
            </Row>
        </div>
    );
  }
}
