var redux = require('redux')

const roleAdminInitialState = {
    isLogin: false,
    role: false
};
const role = (state = roleAdminInitialState, action) => {
    switch (action.type) {
        case "ADMIN":
            return {...state,role:true};
        case "LOGIN":
            return {...state,isLogin:true};
        case "LOGOUT":
            state.role = false;
            state.isLogin = false;
            return state;
        default: 
            return state
    }
}

var store1 = redux.createStore(role);
export default store1;