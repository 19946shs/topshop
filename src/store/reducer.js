const initialState = {
    isLoading: false,
    cartItems: [],
}

export default function rootReducer(state = initialState, action) {
    switch(action.type) {
        case 'startLoading':
            state.isLoading = true;
            return state;

        case 'stopLoading':
            state.isLoading = false;
            return state;

        case 'addToCart':
            state.cartItems = [ ...state.cartItems, action.payload ]
            return state;

        case 'removeFromCart':
            state.cartItems = state.cartItems.filter(item => { return item.id !== action.payload.id })
            return state;

        case 'editQuantity':
            const editingItem = state.cartItems.filter(item => { return item.id === action.payload.id})[0];
            editingItem.quantity = action.payload.quantity;
            return state;

        default: return state;
    }
}
