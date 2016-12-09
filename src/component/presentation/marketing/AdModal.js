import React, {Component} from 'react';
import _s from 'underscore.string';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


export default class AdModal extends Component {

  constructor(props) {
    super(props);

    this.adData = {
      name: '',
      tags: [],
      img: '',
      description: ''
    };

    this.state = {
      disableSubmit: true
    };

    this.handleClose = props.onClose;
    this.handleSubmit = props.onSubmit;
    this.handleNameUpdate = this.handleNameUpdate.bind(this);
    this.handleTagsUpdate = this.handleTagsUpdate.bind(this);
    this.handleImgUpdate = this.handleImgUpdate.bind(this);
    this.handleDescriptionUpdate = this.handleDescriptionUpdate.bind(this);
    this._toogleSubmit = this._toogleSubmit.bind(this);
  }

  handleNameUpdate(name) {
    this.adData.name = name.target.value;
    this._toogleSubmit();
  }

  handleTagsUpdate(tags) {
    this.adData.tags = tags.target.value.split(',');
    this._toogleSubmit();
  }

  handleImgUpdate(img) {
    this.adData.img = img.target.value;
    this._toogleSubmit();
  }

  handleDescriptionUpdate(description) {
    this.adData.description = description.target.value;
    this._toogleSubmit();
  }

  _toogleSubmit() {
    const disable = _s.isBlank(this.adData.name) ||
                    _s.isBlank(this.adData.img) ||
                    this.adData.tags.length === 0;

    if (this.state.disableSubmit !== disable) {
      this.setState({disableSubmit: disable})
    }
  }

  render() {
    const modalActions = [
      <FlatButton label="Cancel" primary={true} onTouchTap={this.handleClose}/>,
      <FlatButton label="Done" primary={true}
                  disabled={this.state.disableSubmit}
                  onTouchTap={() => {
                    this.handleSubmit(this.adData)
                  }}/>,
    ];

    return (
        <Dialog title="Ad Data" actions={modalActions} modal={true} open={true} autoScrollBodyContent={true}>
          <TextField floatingLabelText="Ad Name" hintText="Barbas Bar" onChange={this.handleNameUpdate}/>
          <br />
          <TextField floatingLabelText="Tags" hintText="Beer,Food,UFC" onChange={this.handleTagsUpdate}/>
          <br />
          <TextField floatingLabelText="Img" hintText="http://myimagelink.com/img" onChange={this.handleImgUpdate}/>
          <br />
          <TextField floatingLabelText="description" hintText="Long description of the ad" onChange={this.handleDescriptionUpdate}/>
        </Dialog>
    );
  }
}
