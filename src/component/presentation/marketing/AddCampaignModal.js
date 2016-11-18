import React, {Component} from 'react';
import _s from 'underscore.string';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';
import {Panel} from 'react-bootstrap';


export default class AddCampaignModal extends Component {

  constructor(props) {
    super(props);
    console.log(props);

    this.campaignData = {
      name: '',
      tags: [],
      img: '',
      description: '',
      ads: []
    };

    this.state = {
      disableSubmit: true
    };

    this.handleClose = props.onClose;
    this.handleSubmit = props.onSubmit;
    this._toogleSubmit = this._toogleSubmit.bind(this);
    this.handleNameUpdate = this.handleNameUpdate.bind(this);
    this.handleTagsUpdate = this.handleTagsUpdate.bind(this);
    this.handleImgUpdate = this.handleImgUpdate.bind(this);
    this.handleDescriptionUpdate = this.handleDescriptionUpdate.bind(this);
    this.handleAdSelection = this.handleAdSelection.bind(this);
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

  handleAdSelection(selectedAds) {
    const ads = [];
    selectedAds.forEach( (selectedAdIndex) => ads.push(this.props.ads[selectedAdIndex]));
    this.campaignData.ads = ads;
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
        <br />
        <br />
        <Panel collapsible defaultExpanded={true} header="Choose ads">
          <Table height='200px' multiSelectable={true} onRowSelection={this.handleAdSelection}>
            <TableBody>
              {this.props.ads.map((ad) => {
                // TableRow has to be present here instead of being a separate component
                // as a workaround for bug where 'showRowHover' is not being propagated
                return (
                  <TableRow selectable={true} key={ad._id} style={{ height: '30px' }}>
                    <TableRowColumn>{ad.name}</TableRowColumn>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Panel>
      </Dialog>
    );
  }
}
