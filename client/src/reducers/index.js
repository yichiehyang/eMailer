import { combineReducers } from "redux";
import { reducer as reduxForm } from 'redux-form';//rename reducer to reduxform
import authReducer from "./authReducer";
import surveysReducer from "./surveysReducer";

export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    surveys: surveysReducer
})