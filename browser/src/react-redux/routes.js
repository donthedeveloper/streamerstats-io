import React from 'react';
import { Router, Route, browserHistory, Switch } from 'react-router';
import { Provider } from 'react-redux';
import { axios } from 'axios';
import store from './store';

// import containers
import AppContainer from './containers/AppContainer';

// import components

// import actions
import { addFeatureObj } from './reducers/feature';

// on enters
const onAppEnter = () => {
  const featuresData =  [
    {
      headerText: 'Unique Channel Statistics', 
      contentText: 'Have you ever wondered how long lurkers really stay in your channel? View channel statistics in much more depth.', 
      faIconClass: 'fa-area-chart', 
      isUserSubmitted: false
    }, {
      headerText: 'Moderation tools with action logs', 
      contentText: 'Mark and see previously problem viewers, as well as users who have a positive impact on your community.', 
      faIconClass: 'fa-eercast', 
      isUserSubmitted: false
    }
  ];

  featuresData.forEach((featureObj) => {
    store.dispatch(addFeatureObj(featureObj));
  });
}

export default () => {
  return (
    <Provider store={ store }>
      <Router history={ browserHistory }>
        <Route path="*" component={ AppContainer } onEnter={ onAppEnter } />
      </Router>
    </Provider>
  )
}
