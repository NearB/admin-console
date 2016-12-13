import React, {Component} from 'react';
import _s from 'underscore.string';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';


export default class AddProductToStoreModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      stepIndex: 0,
      selectedProduct: null,
      stockData: {},
      disableSubmit: true,
    };

    this.handleClose = props.onClose;
    this.handleSubmit = props.onSubmit;
    this.getStepContent = this.getStepContent.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleStockDataUpdate = this.handleStockDataUpdate.bind(this);
    this._toogleSubmit = this._toogleSubmit.bind(this);
  }

  handleClick(product) {
    this.setState({
      selectedProduct: product,
      stockData: {
        productId: product._id,
      },
      stepIndex: 1,
    });
  }

  handleStockDataUpdate(prop, evt, value) {
    const stockData = this.state.stockData;
    stockData[prop] = value;
    this.setState({ stockData });
    this._toogleSubmit();
  }

  _toogleSubmit() {
    const disable = _s.isBlank(this.state.stockData.productId) ||
                    _s.isBlank(this.state.stockData.price) ||
                    _s.isBlank(this.state.stockData.stock);

    this.setState({
      disableSubmit: disable,
    });
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <List>
            {/* a search to filter the products might look nice here */}
            {this.props.products.map((product) => {
              return (
                <ListItem key={product._id}
                          leftAvatar={<Avatar src={product.img}/>}
                          onClick={this.handleClick.bind(this, product)}
                          primaryText={product.name}
                          secondaryText={product.description}
                />);
            })}
          </List>
      );
      case 1:
        return (
          <div>
            <h4><Avatar src={this.state.selectedProduct.img}/>{this.state.selectedProduct.name}</h4>
            <h6><i>TODO: darle fachita</i></h6>
            <TextField
              floatingLabelText="Price"
              hintText="40"
              onChange={this.handleStockDataUpdate.bind(this, 'price')}
              value={this.state.stockData.price || ''}
            />
            <br />
            <TextField
              floatingLabelText="Stock"
              hintText="10"
              onChange={this.handleStockDataUpdate.bind(this, 'stock')}
              value={this.state.stockData.stock || ''}
            />
            <br />
          </div>
        );
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }


  render() {
    const { stepIndex, selectedProduct } = this.state;
    const lastButtonLabel = selectedProduct ? 'Done' : 'Next';

    const modalActions = [
      <FlatButton label='Cancel' primary onTouchTap={this.handleClose}/>,
      <FlatButton label='Back' primary disabled={stepIndex === 0} onTouchTap={() => this.setState({ stepIndex: stepIndex - 1 })} />,
      <FlatButton label={lastButtonLabel} primary disabled={!selectedProduct || this.state.disableSubmit} onTouchTap={this.handleSubmit.bind(this, this.state.stockData)} />,
    ];

    return (
        <Dialog title="Available products" actions={modalActions} modal={true} open={true} autoScrollBodyContent={true}>
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>Select the product</StepLabel>
            </Step>
            <Step>
              <StepLabel>Set price and stock</StepLabel>
            </Step>
          </Stepper>
          {this.getStepContent(stepIndex)}
        </Dialog>
    );
  }
}

AddProductToStoreModal.propTypes = {
  products: React.PropTypes.array.isRequired
};
