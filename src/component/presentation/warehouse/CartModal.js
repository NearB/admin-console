import React, {Component} from 'react';
import _s from 'underscore.string';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


export default class CartModal extends Component {

  constructor(props) {
    super(props);
    console.log(props);

    this.productData = {
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
    this.productData.name = name.target.value;
    this._toogleSubmit();
  }

  handleTagsUpdate(tags) {
    this.productData.tags = tags.target.value.split(',');
    this._toogleSubmit();
  }

  handleImgUpdate(img) {
    this.productData.img = img.target.value;
    this._toogleSubmit();
  }

  handleDescriptionUpdate(description) {
    this.productData.description = description.target.value;
    this._toogleSubmit();
  }

  _toogleSubmit() {
    const disable = _s.isBlank(this.productData.name) ||
                    _s.isBlank(this.productData.img) ||
                    this.productData.tags.length === 0;

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
                    this.handleSubmit(this.productData)
                  }}/>,
    ];

    return (
        <Dialog title="Product Data" actions={modalActions} modal={true} open={true} autoScrollBodyContent={true}>
          <TextField floatingLabelText="Product Name" hintText="Barbas Bar" onChange={this.handleNameUpdate}/>
          <br />
          <TextField floatingLabelText="Tags" hintText="Beer,Food,UFC" onChange={this.handleTagsUpdate}/>
          <br />
          <TextField floatingLabelText="Img" hintText="http://myimagelink.com/img" onChange={this.handleImgUpdate}/>
          <br />
          <TextField floatingLabelText="description" hintText="Long description of the product" onChange={this.handleDescriptionUpdate}/>
        </Dialog>
    );
  }
}
