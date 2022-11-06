const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN": {
            return {
                curruser: action.payload,
            };
        }
        case "LOGOUT":{
            return{
                curruser:null,
            };
        }
        default:
            return state;
    }


};

export default AuthReducer;