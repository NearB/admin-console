import React, {Component} from 'react';

import AddCampaignToStoreModal from '../../presentation/marketing/AddCampaignToStoreModal';
import FlatButton from 'material-ui/FlatButton';

import api from 'services/api';

export default class AddCampaignToStore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      campaigns: [],
    };

    this.callback = props.onUpdate;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  componentDidMount() {
    this._fetchCampaigns();
  }

  _fetchCampaigns() {
    return api('marketing/campaigns')
      .then((res) => {
        if (res.err == null){
          this.setState({campaigns: res.data})
        } else {
          console.log(res.err);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleClose() {
    this.setState({showModal: false});
  }

  handleOpen() {
    this.setState({showModal: true});
  }

  handleSubmit(data) {
    return api.put(`stores/${this.props.storeId}/campaigns`, this.props.current.concat(data))
      .then((res) => {
        this.handleClose();
        return this.callback();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div style={{textAlign: "right"}}>
        <FlatButton label="Add Campaign" primary={true} onTouchTap={this.handleOpen}/>
        {this.state.showModal ?
          <AddCampaignToStoreModal onClose={this.handleClose} onSubmit={this.handleSubmit}
                              campaigns={this.state.campaigns} existing={this.props.current}/>
          : null}
      </div>
    );
  }
}

AddCampaignToStore.propTypes = {
  storeId: React.PropTypes.string.isRequired,
  current: React.PropTypes.array.isRequired
};

