const initialState = {
  cartList: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return {
        ...state,
        cartList: [...state.cartList, action.payload],
      };
    default:
      return state;
  }
};

export default cartReducer;
