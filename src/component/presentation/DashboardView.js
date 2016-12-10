import React, {Component} from 'react';

import Preferences from '../container/accounts/Preferences'
import StoresSmall from '../container/stores/StoresSmall'
import ProductsSmall from '../container/warehouse/ProductsSmall'
import {
    Grid, Row, Col
} from 'react-bootstrap';

import CustomCard from '../shared/CustomCard';
import {browserHistory} from 'react-router';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  padded: {
    padding: '15px',
  }
};

function goTo(path) {
  browserHistory.push(path);
}

function ModuleChooser(props) {
  return (
    <Grid fluid>
      <Row>
        <Col lg={6} style={styles.padded}>
          <CustomCard
              title='Stores'
              subtitle='Check all your stores'
              imgUrl={require('../../img/stores.jpg')}
          >
            <StoresSmall userId={props.userId}/>
          </CustomCard>
        </Col>
        <Col lg={6} style={styles.padded}>
          <CustomCard
              title='Warehouse'
              subtitle='Manage your products in a single place'
              imgUrl={require('../../img/warehouse.jpg')}
          >
            <ProductsSmall userId={props.userId}/>
          </CustomCard>
        </Col>
      </Row>
      <Row>
        <Col lg={6} style={styles.padded}>
          <CustomCard
              title='Marketing'
              subtitle='Reach more people with Ads and Campaigns'
              imgUrl={require('../../img/marketing.jpg')}
              onClick={() => goTo(`/users/${props.userId}/marketing`)}
          />
        </Col>

        <Col lg={6} style={styles.padded}>
          <CustomCard
              title='Preferences'
              subtitle='Choose the setup that better fits your needs'
              imgUrl={require('../../img/settings_gears-512.jpg')}
          >
            <Preferences userId={props.userId}/>
          </CustomCard>
        </Col>
      </Row>
    </Grid>
  );
}

export default class NewDashboardView extends Component {
  constructor(props){
    super(props);
    this.userId = props.userId != null ? props.userId : props.params.userId;
  }

  render() {
    return (
      <div id="page-wrapper" style={styles.padded}>
        <ModuleChooser userId={this.userId}/>
      </div>
    );
  }
}
