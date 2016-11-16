import React, {Component} from 'react';
import fetch from 'request-promise';

import CampaignModal from '../../presentation/marketing/AddCampaignModal';
import FlatButton from 'material-ui/FlatButton';

export default class AddCampaign extends Component {
  constructor(props) {
    super(props);

    this.owner = props.owner;
    this.state = {
      showModal: false,
    };

    this.callback = props.callback;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleClose() {
    this.setState({showModal: false});
  }

  handleOpen() {
    this.setState({showModal: true});
  }

  handleSubmit(campaignData) {
    fetch({
          uri: 'http://localhost:10001/api/marketing/campaigns',
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          json: true,
          body: campaignData
        }
    ).then((res) => {
      console.log(res);
      return this.callback();
    }).catch((error) => {
      console.log(error);
    });
    this.handleClose();
  }

  render() {
    return (
        <div style={{textAlign: "right"}}>
          <FlatButton label="Create Campaign" primary={true} onTouchTap={this.handleOpen}/>
          {this.state.showModal ?
              <CampaignModal owner={this.owner} ads={this.props.ads} onClose={this.handleClose} onSubmit={this.handleSubmit}/>
              : null}
        </div>

    );
  }
}
