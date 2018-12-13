const initAppState = {
  image: null,
  points: [],
  selectionIndex: null
};
export const appStore = function(state = initAppState, action) {
  switch (action.type) {
    case "CREATE_POINT":
      state = {
        ...state,
        points: [...state.points, { ...action.payload }]
      };
      break;
    case "DELETE_PAIR":
      let points = state.points.slice();
      points.splice(action.payload, 2);
      state = {
        ...state,
        selectionIndex: undefined,
        points: [...points]
      };
      break;
    case "SET_SELECTION":
      state = { ...state, selectionIndex: action.payload };
      break;
    case "UPDATE_POINT":
      break;

    case "IMAGE_LOAD_SUCCESS":
      state = { ...state, image: action.payload };
      break;
    default:
  }
  return state;
};
