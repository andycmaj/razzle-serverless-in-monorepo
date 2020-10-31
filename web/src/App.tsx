import { Route, Switch } from 'react-router-dom';
import Home from './home';
import Protected from './protected';

import React from 'react';
const App = () => {
  return (
    <>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/protected" component={Protected} />
      </Switch>
    </>
  );
};

export default App;
