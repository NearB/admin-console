import React, {Component} from 'react';
import {
    PageHeader,
    Row, Col,
    Button
} from 'react-bootstrap';

import Fa from 'react-fontawesome';


import AuthService from "../../../services/AuthService";
const auth = new AuthService('Xsby13uXZrXqndMePb2uQaHT86SK99d9', 'alegmarra.auth0.com');


export default class MainLogin extends Component {

  constructor(props){
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen(){
    auth.login();
  }

  render() {
    return (
        <PageHeader bsClass="intro-header container-fluid">
          <Row>
            <Col lg={12}>
              <div className="intro-message">
                <h1>Near.B</h1>
                <h3>Lo que buscás está cerca</h3>
                <hr className="intro-divider"/>
                <Button onClick={this.handleOpen} bsSize="large">
                  <Fa name="sign-in" fixedWidth={true}/>
                  <span className="network-name"> Login</span>
                </Button>
              </div>
            </Col>
          </Row>
        </PageHeader>
    );
  }
}
