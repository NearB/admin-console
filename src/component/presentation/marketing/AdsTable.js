import React, {Component} from 'react';
import {Panel} from 'react-bootstrap';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Avatar from 'material-ui/Avatar';

import RemoveButton from '../../shared/RemoveButton';
import AddAd from '../../container/marketing/AddAd';
import Fa from 'react-fontawesome';

export default class AdsTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: props.userId != null ? props.userId  : props.params.userId,
      ads: props.ads
    };

    this.updateHandler = props.onUpdate;
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ads: nextProps.ads,
      height: nextProps.ads.length > 6 ? '300px' : ''
    })
  }

  handleRemove(res) {
    return this.updateHandler();
  }

  render() {
    return (
        <div>
          <Panel style={{marginTop: 20}}>
            <Table height={this.state.height}
                   fixedHeader={true}>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow style={{textAlign: "center"}}>
                  <TableHeaderColumn></TableHeaderColumn>
                  <TableHeaderColumn>Ad</TableHeaderColumn>
                  <TableHeaderColumn>
                    <Fa name="tags" fixedWidth={true}/> Tags
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    <Fa name="bars" fixedWidth={true}/> Description
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    <Fa name="key" fixedWidth={true}/> Id
                  </TableHeaderColumn>
                  <TableHeaderColumn></TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false} showRowHover={true}>
                {this.state.ads.map((ad) => {
                  // TableRow has to be present here instead of being a separate component
                  // as a workaround for bug where 'showRowHover' is not being propagated
                  return (
                    <TableRow selectable={false} key={ad._id}>
                      <TableRowColumn  style={{textAlign: "center"}}><Avatar src={ad.img}/></TableRowColumn>
                      <TableRowColumn>{ad.name}</TableRowColumn>
                      <TableRowColumn>{ad.tags.join(',')}</TableRowColumn>
                      <TableRowColumn>{ad.description}</TableRowColumn>
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
            <AddAd userId={this.state.userId} callback={this.updateHandler}/>
          </Panel>
        </div>
    );
  }
}
