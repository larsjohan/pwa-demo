import React, {FC} from 'react';
import AppLayout from './framework/AppLayout';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import HomeView from './views/HomeView';
import AddFenceView from './views/AddFenceView';
import DisplayFenceView from './views/DisplayFenceView';

const App: FC = () => {

  if (!('geolocation' in navigator)){
    return (<p>This device does not support geolocation</p>);
  }


  return (
    <BrowserRouter>
      <AppLayout>
        <Switch>

          <Route path="/home">
            <HomeView/>
          </Route>

          <Route path="/fence/add">
            <AddFenceView/>
          </Route>

          <Route path="/fence/:fenceId">
            <DisplayFenceView/>
          </Route>

          <Route path="*">
            <Redirect to="/home"/>
          </Route>

        </Switch>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
