import React, {Component} from 'react';
import fetch from 'request-promise';

import StoresTable from '../presentation/StoresTable';
import Fa from 'react-fontawesome';
import {Panel} from 'react-bootstrap';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import DashboardNavBar from './DashboardNavBar';

import {
    Row, Col
} from 'react-bootstrap';

const tilesData = [
  {
    img: 'images/grid-list/00-52-29-429_640.jpg',
    title: 'Breakfast',
    author: 'jill111',
  },
  {
    img: 'images/grid-list/burger-827309_640.jpg',
    title: 'Tasty burger',
    author: 'pashminu',
  },
  {
    img: 'images/grid-list/camera-813814_640.jpg',
    title: 'Camera',
    author: 'Danson67',
  },
  {
    img: 'images/grid-list/morning-819362_640.jpg',
    title: 'Morning',
    author: 'fancycrave1',
  },
  {
    img: 'images/grid-list/hats-829509_640.jpg',
    title: 'Hats',
    author: 'Hans',
  },
  {
    img: 'images/grid-list/honey-823614_640.jpg',
    title: 'Honey',
    author: 'fancycravel',
  },
  {
    img: 'images/grid-list/vegetables-790022_640.jpg',
    title: 'Vegetables',
    author: 'jill111',
  },
  {
    img: 'images/grid-list/water-plant-821293_640.jpg',
    title: 'Water plant',
    author: 'BkrmadtyaKarki',
  },
];

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 500,
    overflowY: 'auto',
    marginBottom: 24,
  },
};
export default class Store extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.storeId
    };

    this._fetchStore = this._fetchStore.bind(this);
    this.handleStoresUpdate = this.handleStoresUpdate.bind(this);
  }

  componentDidMount() {
    this._fetchStore();
  }

  handleStoresUpdate(){
    return this._fetchStore();
  }

  _fetchStore() {
    return fetch({
          uri: `http://localhost:10001/api/stores/${this.state.id}`,
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          json: true
        }
    ).then((res) => {
      console.log(res);
      this.setState({store: res.result})
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
    <div className="container">
      <DashboardNavBar user={this.state.user}/>
      <div id="page-wrapper" className="container-fluid">
        <Row>
          <Col lg={8}>
            <div style={styles.root}>
              <GridList
                  cellHeight={200}
                  style={styles.gridList}
              >
                <Subheader>December</Subheader>
                {tilesData.map((tile) => (
                    <GridTile
                        key={tile.img}
                        title={tile.title}
                    >
                      <img src={tile.img} />
                    </GridTile>
                ))}
              </GridList>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={4}>
            <Panel style={{marginTop: 20}} header={<i><Fa name="long-arrow-right" /> Donut Chart</i>}>
              <div id="morris-donut-chart"></div>
              <div className="text-right">
                <a href="#">View Details <i className="fa fa-arrow-circle-right"></i></a>
              </div>
            </Panel>
          </Col>
          <Col lg={4}>
            <Panel style={{marginTop: 20}} header={<i><Fa name="clock-o" /> Tasks Panel</i>}>
              <div className="list-group">
                <a href="#" className="list-group-item">
                  <span className="badge">23 minutes ago</span>
                  <i className="fa fa-fw fa-truck"></i> Order 392 shipped
                </a>
              </div>
              <div className="text-right">
                <a href="#">View All Activity <i className="fa fa-arrow-circle-right"></i></a>
              </div>
            </Panel>
          </Col>
        </Row>
      </div>
    </div>

    );
  }
}
