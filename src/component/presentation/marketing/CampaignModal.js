import React, {Component} from 'react';
import _s from 'underscore.string';

import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';
import {Panel} from 'react-bootstrap';


export default class CampaignModal extends Component {

  constructor(props) {
    super(props);

    this.data = props.data != null
        ? props.data
        : {
            name: '',
            tags: [],
            img: '',
            description: '',
            ads: []
          };

    this.ads = props.ads;
    if (this.ads == null){
      throw new Error(`Missing ads: ${this.campaign} or ${this.ads}`);
    }

    this.state = {
      disableSubmit: !(_s.isBlank(this.data.name) || this.data.tags.length === 0),
      current: this.data
    };

    this.handleClose = props.onClose;
    this.handleSubmit = props.onSubmit;
    this.markSelected = this.markSelected.bind(this);
    this._toogleSubmit = this._toogleSubmit.bind(this);
    this.handleNameUpdate = this.handleNameUpdate.bind(this);
    this.handleTagsUpdate = this.handleTagsUpdate.bind(this);
    this.handleAdSelection = this.handleAdSelection.bind(this);
    this.handleExpirationUpdate = this.handleExpirationUpdate.bind(this);
    this.handleDescriptionUpdate = this.handleDescriptionUpdate.bind(this);
  }

  handleNameUpdate(name) {
    this.data.name = name.target.value;
    this._toogleSubmit();
  }

  handleExpirationUpdate(event, date) {
    this.data.expiration = date;
    this._toogleSubmit();
  }

  handleTagsUpdate(tags) {
    this.data.tags = tags.target.value.split(',');
    this._toogleSubmit();
  }

  handleDescriptionUpdate(description) {
    this.data.description = description.target.value;
    this._toogleSubmit();
  }

  handleAdSelection(selectedAds) {
    const ads = [];
    selectedAds.forEach( (selectedAdIndex) => ads.push(this.props.ads[selectedAdIndex]));
    this.data.ads = ads;
    this._toogleSubmit();
  }

  _toogleSubmit() {
    const disable = _s.isBlank(this.data.name) || this.data.tags.length === 0;

    this.setState({
      current: this.data,
      disableSubmit: disable
    });
  }

  markSelected(adRow){
    return this.state.current.ads.map(ad => ad._id).includes(adRow._id);
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

    //FIXME un hundred ways of doing this better or in a more generic way... sns
    return (
      <Dialog title="Campaign Data" actions={modalActions} modal={true} open={true} autoScrollBodyContent={true}>
        <TextField floatingLabelText="Campaign Name" hintText="Barbas Bar" onChange={this.handleNameUpdate}
                   value={this.state.current.name} />
        <br />
        <TextField floatingLabelText="Tags" hintText="Beer,Food,UFC" onChange={this.handleTagsUpdate}
                   value={this.state.current.tags.length > 0 ? this.state.current.tags.join(',') : ""} />
        <br />
        <TextField floatingLabelText="description" hintText="Long description"
                   multiLine={true}
                   onChange={this.handleDescriptionUpdate}
                   value={this.state.current.description} />
        <br />
        <DatePicker
            hintText="Expiration Date"
            value={this.state.current.expiration != null ? new Date(this.state.current.expiration) : null}
            onChange={this.handleExpirationUpdate}
        />
        <br />
        <br />
        <Panel collapsible defaultExpanded={true} header="Choose ads">
          <Table height='200px' multiSelectable={true} onRowSelection={this.handleAdSelection}>
            <TableBody deselectOnClickaway={false}>
              {this.ads.map((ad) => {
                // TableRow has to be present here instead of being a separate component
                // as a workaround for bug where 'showRowHover' is not being propagated
                return (
                  <TableRow selectable={true} key={ad._id} style={{ height: '30px' }}
                            selected={this.markSelected(ad)}>
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
