import { FETCH_USER } from "../actions/types";

export default function(state = null, action){
    switch (action.type){
        case FETCH_USER:
            return action.payload || false; // return false if action.payload is empty string
        default:
            return state;
    }
}