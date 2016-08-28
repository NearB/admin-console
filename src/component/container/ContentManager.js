import React, {Component} from 'react';


import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import fetch from 'request-promise';

const iconButtonElement = (
    <IconButton touch={true} tooltip="more" tooltipPosition="bottom-left">
      <MoreVertIcon color={grey400}/>
    </IconButton>
);

const rightIconMenu = (
    <IconMenu iconButtonElement={iconButtonElement}>
      <MenuItem>Hide</MenuItem>
      <MenuItem>Edit</MenuItem>
      <MenuItem>Delete</MenuItem>
    </IconMenu>
);

export default class ContentManager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      storeId: props.storeId,
      content: []
    };

    this._fetchContent = this._fetchContent.bind(this);
  }

  componentDidMount() {
    this._fetchContent();
  }

  _fetchContent() {
    fetch({
          uri: `http://localhost:10001/api/stores/${this.state.storeId}/stock`,
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          json: true
        }
    ).then((res) => {
      console.log(res);
      this.setState({content: res.result})
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
        <List>
          <Subheader>Store Content</Subheader>
          {this.state.content.map((item) => {
            return (
                <ListItem
                    leftAvatar={<Avatar src={item.img}/>}
                    rightIconButton={rightIconMenu}
                    primaryText={item.name}
                    secondaryText={`$${item.price} - ${item.description}`}
                    secondaryTextLines={2}
                />);
          })}
        </List>
    );
  }
}
