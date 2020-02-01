import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import DevUpdate from './pages/DevUpdate';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/dev/:_id" component={DevUpdate} />
      </Switch>
    </BrowserRouter>
  );
}