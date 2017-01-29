import React, { Component } from 'react';
import { AppBar, TextField, Paper, RaisedButton, Dialog, Divider } from 'material-ui';
import { curry, isEmpty } from 'lodash';

import axios from 'axios';

const mainContainerStyle = {
  width: '75%',
  margin: '0 auto',
  padding: '10px 10px'
};

const handleLookup = curry((ctx, event) => {
  if (isEmpty(ctx.state.lookupKey)) return;

  ctx.setState({
    lookupResults: ''
  });

  axios.get(`/lookup/${ctx.state.lookupKey}`)
    .then(({ data }) => {
      ctx.setState({
        lookupResults: data.data
      });
    })
    .catch(err => {
      console.error('ERROR', err);
    });
});

const handleKeyChanged = curry((ctx, { target }, newValue) => {
  ctx.setState({ lookupKey: target.value });
});

const handleModalClose = curry((ctx, event) => {
  ctx.setState({ dialogOpen: false });
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lookupKey: '',
      dialogOpen: false,
      lookupResults: 'Give it a go!'
    };
  }

  render() {
    return (
      <div>
        <AppBar title="redis.look" iconClassNameRight="muidocs-icon-navigation-expand-more" />
        <Paper style={mainContainerStyle}>
          <TextField hintText="cache key" value={this.state.lookupKey} fullWidth={true} onChange={handleKeyChanged(this)}/>
          <RaisedButton label="lookup" onClick={handleLookup(this)} />
          <Paper zIndex={3} style={{ padding: '10px 10px', 'margin-top': '10px' }}>
            <pre><code>
              {isEmpty(this.state.lookupResults) ? 'no results' : JSON.stringify(this.state.lookupResults, null, 2)}
            </code></pre>
          </Paper>
        </Paper>
      </div>
    );
  }
}