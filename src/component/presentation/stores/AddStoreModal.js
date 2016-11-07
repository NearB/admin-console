import React, {Component} from 'react';
import _s from 'underscore.string';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


export default class AddStoreModal extends Component {

  constructor(props) {
    super(props);
    console.log(props);

    this.storeData = {
      owner: props.owner,
      name: '',
      location: {
        address: ''
      }
    };

    this.state = {
      disableSubmit: true
    };

    this.handleClose = props.onClose;
    this.handleSubmit = props.onSubmit;
    this.handleNameUpdate = this.handleNameUpdate.bind(this);
    this.handleAddressUpdate = this.handleAddressUpdate.bind(this);
    this._toogleSubmit = this._toogleSubmit.bind(this);
  }

  handleNameUpdate(name) {
    this.storeData.name = name.target.value;
    this._toogleSubmit();
  }

  handleAddressUpdate(address) {
    this.storeData.location.address = address.target.value;
    this._toogleSubmit();
  }

  _toogleSubmit() {
    const disable = _s.isBlank(this.storeData.name) || _s.isBlank(this.storeData.location.address);
    if (this.state.disableSubmit !== disable) {
      this.setState({disableSubmit: disable})
    }
  }

  render() {
    const modalActions = [
      <FlatButton label="Cancel" primary={true} onTouchTap={this.handleClose}/>,
      <FlatButton label="Submit" primary={true}
                  disabled={this.state.disableSubmit}
                  onTouchTap={() => {
                    this.handleSubmit(this.storeData)
                  }}/>,
    ];

    return (
        <Dialog title="Store Data" actions={modalActions} modal={true} open={true} autoScrollBodyContent={true}>
          <TextField floatingLabelText="Store Name" hintText="Barbas Bar" onChange={this.handleNameUpdate}/>
          <br />
          <TextField floatingLabelText="Address" hintText="Humboldt 1879" onChange={this.handleAddressUpdate}/>
        </Dialog>
    );
  }
}
