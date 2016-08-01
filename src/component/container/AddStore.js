import React, {Component} from 'react';
import fetch from 'request-promise';

import StoreForm from '../presentation/StoreForm';
import FlatButton from 'material-ui/FlatButton';

export default class AddStore extends Component {
  constructor(props) {
    super(props);

    this.owner = props.owner;
    this.state = {
      showModal: false,
    };

    this.callback = props.callback;

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

  handleSubmit(storeData) {
    fetch({
          uri: 'http://localhost:10001/api/stores',
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          json: true,
          body: storeData
        }
    ).then((res) => {
      console.log(res);
      return this.callback();
    }).catch((error) => {
      console.log(error);
    });
    this.handleClose();
  }

  render() {
    return (
        <div style={{textAlign: "right"}}>
          <FlatButton label="Add Store" primary={true} onTouchTap={this.handleOpen}/>
          {this.state.showModal ?
              <StoreForm owner={this.owner} onClose={this.handleClose} onSubmit={this.handleSubmit}/>
              : null}
        </div>

    );
  }
}

