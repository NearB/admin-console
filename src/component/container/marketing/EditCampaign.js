import React, {Component} from 'react';

import CampaignModal from '../../presentation/marketing/CampaignModal';
import FlatButton from 'material-ui/FlatButton';
import Fa from 'react-fontawesome';

import api from 'services/api';

export default class EditCampaign extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      userId: props.userId != null ? props.userId  : props.params.userId,
      campaign : props.data,
      ads : props.ads
    };

    this.callback = props.onUpdate;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      campaign: nextProps.data,
      ads: nextProps.ads
    })
  }

  handleClick(e) {
    // To avoid row selection
    e.preventDefault();
    e.stopPropagation();
  }

    handleClose() {
    this.setState({showModal: false});
  }

  handleOpen() {
    this.setState({showModal: true});
  }

  handleSubmit(campaignData) {
    console.log(campaignData);
    api.put(`marketing/campaigns/${this.state.campaign._id}`, campaignData)
      .then((res) => {
        return this.callback(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    this.handleClose();
  }

  render() {
    return (
          <FlatButton
              icon={<Fa name='pencil'/>}
              onClick={this.handleOpen}>
            {this.state.showModal ?
                <CampaignModal data={this.state.campaign} userId={this.state.userId} ads={this.state.ads}
                               onClose={this.handleClose} onSubmit={this.handleSubmit}/>
                : null}
          </FlatButton>

    );
  }
}
