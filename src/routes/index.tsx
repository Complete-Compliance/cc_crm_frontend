import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import Recover from '../pages/Recover';
import Profile from '../pages/Profile';
import Leads from '../pages/Leads';
import Lead from '../pages/Lead';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />

    <Route path="/recover" component={Recover} isPrivate adminOnly />
    <Route path="/profile" component={Profile} isPrivate />
    <Route path="/home" component={Home} isPrivate />
    <Route path="/leads" component={Leads} isPrivate />
    <Route path="/lead/:id" component={Lead} isPrivate />
  </Switch>
);

export default Routes;
