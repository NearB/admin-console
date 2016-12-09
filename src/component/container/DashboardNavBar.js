import React, {Component} from 'react';
import {
    Navbar, Nav, NavItem, NavDropdown,
    MenuItem
} from 'react-bootstrap';

import '../../css/Home.css';
import '../../css/landing-page.css';
import '../../css/sb-admin.css';

import Fa from 'react-fontawesome';

export default class DashboardNavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId != null ? props.userId  : props.params.userId,
      storeId: props.storeId != null ? props.storeId  : props.params != null ? props.params.storeId  : null
    };
  }

  render() {
    return (
        <Navbar fixedTop={true} bsStyle="inverse" role="navigation" fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Near.B</a>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight={true}>
              <NavDropdown eventKey={3} title={<Fa name="bell" fixedWidth={true}/>} id="alert-dropdown">
                <MenuItem eventKey={1} href="#">Alerts</MenuItem>
              </NavDropdown>
              <NavDropdown title={<Fa name="user" fixedWidth={true}/>} id="user-dropdown">
                <MenuItem eventKey={1} href="#">{this.state.userId}</MenuItem>
              </NavDropdown>
            </Nav>
              <Nav bsClass="nav navbar-nav side-nav">
                <NavItem eventKey={1} href={`/users/${this.state.userId}/`}>
                  <Fa name="home" fixedWidth={true}/> Dashboard
                </NavItem>
                <NavItem eventKey={2} href={`/users/${this.state.userId}/stores`}>
                  <Fa name="map-marker" fixedWidth={true}/> Stores
                </NavItem>
                <NavItem eventKey={3} href={`/users/${this.state.userId}/products`}>
                  <Fa name="truck" fixedWidth={true}/> Warehouse
                </NavItem>
                <NavItem eventKey={4} href={`/users/${this.state.userId}/marketing`}>
                  <Fa name="users" fixedWidth={true}/> Marketing
                </NavItem>
              </Nav>
          </Navbar.Collapse>
        </Navbar>
    );
  }
}
