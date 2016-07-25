import React, {Component} from 'react';

import HomeTopNavBar from './HomeTopNavBar';
import MainLogin from '../presentation/MainLogin';

export default class Home extends Component {
  render() {
    return (
        <div className="App">
          <HomeTopNavBar/>
          <MainLogin/>
        </div>
    );
  }
}
