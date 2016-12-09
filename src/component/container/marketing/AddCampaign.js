import React, {Component} from 'react';

import CampaignModal from '../../presentation/marketing/CampaignModal';
import FlatButton from 'material-ui/FlatButton';

import api from 'services/api';

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
    api.post('marketing/campaigns', campaignData)
      .then((res) => {
        console.log(res);
        return this.callback();
      })
      .catch((error) => {
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
