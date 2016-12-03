import React, {Component} from 'react';

import DashboardNavBar from '../DashboardNavBar';
import ContentManager from '../ContentManager';
import Orders from '../warehouse/Orders';
import Carts from '../warehouse/Carts';
import CustomCard from '../../shared/CustomCard';

import {
    Grid, Row, Col, Well
} from 'react-bootstrap';

import {List, ListItem} from 'material-ui/List';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

function ModuleChooser(props) {
  return (
      <div>
        <Row>
          <CustomCard
            title='Content'
            subtitle='Products & Stock'
            imgUrl={require("../../../img/pub_menu.png")}
          >
            <ContentManager storeId={props.storeId}/>
          </CustomCard>
        </Row>
        <Row>
          <CustomCard
              title='Marketing'
              subtitle='Marketing Campaigns'
              imgUrl={require("../../../img/pub_menu.png")}
          />
        </Row>
      </div>
           //  TODO enable this once we actually have something to show, otherwise
           //  lets optimize for current features
           // <Row>
           // <CustomCard
           // title='Brand'
           // subtitle='Brand Customization'
           // imgUrl={require("../../../img/pub_menu.png")}
           // />
           // <CustomCard
           // title='Analytics'
           // subtitle='Store Insights'
           // imgUrl={require("../../../img/pub_menu.png")}
           // />
           // </Row>
  );
}


export default class Store extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.params.storeId,
    };
  }

  render() {
    return (
      <div id="wrapper">
        <DashboardNavBar user={this.state.user}/>
        <div id="page-wrapper" style={styles.root}>
          <Grid>
            <Row>
              <Col lg={4} md={6} sm={6} xs={12}>
                <ModuleChooser storeId={this.state.id}/>
              </Col>
              <Col lg={8} md={6} sm={6} xs={12}>
                <Row>
                  <Col lg={6}>
                    <Orders storeId={this.state.id}></Orders>
                  </Col>
                  <Col lg={6}>
                    <Carts storeId={this.state.id}></Carts>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}
