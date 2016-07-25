import React, {Component} from 'react';
import {
    Navbar, Nav, NavItem, NavDropdown,
    MenuItem,
} from 'react-bootstrap';

import '../../css/Home.css';
import '../../css/landing-page.css';
import '../../css/sb-admin.css';
import '../../font-awesome/css/font-awesome.min.css';

import Fa from 'react-fontawesome';

export default class DashboardNavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: props.user
    }
  }

  render() {
    return (
        <Navbar fixedTop="true" bsStyle="inverse" role="navigation">
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Near.B</a>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Nav pullRight="true">
            <NavDropdown eventKey={3} title={<Fa name="bell" fixedWidth="true"/>} id="alert-dropdown">
              <MenuItem eventKey={1} href="#">Alerts</MenuItem>
            </NavDropdown>
            <NavDropdown title={<Fa name="user" fixedWidth="true"/>} id="user-dropdown">
              <MenuItem eventKey={1} href="#">{this.state.user}</MenuItem>
            </NavDropdown>
          </Nav>
          <Navbar.Collapse>
            <Nav bsClass="nav navbar-nav side-nav" stacked>
              <NavItem eventKey={1} href="#"><Fa name="dashboard" fixedWidth="true"/>Dashboard</NavItem>
              <NavItem eventKey={2} href="#"><Fa name="bar-chart" fixedWidth="true"/>Charts</NavItem>
              <NavItem eventKey={3} href="#"><Fa name="table" fixedWidth="true"/>Tables</NavItem>
              <NavItem eventKey={4} href="#"><Fa name="edit" fixedWidth="true"/>Forms</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    );
  }
}
