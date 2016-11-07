import React, {Component} from 'react';

import DashboardNavBar from '../DashboardNavBar';
import ContentManager from '../ContentManager';

import {
    Row, Col
} from 'react-bootstrap';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto',
    marginBottom: 24,
  },
};

import {Card, CardMedia, CardTitle} from 'material-ui/Card';

const STORE_MODULES = {content: 'Content', marketing: 'Marketing', brand: 'Brand', analytics: 'Analytics'};

class ModuleChooser extends Component {
  constructor(props) {
    super(props);

    this.choose = props.onChoice;

    this._content = this._content.bind(this);
    this._marketing = this._marketing.bind(this);
    this._brand = this._brand.bind(this);
    this._analytics = this._analytics.bind(this);
  }

  _content() {
    this.choose(STORE_MODULES.content);
  }

  _marketing() {
    this.choose(STORE_MODULES.marketing);
  }

  _brand() {
    this.choose(STORE_MODULES.brand);
  }

  _analytics() {
    this.choose(STORE_MODULES.analytics);
  }

  render() {
    return (<div>
          <Row>
            <Col lg={3}>
              <Card onClick={this._content}>
                <CardMedia overlay={<CardTitle title={STORE_MODULES.content} subtitle="Marketing Campaigns"/>}>
                  <img src={require("../../img/pub_menu.png")}/>
                </CardMedia>
              </Card>
            </Col>
            <Col lg={3} onClick={this._marketing}>
              <Card>
                <CardMedia overlay={<CardTitle title={STORE_MODULES.marketing} subtitle="Marketing Campaigns"/>}>
                  <img src={require("../../img/pub_menu.png")}/>
                </CardMedia>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg={3} onClick={this._brand}>
              <Card>
                <CardMedia overlay={<CardTitle title={STORE_MODULES.brand} subtitle="Brand Customization"/>}>
                  <img src={require("../../img/pub_menu.png")}/>
                </CardMedia>
              </Card>
            </Col>
            <Col lg={3} onClick={this._analytics}>
              <Card>
                <CardMedia overlay={<CardTitle title={STORE_MODULES.analytics} subtitle="Product Insights"/>}>
                  <img src={require("../../img/pub_menu.png")}/>
                </CardMedia>
              </Card>
            </Col>
          </Row>
        </div>
    );
  }
}


export default class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.params.productId,
      showModule: ''
    };

    this.chooseModule = this.chooseModule.bind(this);
  }

  chooseModule(module) {
    this.setState({showModule: module});
  }

  render() {
    return (
        <div id="wrapper">
          <DashboardNavBar user={this.state.user}/>
          <div id="page-wrapper" style={styles.root}>

          </div>
        </div>

    );
  }
}
