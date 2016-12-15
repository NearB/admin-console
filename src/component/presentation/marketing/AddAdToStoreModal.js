import React, {Component} from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

export default class AddAdToStoreModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedAd: null,
    };

    this.handleClose = props.onClose;
    this.handleSubmit = props.onSubmit;
    this.handleClick = this.handleClick.bind(this);
    this._doSubmit = this._doSubmit.bind(this);

  }

  handleClick(ad) {
    console.log("Selected ad", ad);
    this.setState({
      selectedAd: ad,
    });
  }

  _doSubmit(){
    if (this.state.selectedAd == null){
      return;
    }
    this.handleSubmit(this.state.selectedAd._id);
  }

  render() {
    const modalActions = [
      <FlatButton label='Cancel' primary onTouchTap={this.handleClose}/>,
      <FlatButton label='Add' primary
                  onTouchTap={this._doSubmit}/>,
    ];

    return (
        <Dialog title="Available Ads" actions={modalActions} modal={true} open={true} autoScrollBodyContent={true}>
          <List>
            {this.props.ads
                .filter(c => !this.props.existing.map(e=> e._id).includes(c._id))
                .map((ad) => {
                  const back = (this.state.selectedAd != null && this.state.selectedAd._id == ad._id) ? '#F9E1B0' : '#FFFFFF';
              return (
                  <ListItem key={ad._id}
                            style={{backgroundColor: back}}
                            leftAvatar={<Avatar src={ad.img}/>}
                            onClick={this.handleClick.bind(this, ad)}
                            primaryText={ad.name}
                            secondaryText={ad.tags}
                  />);
            })}
          </List>
        </Dialog>
    );
  }
}

AddAdToStoreModal.propTypes = {
  ads: React.PropTypes.array.isRequired,
  existing: React.PropTypes.array.isRequired
};
