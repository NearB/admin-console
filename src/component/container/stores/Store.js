import React, {Component} from 'react';

import DashboardNavBar from '../DashboardNavBar';
import ContentManager from '../ContentManager';
import CustomCard from '../../shared/CustomCard';

import {
    Grid, Row
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

function ModuleChooser(props) {
  return (
    <Grid>
      <Row>
        <CustomCard
          title='Content'
          subtitle='Products & Stock'
          imgUrl={require("../../../img/pub_menu.png")}
        >
          <ContentManager storeId={props.storeId}/>
        </CustomCard>
        <CustomCard
          title='Marketing'
          subtitle='Marketing Campaigns'
          imgUrl={require("../../../img/pub_menu.png")}
        />
        <CustomCard
          title='Brand'
          subtitle='Brand Customization'
          imgUrl={require("../../../img/pub_menu.png")}
        />
        <CustomCard
          title='Analytics'
          subtitle='Store Insights'
          imgUrl={require("../../../img/pub_menu.png")}
        />
      </Row>
    </Grid>
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
          <ModuleChooser storeId={this.state.id}/>
        </div>
      </div>
    );
  }
}
