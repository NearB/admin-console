import React, {Component} from 'react';
import _s from 'underscore.string';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


export default class StoreModal extends Component {

  constructor(props) {
    super(props);

    this.data = props.data != null
        ? props.data
        : {
      ownerId: props.userId != null ? props.userId  : props.params.userId,
      name: '',
      address: '',
      img: '',
    };
    
    this.state = {
      disableSubmit: _s.isBlank(this.data.name) || _s.isBlank(this.data.img) || _s.isBlank(this.data.address),
      current: this.data
    };

    this.handleClose = props.onClose;
    this.handleSubmit = props.onSubmit;
    this.handleNameUpdate = this.handleNameUpdate.bind(this);
    this.handleAddressUpdate = this.handleAddressUpdate.bind(this);
    this.handleImgUpdate = this.handleImgUpdate.bind(this);
    this._toogleSubmit = this._toogleSubmit.bind(this);
  }

  handleNameUpdate(name) {
    this.data.name = name.target.value;
    this._toogleSubmit();
  }

  handleAddressUpdate(address) {
    this.data.address = address.target.value;
    this._toogleSubmit();
  }

  handleImgUpdate(img) {
    this.data.img = img.target.value;
    this._toogleSubmit();
  }

  _toogleSubmit() {
    const disable = _s.isBlank(this.data.name) || _s.isBlank(this.data.img) || _s.isBlank(this.data.address);
    this.setState({
      disableSubmit: disable,
      current: this.data
    });
  }

  render() {
    const modalActions = [
      <FlatButton label="CANCEL" primary={true} onTouchTap={this.handleClose}/>,
      <FlatButton label="DONE" primary={true}
                  disabled={this.state.disableSubmit}
                  onTouchTap={() => {
                    this.handleSubmit(this.data)
                  }}/>,
    ];

    return (
        <Dialog title="Store Data" actions={modalActions} modal={true} open={this.props.open} autoScrollBodyContent={true}>
          <TextField floatingLabelText="Store Name" hintText="My New Bar" onChange={this.handleNameUpdate}/>
          <br />
          <TextField floatingLabelText="Address" hintText="Humboldt 1879" onChange={this.handleAddressUpdate}/>
          <br />
          <TextField floatingLabelText="Logo" hintText="http://myimagelink.com/img" onChange={this.handleImgUpdate}
                     value={this.state.current.img} />
          <br />
        </Dialog>
    );
  }
}
