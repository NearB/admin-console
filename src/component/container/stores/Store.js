import React, {Component} from 'react';

import DashboardNavBar from '../DashboardNavBar';
import ContentManager from '../ContentManager';

import {
    Grid, Row, Col
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

// TODO: refactor this big ass file
function ModuleChooser(props) {
  return (
    <Grid>
      <Row>
        <StoreCard
          title='Content'
          subtitle='Products & Stock'
          imgUrl={require("../../../img/pub_menu.png")}
        >
          <ContentManager storeId={props.storeId}/>
        </StoreCard>
        <StoreCard
          title='Marketing'
          subtitle='Marketing Campaigns'
          imgUrl={require("../../../img/pub_menu.png")}
        />
        <StoreCard
          title='Brand'
          subtitle='Brand Customization'
          imgUrl={require("../../../img/pub_menu.png")}
        />
        <StoreCard
          title='Analytics'
          subtitle='Store Insights'
          imgUrl={require("../../../img/pub_menu.png")}
        />
      </Row>
    </Grid>
  );
}

import {Card, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class StoreCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false,
      xs: 12,
      sm: 6,
      lg: 4,
    };

    this.handleExpandChange = this.handleExpandChange.bind(this);
    this.handleCardMediaClick = this.handleCardMediaClick.bind(this);
  }

  handleExpandChange(isExpanded) {
    this.setState({
      isExpanded: isExpanded,
      xs: isExpanded ? 12 : 12,
      sm: isExpanded ? 12 : 6,
      lg: isExpanded ? 9 : 4,
    })
  }

  handleCardMediaClick() {
    this.handleExpandChange(!this.state.isExpanded);
  }

  render() {
    const animatedStyles = {
      // transition: 'width 0.2s ease-in-out',
    };
    return (
      <Col xs={this.state.xs} sm={this.state.sm} lg={this.state.lg} style={animatedStyles}>
        <Card
          expanded={this.state.isExpanded}
          onExpandChange={this.handleExpandChange}
        >
          {this.state.isExpanded ?
            <CardHeader
              title={this.props.title}
              subtitle={this.props.subtitle}
              avatar={this.props.imgUrl}
              actAsExpander
            />
            :
            // there's a bug with the actAsExpander property on CardMedia
            <CardMedia
              onClick={this.handleCardMediaClick}
              overlay={<CardTitle title={this.props.title} subtitle={this.props.subtitle}/>}
              style={{cursor: 'pointer'}}
            >
              <img src={this.props.imgUrl}/>
            </CardMedia>
          }
          <CardText expandable>
            {this.props.children}
          </CardText>
        </Card>
      </Col>
    );
  }
}

StoreCard.propTypes = {
  title: React.PropTypes.string,
  subtitle: React.PropTypes.string,
  imgUrl: React.PropTypes.string,
  children: React.PropTypes.node,
};

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
          <ModuleChooser  storeId={this.state.id}/>;
        </div>
      </div>
    );
  }
}
