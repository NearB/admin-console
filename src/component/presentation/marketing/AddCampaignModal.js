import React, {Component} from 'react';
import _s from 'underscore.string';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


export default class AddCampaignModal extends Component {

  constructor(props) {
    super(props);
    console.log(props);

    this.campaignData = {
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
    this._toogleSubmit = this._toogleSubmit.bind(this);
  }

  handleNameUpdate(name) {
    this.campaignData.name = name.target.value;
    this._toogleSubmit();
  }

  handleTagsUpdate(tags) {
    this.campaignData.tags = tags.target.value.split(',');
    this._toogleSubmit();
  }

  handleImgUpdate(img) {
    this.campaignData.img = img.target.value;
    this._toogleSubmit();
  }

  handleDescriptionUpdate(description) {
    this.campaignData.description = description.target.value;
    this._toogleSubmit();
  }

  _toogleSubmit() {
    const disable = _s.isBlank(this.campaignData.name) ||
                    _s.isBlank(this.campaignData.img) ||
                    this.campaignData.tags.length === 0;

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
                    this.handleSubmit(this.campaignData)
                  }}/>,
    ];

    return (
        <Dialog title="Campaign Data" actions={modalActions} modal={true} open={true} autoScrollBodyContent={true}>
          <TextField floatingLabelText="Campaign Name" hintText="Barbas Bar" onChange={this.handleNameUpdate}/>
          <br />
          <TextField floatingLabelText="Tags" hintText="Beer,Food,UFC" onChange={this.handleTagsUpdate}/>
          <br />
          <TextField floatingLabelText="Img" hintText="http://myimagelink.com/img" onChange={this.handleImgUpdate}/>
          <br />
          <TextField floatingLabelText="description" hintText="Long description of the campaign" onChange={this.handleDescriptionUpdate}/>
        </Dialog>
    );
  }
}
