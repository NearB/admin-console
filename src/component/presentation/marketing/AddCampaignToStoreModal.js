import React, {Component} from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';

export default class AddCampaignToStoreModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedCampaign: null,
    };

    this.handleClose = props.onClose;
    this.handleSubmit = props.onSubmit;
    this.handleClick = this.handleClick.bind(this);
    this._doSubmit = this._doSubmit.bind(this);
  }

  handleClick(campaign) {
    this.setState({
      selectedCampaign: campaign,
    });
  }

  _doSubmit(){
    if (this.state.selectedCampaign == null){
      return;
    }
    this.handleSubmit(this.state.selectedCampaign._id);
  }

  render() {
    const modalActions = [
      <FlatButton label='Cancel' primary onTouchTap={this.handleClose}/>,
      <FlatButton label='Add'
                  primary
                  onTouchTap={this._doSubmit}/>,
    ];

    return (
        <Dialog title="Available Campaigns" actions={modalActions} modal={true} open={true} autoScrollBodyContent={true}>
          <List>
            {this.props.campaigns
                .filter(c => !this.props.existing.map(e=> e._id).includes(c._id))
                .map((campaign) => {
                  const back = (this.state.selectedCampaign != null && this.state.selectedCampaign._id == campaign._id)
                      ? '#F9E1B0' : '#FFFFFF';

                  return (
                  <ListItem key={campaign._id}
                            style={{backgroundColor: back}}
                            onClick={this.handleClick.bind(this, campaign)}
                            primaryText={campaign.name}
                            secondaryText={campaign.tags}
                  />);
            })}
          </List>
        </Dialog>
    );
  }
}

AddCampaignToStoreModal.propTypes = {
  campaigns: React.PropTypes.array.isRequired,
  existing: React.PropTypes.array.isRequired
};
