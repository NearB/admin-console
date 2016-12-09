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
    paddingLeft: '15px',
    paddingRight: '15px',
  }
};

function goTo(path) {
  browserHistory.push(path);
}

function ModuleChooser(props) {
  return (
      <div>
        <Row>
          <Col lg={6}>
            <CustomCard
                title='Stores'
                subtitle='Check all your stores'
                imgUrl={'http://dailygenius.com/wp-content/uploads/2016/04/google-maps-new-interface1.jpg'}
            >
              <StoresSmall userId={props.userId}/>
            </CustomCard>
          </Col>
          <Col lg={6}>
          <CustomCard
              title='Warehouse'
              subtitle='Manage your products in a single place'
              imgUrl={'http://www.simmssoftware.com/wordpress/wp-content/uploads/2013/11/simms_replenishment2.jpg'}
          >
            <ProductsSmall userId={props.userId}/>
          </CustomCard>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <CustomCard
                title='Marketing'
                subtitle='Reach more people with Ads and Campaigns'
                imgUrl={'https://images.freecreatives.com/wp-content/uploads/2015/09/Different-marketing-icons-vector.jpg'}
                onClick={() => goTo(`/users/${props.userId}/marketing`)}
            />
          </Col>

          <Col lg={6}>
            <CustomCard
                title='Preferences'
                subtitle='Choose the setup that better fits your needs'
                imgUrl={'https://cdn2.iconfinder.com/data/icons/classic-development-circle/512/system-512.png'}
            >
              <Preferences userId={props.userId}/>
            </CustomCard>
          </Col>
        </Row>
      </div>
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
          <Grid>
            <ModuleChooser userId={this.userId}/>
          </Grid>
        </div>
    );
  }
}
