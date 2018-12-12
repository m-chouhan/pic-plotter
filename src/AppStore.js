const initAppState = {
  image: null,
  points: []
};
export const appStore = function(state = initAppState, action) {
  switch (action.type) {
    case "CREATE_POINT":
      state = {
        ...state,
        points: [
          ...state.points,
          { ...action.payload, id: state.points.length }
        ]
      };
      break;
    case "DELETE_POINT":
    case "UPDATE_POINT":
      break;
    case "IMAGE_LOAD_SUCCESS":
      state = { ...state, image: action.payload };
      break;
    default:
  }
  return state;
};
