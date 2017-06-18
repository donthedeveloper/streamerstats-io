import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { axios } from 'axios';
import store from './store';

// import containers
import AppContainer from './containers/AppContainer';

// import components

// import actions
import { addFeature } from './reducers/feature';

// on enters
const onAppEnter = () => {
  const featuresData =  [
    {
      headerText: 'Statistics with Google Charts', 
      contentText: 'Have you ever wondered how long lurkers really stay in your channel? View channel statistics in much more depth.', 
      faIconClass: 'fa-area-chart'
    }, {
      headerText: 'Moderation tools with action logs', 
      contentText: 'Mark and see previously problem viewers, as well as users who have a positive impact on your community.', 
      faIconClass: 'fa-eercast'
    }
  ];

  featuresData.forEach((featureObj) => {
    store.dispatch(addFeature(featureObj));
  });
}

export default () => {
  return (
    <Provider store={ store }>
      <Router history={ hashHistory }>
        <Route path="/" component={ AppContainer } onEnter={onAppEnter}>
          {/*<Route path=""/>*/}
        </Route>
      </Router>
    </Provider>
  )
}
