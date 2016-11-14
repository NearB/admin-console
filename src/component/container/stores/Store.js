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

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(module) {
    return () => {
      this.choose(module);
    }
  }

  render() {
    return (<div>
          <Row>
            <Col lg={3}>
              <Card onClick={this.handleClick(STORE_MODULES.content)}>
                <CardMedia overlay={<CardTitle title={STORE_MODULES.content} subtitle="Marketing Campaigns"/>}>
                  <img src={require("../../../img/pub_menu.png")}/>
                </CardMedia>
              </Card>
            </Col>
            <Col lg={3} onClick={this.handleClick(STORE_MODULES.marketing)}>
              <Card>
                <CardMedia overlay={<CardTitle title={STORE_MODULES.marketing} subtitle="Marketing Campaigns"/>}>
                  <img src={require("../../../img/pub_menu.png")}/>
                </CardMedia>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg={3} onClick={this.handleClick(STORE_MODULES.brand)}>
              <Card>
                <CardMedia overlay={<CardTitle title={STORE_MODULES.brand} subtitle="Brand Customization"/>}>
                  <img src={require("../../../img/pub_menu.png")}/>
                </CardMedia>
              </Card>
            </Col>
            <Col lg={3} onClick={this.handleClick(STORE_MODULES.analytics)}>
              <Card>
                <CardMedia overlay={<CardTitle title={STORE_MODULES.analytics} subtitle="Store Insights"/>}>
                  <img src={require("../../../img/pub_menu.png")}/>
                </CardMedia>
              </Card>
            </Col>
          </Row>
        </div>
    );
  }
}


export default class Store extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.params.storeId,
      showModule: ''
    };

    this.handleChoice = this.handleChoice.bind(this);
  }

  handleChoice(module) {
    this.setState({showModule: module});
  }

  render() {
    return (
        <div id="wrapper">
          <DashboardNavBar user={this.state.user}/>
          <div id="page-wrapper" style={styles.root}>
            {(() => {
              switch (this.state.showModule) {
                case STORE_MODULES.content:
                  return <ContentManager storeId={this.state.id}/>;
                case STORE_MODULES.marketing:
                  return <ContentManager storeId={this.state.id}/>;
                case STORE_MODULES.brand:
                  return <ContentManager storeId={this.state.id}/>;
                case STORE_MODULES.analytics:
                  return <ContentManager storeId={this.state.id}/>;
                default:
                  return <ModuleChooser onChoice={this.handleChoice}/>;
              }
            })()}
          </div>
        </div>

    );
  }
}
