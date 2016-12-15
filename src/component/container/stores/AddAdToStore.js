import React, {Component} from 'react';

import AddAdToStoreModal from '../../presentation/marketing/AddAdToStoreModal';
import FlatButton from 'material-ui/FlatButton';

import api from 'services/api';

export default class AddAdToStore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      ads: [],
    };

    this.callback = props.onUpdate;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  componentDidMount() {
    this._fetchProducts();
  }

  _fetchProducts() {
    return api('marketing/ads')
      .then((res) => {
        if (res.err == null){
          this.setState({ads: res.data})
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
    return api.put(`stores/${this.props.storeId}/ads`, this.props.current.concat(data))
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
        <FlatButton label="Add Ad" primary={true} onTouchTap={this.handleOpen}/>
        {this.state.showModal ?
          <AddAdToStoreModal onClose={this.handleClose} onSubmit={this.handleSubmit}
                        ads={this.state.ads}  existing={this.props.current} />
          : null}
      </div>
    );
  }
}

AddAdToStore.propTypes = {
  storeId: React.PropTypes.string.isRequired,
  current: React.PropTypes.array.isRequired
};

