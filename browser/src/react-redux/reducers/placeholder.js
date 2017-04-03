const initialState = {};

// --------------------- CONSTANTS ---------------------
const PLACERHOLDER = 'PLACEHOLDER';


// --------------------- ACTION CREATERS ---------------------



// --------------------- REDUCER ---------------------
export default (state=initialState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    default:
      return state;
  }

  return newState;
}
