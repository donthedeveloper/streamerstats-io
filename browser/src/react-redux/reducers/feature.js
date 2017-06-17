import axios from 'axios';

const initialState = {
  features: []
};

// --------------------- CONSTANTS ---------------------
const ADD_FEATURE = 'ADD_FEATURE';


// --------------------- ACTION CREATERS ---------------------
export const addFeature = (feature) => ({
  type: ADD_FEATURE, 
  feature: feature
});


// --------------------- THUNKS ---------------------
// export const addSubscriber = (email) => 
//   dispatch => 
//     axios.post('api/subscribers', {email})
//     .then((statusObj) => {
//       if (statusObj.status === 200) {
//         const successMessage = 'Thank you! You have successfully been subscribed and will receive updates towards StreamerStats';
        
//         dispatch(updateSubscribedStatus(true));
//         dispatch(updateErrorMessage(""));
//       }
//     })
//     .catch((errObj) => {
//       let errorMessage = errObj.response.data.errorMessage;

//       dispatch(updateErrorMessage(errorMessage));
//       dispatch(updateSubscribedStatus(false));
//     });


// --------------------- REDUCER ---------------------
export default (state=initialState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case ADD_FEATURE:
      newState.features = [action.feature, [...newState.features]];
      break;
    default:
      return state;
  }

  return newState;
}
