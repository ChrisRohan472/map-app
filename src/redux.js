import { createStore } from "redux";
const reducer = (state = [], action) => {
  switch (action.type) {
    case "SET_DATA":
      state = action.payload;
      console.log(state);
      return state;
    case "RESET":
      state = {};
      return state;
    default:
      return state;
  }
};
const store = createStore(reducer);
export default store;
