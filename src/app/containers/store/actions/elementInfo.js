import * as actionTypes from './ActionTypes';


  export const moveLeft = (leftValue) => {
    return {
      type: actionTypes.LEFT,
      leftValue: leftValue
    }
  }

  export const inputValue = (value) => {
    return {
      type: actionTypes.INPUT_VALUE,
      value: value
    }
  }

  