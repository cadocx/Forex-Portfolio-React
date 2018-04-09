import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Dashboard from './Containers/Dashboard/Dashboard';
import WatchList from './Containers/Watchlist/WatchList';

export default () => {
    return (
        <Switch>
             <Route path="/" exact render={() => <Dashboard />} />
             <Route path="/watchlist" exact render={() => <WatchList />} />
             <Route render={() => <Dashboard />} />
        </Switch>
    );
};