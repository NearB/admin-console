import React, {Component} from 'react';

import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import {grey400} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {Panel} from 'react-bootstrap';

import api from 'services/api';

const iconButtonElement = (
    <IconButton touch={true}>
      <MoreVertIcon color={grey400}/>
    </IconButton>
);


export default class ProductContainerList extends Component {
  constructor(props) {
    super(props);

    this.name = props.name;
    this.dataUrl = props.dataUrl;
    this.doneLabel = props.doneLabel;
    this.cancelLabel = props.cancelLabel;
    this.handleDone = props.onDone;
    this.handleCancel = props.onCancel;
    this.handleItemSelected = props.onItemSelected;

    this.state = {
      containers: []
    };

    this._doneWrapper = this._doneWrapper.bind(this);
    this._cancelWrapper = this._cancelWrapper.bind(this);
    this._populateContainers = this._populateContainers.bind(this);
    this._calculateTotal = this._calculateTotal.bind(this);
    this._calculateItemsTotal = this._calculateItemsTotal.bind(this);
    this.handleProductsUpdate = this.handleProductsUpdate.bind(this);
  }

  componentDidMount() {
    this._populateContainers();
  }

  _doneWrapper(container){
    this.handleDone(container)
        .then(res => {
          if (res.data != null){
            this._populateContainers();
          } else {
            console.log(res);
          }
        })
        .catch(error => {
          console.log(error);
        });
  }

  _cancelWrapper(container){
    this.handleCancel(container)
        .then(res => {
          if (res.data != null){
            this._populateContainers();
          } else {
            console.log(res);
          }
        })
        .catch(error => {
          console.log(error);
        });
  }


  _populateContainers() {
    return api(this.dataUrl)
        .then((res) => {
          setTimeout(this._populateContainers, 1000);
          this.setState({containers: res.data})
        })
        .catch((error) => {
          console.log(error);
        });
  }

  handleProductsUpdate(){
    return this._fetchData();
  }

  _calculateTotal(products){
    return products.map(a=> +a.price * +a.quantity).reduce((a, b)=> a+b, 0);
  }

  _calculateItemsTotal(products){
    return  products.map(a => +a.quantity).reduce((a, b)=> a+b, 0);
  }

  render() {
    return (
        <Panel header={this.name}>
          <List>
            {this.state.containers && this.state.containers.map((container) => {
              //if (container.products.length === 0) return ; //eslint-disable-line array-callback-return
              return (
                  <ListItem
                      leftAvatar={<Avatar src="https://scontent-gru2-1.xx.fbcdn.net/v/t1.0-1/p50x50/15822965_10208239770407633_736879730667886548_n.jpg?oh=8f5c27633d23058e59a68bcc7b5df19d&oe=598F27AC" alt="Ale Marra" title="Ale Marra" />}
                      rightIconButton={
                        //FIXME try to use <Fa name='check'/> instead
                        <IconMenu iconButtonElement={iconButtonElement}>
                          <MenuItem onTouchTap={()=>{return this._doneWrapper(container);}}>{this.doneLabel}</MenuItem>
                          <MenuItem onTouchTap={()=>{return this._cancelWrapper(container);}}>{this.cancelLabel}</MenuItem>
                        </IconMenu>
                      }
                      primaryText={container.status}
                      secondaryText={`Client: Ale - Total: $${this._calculateTotal(container.products)}`}
                      secondaryTextLines={2}
                      key={container._id}
                      onTouchTap={this.handleItemSelected.bind(this, container)}
                  />);
            })}
          </List>
        </Panel>

    );
  }
}
