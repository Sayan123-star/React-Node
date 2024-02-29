
const initialState={
    user:{}
}
// exporting  the reducer function to be used in our application's Redux store.
export const UserReducer = (state = initialState, action)=>{
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return{
                ...state, user: action.payload
            };
        case "LOGIN_ERROR":
            return initialState;
        default:
            return initialState;
    }
}