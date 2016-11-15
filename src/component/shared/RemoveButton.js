import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import Fa from 'react-fontawesome';
import fetch from 'request-promise';

export default class RemoveButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    // To avoid row selection
    e.preventDefault();
    e.stopPropagation();

    fetch({
        uri: `http://localhost:10001/api/${this.props.resource}/${this.props.resourceId}`,
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        json: true,
      }
    )
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