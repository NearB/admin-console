import React, {Component} from 'react';


import Stores from '../container/stores/Stores'

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
    this.userId = props.userId;
  }

  render() {
    return (
        <div id="page-wrapper" style={style}>
            <Row>
              <Col lg={12}>
                <Stores userId={this.userId}/>
              </Col>
            </Row>
        </div>
    );
  }
}
