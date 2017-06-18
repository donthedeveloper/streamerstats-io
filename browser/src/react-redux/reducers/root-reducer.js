import { combineReducers } from 'redux';

import subscriber from './subscriber';
import feature from './feature';

export default combineReducers({
  subscriber, 
  feature
});
