import React, {Component} from 'react';


import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Fa from 'react-fontawesome';

import api from 'services/api';

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
      content: [],
      products: [],
      selectedProductId: '',
      showModal: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this._fetchContent();
    this._fetchProducts();
  }

  _fetchContent() {
    return api(`stores/${this.state.storeId}/products`)
      .then((res) => {
        console.log(res);
        this.setState({content: res.data})
      })
      .catch((error) => {
        console.log(error);
      });
  }

  _fetchProducts() {
    return api('products')
      .then((res) => {
        this.setState({products: res.data})
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleClick(productId) {
    return () => {
      const stockData = {
        productId,
        price: 70,
        stock: 100
      };

      return api.put(`stores/${this.state.storeId}/products`, stockData)
        .then((res) => {
          console.log(res);
          return this._fetchContent();
        })
        .catch((error) => {
          console.log(error);
        });
      // this.setState({
      //   selectedProductId: productId,
      //   showModal: true
      // });
    }
  }

  render() {
    const ellipsis = {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    };
    return (
      <div>
        <List>
          {this.state.content.map((item) => {
            if (!item.product) return ; //eslint-disable-line array-callback-return
            return (
              <ListItem
                leftAvatar={<Avatar src={item.product.img}/>}
                rightIconButton={rightIconMenu}
                primaryText={item.product.name}
                secondaryText={`$${item.price} - ${item.product.description}`}
                secondaryTextLines={2}
              />);
          })}
        </List>
        <List>
          <Subheader style={ellipsis}><b>Products</b><i> - WIP: clicking the plus button will add the product to the store with default price and stock</i></Subheader>
          {this.state.products.map((product) => {
            return (
              <ListItem
                leftAvatar={<Avatar src={product.img}/>}
                rightIconButton={
                  <FlatButton
                    onClick={this.handleClick(product._id)}
                    icon={<Fa name='plus'/>}
                  />
                }
                primaryText={product.name}
                secondaryText={product.description}
              />);
          })}
        </List>
      </div>
    );
  }
}
