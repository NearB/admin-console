import React, {Component} from 'react';
import {
    Button
} from 'react-bootstrap';

import Fa from 'react-fontawesome';

import '../../font-awesome/css/font-awesome.min.css';

export default class FacebookLogin extends Component {
  render(){
    return (
        <Button>
          <Fa name="facebook" fixedWidth="true"/>
          {' '}
          <span className="network-name">Login with Facebook</span>
        </Button>
    );
  }
}