import React, {Component} from 'react';

import {browserHistory} from 'react-router';

import {Panel} from 'react-bootstrap';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import AddAd from '../../container/marketing/AddAd';
import Fa from 'react-fontawesome';

export default class AdsTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      owner: props.owner,
      ads: props.ads
    };

    this.updateHandler = props.onUpdate;
    this.goToAd = this.goToAd.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ads: nextProps.ads})
  }

  goToAd(selectedAds){
    const adId = this.state.ads[selectedAds[0]]._id;
    console.log(adId);

    browserHistory.push(`/users/${this.state.owner}/ads/${adId}`);
  }

  removeStore(adId){
    console.log(adId);

    // browserHistory.push(`/users/${this.state.owner}/stores/${storeId}`);
  }

  render() {
    return (
        <div>
          <Panel style={{marginTop: 20}}>
            <Table onRowSelection={this.goToAd}>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow style={{textAlign: "center"}}>
                  <TableHeaderColumn>Ad</TableHeaderColumn>
                  <TableHeaderColumn>Tags</TableHeaderColumn>
                  <TableHeaderColumn>Id</TableHeaderColumn>
                  <TableHeaderColumn></TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false} showRowHover={true}>
                {this.state.ads.map((ad) => {
                  {/*// TableRow has to be present here instead of being a separate component*/}
                  {/*// as a workaround for bug where 'showRowHover' is not being propagated*/}
                  return (
                      <TableRow selectable={true} key={ad._id}>
                        <TableRowColumn>{ad.name}</TableRowColumn>
                        <TableRowColumn>{ad.tags.join(',')}</TableRowColumn>
                        <TableRowColumn>{ad._id}</TableRowColumn>
                          <TableRowColumn>
                            <a onClick={this.removeStore.bind(this, ad._id)}>
                              <Fa name='times'/>
                            </a>
                          </TableRowColumn>
                      </TableRow>
                  )
                })}
              </TableBody>
            </Table>
            <AddAd callback={this.updateHandler}/>
          </Panel>
        </div>
    );
  }
}
