import {createStore, applyMiddleware} from "redux"
import reducer from "./reducers"
import thunkMiddleware from 'redux-thunk';

const store = createStore(reducer, applyMiddleware(
    thunkMiddleware))

export default store