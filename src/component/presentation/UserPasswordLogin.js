import React, {Component} from 'react';
import {
    Button,
    FormGroup, FormControl,
    Form
} from 'react-bootstrap';

import {browserHistory} from 'react-router';

import Fa from 'react-fontawesome';
import _s from 'underscore.string';


import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

export default class UserPasswordLogin extends Component {

  constructor(props) {
    super(props);

    this.user = '';
    this.pass = '';

    this.state = {
      disableSubmit: true
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserUpdate = this.handleUserUpdate.bind(this);
    this.handlePasswordUpdate = this.handlePasswordUpdate.bind(this);
    this._toogleSubmit = this._toogleSubmit.bind(this);
  }

  handleUserUpdate(user) {
    this.user = user.target.value;
    this._toogleSubmit();
  }

  handlePasswordUpdate(pass) {
    this.pass = pass.target.value;
    this._toogleSubmit();
  }

  _toogleSubmit() {
    const disable = _s.isBlank(this.user) || _s.isBlank(this.pass);
    if (this.state.disableSubmit !== disable) {
      this.setState({disableSubmit: disable})
    }
  }

  handleSubmit() {
    browserHistory.push(`/users/${this.user}/dashboard`);
  }

  render(){
    return (
        <Form inline>
          <FormGroup controlId="formInlineName">
            {' '}
            <FormControl type="text" placeholder="Username" onChange={this.handleUserUpdate}/>
          </FormGroup>
          {' '}
          <FormGroup controlId="formInlinePassword">
            {' '}
            <FormControl type="password" placeholder="Password" onChange={this.handlePasswordUpdate}/>
          </FormGroup>
          {' '}
          <FormGroup controlId="formInlinePassword">
            <Button disabled={this.state.disableSubmit} onClick={this.handleSubmit}>
              <Fa name="sign-in" fixedWidth={true}/>
              <span className="network-name">Login</span>
            </Button>
          </FormGroup>
        </Form>
    );
  }
}