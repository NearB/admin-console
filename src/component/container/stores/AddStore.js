import React, {Component} from 'react';
import fetch from 'request-promise';

import StoreModal from '../../presentation/stores/AddStoreModal';
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
          <FlatButton label="Create Store" primary={true} onTouchTap={this.handleOpen}/>
          <StoreModal
              ownerId={this.owner}
              onClose={this.handleClose}
              onSubmit={this.handleSubmit}
              open={this.state.showModal}
          />
        </div>

    );
  }
}
