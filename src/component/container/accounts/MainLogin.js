import React, {Component} from 'react';
import {
    PageHeader,
    Row, Col,
    ListGroup, ListGroupItem
} from 'react-bootstrap';

import UserPasswordLogin from '../../presentation/accounts/UserPasswordLogin';
// import FacebookLogin from './FacebookLogin';

export default class MainLogin extends Component {
  render() {
    return (
        <PageHeader bsClass="intro-header container-fluid">
          <Row>
            <Col lg={12}>
              <div className="intro-message">
                <h1>Near.B</h1>
                <h3>Lo que buscas esta cerca</h3>
                <hr className="intro-divider"/>
                <ListGroup>
                  {/*<ListGroupItem bsClass="">*/}
                    <UserPasswordLogin/>
                  {/*</ListGroupItem>*/}
                  {/*<hr className="intro-divider"/>*/}
                  {/*<ListGroupItem bsClass="">*/}
                    {/*<FacebookLogin/>*/}
                  {/*</ListGroupItem>*/}
                </ListGroup>
              </div>
            </Col>
          </Row>
        </PageHeader>
    );
  }
}
