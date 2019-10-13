import * as actionTypes from '../actions/ActionTypes';

const initialState= {
    left: 0,
    inputValue: '',
  }

  const setLeft = ( state, action ) => {
      return {
          state,
          left: action.leftValue
      }
  }

  const setInputValue = ( state, action ) => {
      return {
          state,
          inputValue: action.value
      }
  }
  
  const reducer= (state= initialState, action) => {
    switch (action.type) {
        case actionTypes.LEFT: return setLeft(state, action);
        case actionTypes.INPUT_VALUE: return setInputValue(state, action);
        default: return state;
    }
  }
  export default reducer;
  