import React from 'react';
import PrivateRoutes from './privateRoutes';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './views/pages/Login';
import Teste from './views/pages/Teste';
import Home from './views/pages/Home';
import Schedules from './views/pages/Schedules';
import MedRecords from './views/pages/MedRecords';
import Patient from './views/pages/Patient';
import Pro from './views/pages/Pro';
import Config from './views/pages/Config';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/teste" component={Teste} />
        <PrivateRoutes path="/home" component={Home} />
        <PrivateRoutes path="/schedule" component={Schedules} />
        <PrivateRoutes path="/medrecord" component={MedRecords} />
        <PrivateRoutes path="/patient" component={Patient} />
        <PrivateRoutes path="/pro" component={Pro} />
        <PrivateRoutes path="/config" component={Config} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;