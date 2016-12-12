import React, {Component} from 'react';

import NavedContainer from '../NavedContainer';
import ContentManager from '../ContentManager';
import Orders from '../warehouse/Orders';
import Carts from '../warehouse/Carts';

import {
    Grid, Row, Col
} from 'react-bootstrap';


export default class Store extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: props.userId != null ? props.userId  : props.params.userId,
      storeId: props.storeId != null ? props.storeId  : props.params.storeId
    };
  }

  render(){
    return (
      <NavedContainer userId={this.state.userId}>
        <Grid fluid>
          <Row>
            <Col lg={6}>
              <Orders storeId={this.state.storeId}></Orders>
            </Col>
            <Col lg={6}>
              <Carts storeId={this.state.storeId}></Carts>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <ContentManager storeId={this.state.storeId}/>
            </Col>
          </Row>
        </Grid>
      </NavedContainer>
    );
  }
}
