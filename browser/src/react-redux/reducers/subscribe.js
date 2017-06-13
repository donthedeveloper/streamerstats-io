import axios from 'axios';

const initialState = {
  subscribed: false, 
  errorMessage: ""
};

// --------------------- CONSTANTS ---------------------
const UPDATE_ERROR_MESSAGE = 'UPDATE_ERROR_MESSAGE';
const UPDATE_SUBSCRIBED_STATUS = 'UPDATE_SUBSCRIBED_STATUS';


// --------------------- ACTION CREATERS ---------------------
export const updateErrorMessage = (message) => ({
  type: UPDATE_ERROR_MESSAGE, 
  errorMessage: message
});

const updateSubscribedStatus = (status) => ({
  type: UPDATE_SUBSCRIBED_STATUS, 
  subscribedStatus: status
})


// --------------------- THUNKS ---------------------
export const subscribeEmail = (email) => 
  dispatch => 
    axios.post('api/subscribe', {email})
    .then((statusObj) => {
      if (statusObj.status === 200) {
        const successMessage = 'Thank you! You have successfully been subscribed and will receive updates towards StreamerStats';
        
        dispatch(updateSubscribedStatus(true));
        dispatch(updateErrorMessage(""));
      }
    })
    .catch((errObj) => {
      let errorMessage = errObj.response.data.errorMessage;

      // if (errObj.response.status === 400) {
      //   errorMessage = 'This email is invalid. Please provide a valid email address';
      // } else if (errObj.response.status === 409) {
      //   errorMessage = 'It looks like this email is already subscribed.';
      // }

      dispatch(updateErrorMessage(errorMessage));
      dispatch(updateSubscribedStatus(false));
    });


// --------------------- REDUCER ---------------------
export default (state=initialState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case UPDATE_ERROR_MESSAGE:
      newState.errorMessage = action.errorMessage;
      break;
    case UPDATE_SUBSCRIBED_STATUS:
      newState.subscribed = action.subscribedStatus;
      break;
    default:
      return state;
  }

  return newState;
}
