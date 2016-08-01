import React, {Component} from 'react';
import {
    Button,
    FormGroup, FormControl,
    Form
} from 'react-bootstrap';

import Fa from 'react-fontawesome';

export default class UserPasswordLogin extends Component {

  render(){
    return (
        <Form inline>
          <FormGroup controlId="formInlineName">
            {' '}
            <FormControl type="text" placeholder="Username"/>
          </FormGroup>
          {' '}
          <FormGroup controlId="formInlinePassword">
            {' '}
            <FormControl type="email" placeholder="Password"/>
          </FormGroup>
          {' '}
          <Button>
            <Fa name="sign-in" fixedWidth={true}/>
            <span className="network-name">Login</span>
          </Button>
        </Form>
    );
  }
}