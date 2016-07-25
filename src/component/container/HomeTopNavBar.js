import React, {Component} from 'react';
import {
    Navbar, Nav, NavItem, NavDropdown,
    MenuItem,
} from 'react-bootstrap';

import MainLogin from '../presentation/MainLogin'

import '../../css/Home.css';
import '../../css/landing-page.css';
import '../../font-awesome/css/font-awesome.min.css';

export default class HomeTopNavBar extends Component {
  render() {
    return (
        <Navbar fixedTop="true" bsStyle="inverse" role="navigation">
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Near.B</a>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight="true">
              <NavItem eventKey={1} href="#">Contact Us</NavItem>
              <NavItem eventKey={2} href="#">About</NavItem>
              <NavDropdown eventKey={3} title="Features" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>Marketing</MenuItem>
                <MenuItem eventKey={3.2}>Content Promotion</MenuItem>
                <MenuItem eventKey={3.3}>Analytics</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    );
  }
}
