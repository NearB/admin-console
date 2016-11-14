import React, {Component} from 'react';
import {
    Button,
    FormGroup, FormControl,
    Form
} from 'react-bootstrap';

import {browserHistory} from 'react-router';

import Fa from 'react-fontawesome';
import _s from 'underscore.string';
import fetch from 'request-promise';

// import Dialog from 'material-ui/Dialog';
// import FlatButton from 'material-ui/FlatButton';
// import TextField from 'material-ui/TextField';

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

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
    fetch({
      uri: `http://localhost:10001/api/users/${this.user}`,
      method: 'GET',
      headers: headers,
      json: true
    })
    .then(res => {
      if (res.data != null) {
        browserHistory.push(`/users/${res.data._id}/dashboard`);
      } else {
        fetch({
          uri: 'http://localhost:10001/api/users',
          method: 'POST',
          headers: headers,
          body: {
            username: this.user,
            name: this.user,
            stores: [],
            filters: []
          },
          json: true
        })
        .then(res => {
          browserHistory.push(`/users/${res.data._id}/dashboard`);
        })
        .catch(err => {
          console.log(err);
        });
      }
    })
    .catch(console.log);
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
