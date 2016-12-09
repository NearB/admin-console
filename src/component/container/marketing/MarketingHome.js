import React, {Component} from 'react';


import NavedContainer from './../NavedContainer'
import Campaigns from './Campaigns'
import Ads from './Ads'

import {
    Row, Col
} from 'react-bootstrap';


export default class MarketingHome extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userId: props.userId != null ? props.userId  : props.params.userId,
    };

    this.renderContent = this.renderContent.bind(this);
  }

  renderContent() {
    return (
        <div>
          <Row>
            <Col lg={12}>
              <Campaigns userId={this.state.userId}/>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Ads userId={this.state.userId} globalUpdate={this.forceUpdate}/>
            </Col>
          </Row>
        </div>
    );
  }

  render() {
    return (
        <NavedContainer userId={this.state.userId}
                        content={this.renderContent}
        />
    );
  }

}
