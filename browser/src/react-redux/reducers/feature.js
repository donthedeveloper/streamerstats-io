import axios from 'axios';

const initialState = {
  features: []
};

// --------------------- CONSTANTS ---------------------
const ADD_FEATURE_OBJ = 'ADD_FEATURE_OBJ';


// --------------------- ACTION CREATERS ---------------------
export const addFeatureObj = (featureObj) => ({
  type: ADD_FEATURE_OBJ, 
  feature: featureObj
});


// --------------------- THUNKS ---------------------
// TODO: FINISH
export const addFeature = (content) => 
  dispatch => 
    axios.post('api/features', {content})
    .then((statusObj) => {
      if (statusObj.status === 200) {
        const featureObj = {
          headerText: 'Requested Feature', 
          contentText: content, 
          faIconClass: 'fa-upload', 
          userSubmitted: true
        }

        dispatch(addFeatureObj(featureObj));
      }
    });
//     .catch((errObj) => {
//       let errorMessage = errObj.response.data.errorMessage;

//       dispatch(updateErrorMessage(errorMessage));
//       dispatch(updateSubscribedStatus(false));
//     });


// --------------------- REDUCER ---------------------
export default (state=initialState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case ADD_FEATURE_OBJ:
      newState.features = [...newState.features, action.feature];
      break;
    default:
      return state;
  }

  return newState;
}
