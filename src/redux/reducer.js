import { createStore } from 'redux';
//import

const initialState = {
    destination: "",
    books: []
}

const reducer = (state = initialState, action) => {

    let newState;

    switch(action.type) {
        case "DESTINATION":
                newState = {
                    ...state,
                    destination: action.payload
                }
        break;
        case "BOOKS":
            
        break;

    default:
        newState = state
    break;
    }   
    return newState;
}

export default reducer;