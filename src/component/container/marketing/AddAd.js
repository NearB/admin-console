import React, {Component} from 'react';

import AdModal from '../../presentation/marketing/AdModal';
import FlatButton from 'material-ui/FlatButton';

import api from 'services/api';


export default class AddAd extends Component {
  constructor(props) {
    super(props);

    this.userId = props.userId != null ? props.userId  : props.params.userId;
    this.state = {
      showModal: false,
    };

    this.callback = props.onUpdate;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleClose() {
    this.setState({showModal: false});
  }

  handleOpen() {
    this.setState({showModal: true});
  }

  handleSubmit(adData) {
    api.post('marketing/ads', adData)
      .then((res) => {
        console.log(res);
        return this.callback();
      })
      .catch((error) => {
        console.log(error);
      });

    this.handleClose();
  }

  render() {
    return (
        <div style={{textAlign: "right"}}>
          <FlatButton label="Create Ad" primary={true} onTouchTap={this.handleOpen}/>
          {this.state.showModal ?
              <AdModal userId={this.userId} onClose={this.handleClose} onSubmit={this.handleSubmit}/>
              : null}
        </div>

    );
  }
}
