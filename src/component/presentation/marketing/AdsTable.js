import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Panel} from 'react-bootstrap';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import RemoveButton from '../../shared/RemoveButton';
import AddAd from '../../container/marketing/AddAd';


export default class AdsTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      owner: props.owner,
      ads: props.ads
    };

    this.updateHandler = props.onUpdate;
    this.handleRowSelection = this.handleRowSelection.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ads: nextProps.ads,
      height: nextProps.ads.length > 6 ? '300px' : ''
    })
  }

  handleRowSelection(selectedAds){
    const adId = this.state.ads[selectedAds[0]]._id;
    console.log(adId);

    browserHistory.push(`/users/${this.state.owner}/ads/${adId}`);
  }

  handleRemove(res) {
    return this.updateHandler();
  }

  render() {
    return (
        <div>
          <Panel style={{marginTop: 20}}>
            <Table onRowSelection={this.handleRowSelection}
                   height={this.state.height}
                   fixedHeader={true}>
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
                  // TableRow has to be present here instead of being a separate component
                  // as a workaround for bug where 'showRowHover' is not being propagated
                  return (
                    <TableRow selectable={true} key={ad._id}>
                      <TableRowColumn>{ad.name}</TableRowColumn>
                      <TableRowColumn>{ad.tags.join(',')}</TableRowColumn>
                      <TableRowColumn>{ad._id}</TableRowColumn>
                      <TableRowColumn>
                        <RemoveButton
                          resource='marketing/ads'
                          resourceId={ad._id}
                          onRemove={this.handleRemove}
                        />
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
