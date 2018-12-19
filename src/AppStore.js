import {
  CREATE_POINT,
  DELETE_PAIR,
  SET_SELECTION,
  UPDATE_POINT,
  IMAGE_LOAD_SUCCESS,
  UNDO
} from "./actions";

const initAppState = {
  image: null,
  points: [],
  selectionIndex: null,
  history: []
};

export const appStore = function(state, action) {
  if (state === undefined) {
    return initAppState;
  }

  if (action.type === UNDO) {
    if (state.history.length > 0) {
      const prevState = state.history.splice(state.history.length - 1)[0];
      return { ...prevState, history: state.history };
    }
    return state;
  }

  state.history.push({
    image: state.image,
    points: state.points,
    selectionIndex: state.selectionIndex
  });

  switch (action.type) {
    case CREATE_POINT:
      state = {
        ...state,
        points: [...state.points, { ...action.payload }]
      };
      break;
    case DELETE_PAIR:
      let points = state.points.slice();
      points.splice(action.payload, 2);
      state = {
        ...state,
        selectionIndex: undefined,
        points: [...points]
      };
      break;
    case SET_SELECTION:
      state = { ...state, selectionIndex: action.payload };
      break;
    case UPDATE_POINT:
      break;
    case IMAGE_LOAD_SUCCESS:
      state = { ...state, image: action.payload };
      break;
    default:
  }

  return state;
};
