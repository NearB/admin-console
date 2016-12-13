import React, {Component} from 'react';

import StoreModal from '../../presentation/stores/StoreModal';
import FlatButton from 'material-ui/FlatButton';
import Fa from 'react-fontawesome';

import api from 'services/api';

export default class EditStore extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      userId: props.userId != null ? props.userId  : props.params.userId,
      store: props.data
    };

    this.callback = props.onUpdate;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      product: nextProps.data
    })
  }

  handleClick(e) {
    // To avoid row selection
    e.preventDefault();
    e.stopPropagation();
  }

  handleClose() {
    this.setState({showModal: false});
  }

  handleOpen() {
    this.setState({showModal: true});
  }

  handleSubmit(data) {
    api.put(`stores/${this.state.store._id}`, data)
      .then((res) => {
        return this.callback(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    this.handleClose();
  }

  render() {
    return (
          <FlatButton
              icon={<Fa name='pencil'/>}
              onClick={this.handleOpen}>
            {this.state.showModal ?
                <StoreModal data={this.state.store} userId={this.state.userId}
                            onClose={this.handleClose}
                            onSubmit={this.handleSubmit}/>
                : null}
          </FlatButton>

    );
  }
}
