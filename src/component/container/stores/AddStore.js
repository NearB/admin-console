import React, {Component} from 'react';

import StoreModal from '../../presentation/stores/AddStoreModal';
import FlatButton from 'material-ui/FlatButton';

import api from 'services/api';

export default class AddStore extends Component {
  constructor(props) {
    super(props);

    this.userId = props.userId;
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

  handleSubmit(storeData) {
    api.post('stores', storeData)
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
          <FlatButton label="Create Store" primary={true} onTouchTap={this.handleOpen}/>
          <StoreModal
              userId={this.userId}
              onClose={this.handleClose}
              onSubmit={this.handleSubmit}
              open={this.state.showModal}
          />
        </div>

    );
  }
}
