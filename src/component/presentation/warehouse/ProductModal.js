import React, {Component} from 'react';
import _s from 'underscore.string';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


export default class ProductModal extends Component {

  constructor(props) {
    super(props);

    this.data = props.data != null
        ? props.data
        : {
            name: '',
            tags: [],
            img: '',
            description: ''
          };
    
    this.state = {
      disableSubmit: _s.isBlank(this.data.name) || _s.isBlank(this.data.img) || this.data.tags.length === 0,
      current: this.data
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
    this.data.name = name.target.value;
    this._toogleSubmit();
  }

  handleTagsUpdate(tags) {
    this.data.tags = tags.target.value.split(',');
    this._toogleSubmit();
  }

  handleImgUpdate(img) {
    this.data.img = img.target.value;
    this._toogleSubmit();
  }

  handleDescriptionUpdate(description) {
    this.data.description = description.target.value;
    this._toogleSubmit();
  }

  _toogleSubmit() {
    const disable = _s.isBlank(this.data.name) ||
                    _s.isBlank(this.data.img) ||
                    this.data.tags.length === 0;

      this.setState({
            disableSubmit: disable,
            current: this.data
          });
  }

  render() {
    const modalActions = [
      <FlatButton label="Cancel" primary={true} onTouchTap={this.handleClose}/>,
      <FlatButton label="Done" primary={true}
                  disabled={this.state.disableSubmit}
                  onTouchTap={() => {
                    this.handleSubmit(this.state.current)
                  }}/>,
    ];

    return (
        <Dialog title="Product Data" actions={modalActions} modal={true} open={true} autoScrollBodyContent={true}>
          <TextField floatingLabelText="Product Name" hintText="Barbas Bar" onChange={this.handleNameUpdate}
                     value={this.state.current.name} />
          <br />
          <TextField floatingLabelText="Tags" hintText="Beer,Food,UFC" onChange={this.handleTagsUpdate}
                     value={this.state.current.tags} />
          <br />
          <TextField floatingLabelText="Img" hintText="http://myimagelink.com/img" onChange={this.handleImgUpdate}
                     value={this.state.current.img} />
          <br />
          <TextField floatingLabelText="description" hintText="Long description" multiLine={true}
                     onChange={this.handleDescriptionUpdate}
                     value={this.state.current.description} />
          <br />
        </Dialog>
    );
  }
}
