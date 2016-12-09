import React, {Component} from 'react';

import NavedContainer from '../NavedContainer';
import ContentManager from '../ContentManager';
import Orders from '../warehouse/Orders';
import Carts from '../warehouse/Carts';
import CustomCard from '../../shared/CustomCard';

import {
    Grid, Row, Col
} from 'react-bootstrap';

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
      userId: props.userId != null ? props.userId  : props.params.userId,
      storeId: props.storeId != null ? props.storeId  : props.params.storeId
    };

    this.renderContent = this.renderContent.bind(this);
  }

  renderContent() {
    return (
        <div id="page-wrapper" style={styles.root}>
          <Grid>
            <Row>
              <Col lg={4} md={6} sm={6} xs={12}>
                <ModuleChooser storeId={this.state.storeId}/>
              </Col>
              <Col lg={8} md={6} sm={6} xs={12}>
                <Row>
                  <Col lg={6}>
                    <Orders storeId={this.state.storeId}></Orders>
                  </Col>
                  <Col lg={6}>
                    <Carts storeId={this.state.storeId}></Carts>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Grid>
        </div>
    );
  }

  render(){
    return (
        <NavedContainer userId={this.state.userId}
                        content={this.renderContent}/>
    );
  }
}
