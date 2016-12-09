import React, { Component } from 'react';
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { Col } from 'react-bootstrap';
import _ from 'lodash';

export default class CustomCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false,
      xs: 12,
      sm: 12,
      lg: 12,
    };

    this.handleExpandChange = this.handleExpandChange.bind(this);

    // Reuse card with multiple setups (child node & redirect)
    this.handleCardMediaClick = props.onClick == null ? this.handleCardClick.bind(this) : props.onClick;
  }

  handleExpandChange(isExpanded) {
    this.setState({
      isExpanded: isExpanded,
      xs: isExpanded ? 12 : 12,
      sm: isExpanded ? 12 : 12,
      lg: isExpanded ? 12 : 12,
    })
  }

  handleCardClick() {
    this.handleExpandChange(!this.state.isExpanded);
  }

  render() {
    // don't even try to understand what's going on below :D

    const transitionTime = 300;
    // const transitionTime = 15000;  // used for debugging the animation
    const animatedStyle = {
      transition: `all ${transitionTime}ms ease-out`,
    };

    const cardMediaStyle = _.defaults({
      position: 'absolute',
      top: '0',
      cursor: 'pointer',
      boxSizing: 'border-box',
      whiteSpace: 'nowrap',
    }, animatedStyle);

    const cardMediaImgStyle = _.defaults({
      maxWidth: '600px',
      height: '327px',
    }, animatedStyle);

    const cardMediaOverlayContentStyle = _.defaults({
      whiteSpace: 'nowrap',
      verticalAlign: 'top',
      display: 'inline-block',
      padding: '16px',
      backgroundColor: 'rgba(0, 0, 0, 0.541176)',
      paddingLeft: '16px',
      height: '88px',
    }, animatedStyle);

    const cardTitleTitleStyle = _.defaults({
      fontWeight: '600',
      fontSize: '24px',
      color: 'rgba(255, 255, 255, 0.870588)',
    }, animatedStyle);

    const cardTitleSubitleStyle = _.defaults({
      fontWeight: '600',
      fontSize: '13px',
      color: 'rgba(255, 255, 255, 0.541176)',
    }, animatedStyle);

    if (this.state.isExpanded) {
      _.merge(cardMediaStyle, {
        padding: '16px',
        width: '100%'
      });
      _.merge(cardMediaImgStyle, {
        borderRadius: '50%',
        minWidth: 'initial',
        maxWidth: '40px',
        height: '40px',
        width: '40px',
        marginRight: '16px',
        WebkitUserSelect: 'none',
        backgroundColor: 'rgb(188, 188, 188)',
      });
      _.merge(cardMediaOverlayContentStyle, {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        paddingLeft: '72px',
        height: '72px',
      });
      _.merge(cardTitleTitleStyle, {
        fontSize: '15px',
        lineHeight: '21px',
        color: 'rgba(0, 0, 0, 0.870588)',
      });
      _.merge(cardTitleSubitleStyle, {
        fontSize: '13px',
        color: 'rgba(0, 0, 0, 0.541176)',
      });
    }

    return (
      <Col xs={this.state.xs} sm={this.state.sm} lg={this.state.lg} style={animatedStyle}>
        <Card
          expanded={this.state.isExpanded}
          onExpandChange={this.handleExpandChange}
          style={{position: 'relative', minHeight: '327px'}}
        >
          // there's a bug with the actAsExpander property on CardMedia
          <CardMedia
            onClick={this.handleCardMediaClick}
            style={cardMediaStyle}
            overlay={<CardTitle title={this.props.title} subtitle={this.props.subtitle}
                                style={{padding: 0}} titleStyle={cardTitleTitleStyle}
                                subtitleStyle={cardTitleSubitleStyle} />}
            overlayContentStyle={cardMediaOverlayContentStyle}
          >
            <img src={this.props.imgUrl} style={cardMediaImgStyle} />
          </CardMedia>
          <CardText expandable style={{paddingTop: '72px'}}>
            {this.props.children}
          </CardText>
        </Card>
      </Col>
    );
  }
}

CustomCard.propTypes = {
  title: React.PropTypes.string,
  subtitle: React.PropTypes.string,
  imgUrl: React.PropTypes.string,
  children: React.PropTypes.node,
  onClick: React.PropTypes.func
};