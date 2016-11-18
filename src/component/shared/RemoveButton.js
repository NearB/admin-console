import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import Fa from 'react-fontawesome';

import api from 'services/api';

export default class RemoveButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    // To avoid row selection
    e.preventDefault();
    e.stopPropagation();

    api.delete(`${this.props.resource}/${this.props.resourceId}`)
      .then((res) => {
        return this.props.onRemove(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <FlatButton
        onClick={this.handleClick}
        icon={<Fa name='times'/>}
      />
    );
  }
}

RemoveButton.propTypes = {
  resource: React.PropTypes.string.isRequired,
  resourceId: React.PropTypes.string.isRequired,
  onRemove: React.PropTypes.func
};

RemoveButton.defaultProps = {
  onRemove: () => {}
};