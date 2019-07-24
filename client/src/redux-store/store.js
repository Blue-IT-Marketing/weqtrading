import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
//import logger from 'redux-logger';
//import promise from 'redux-promise-middleware';
import {rootReducer} from '../reducers';

// import {myStore} from '../localStorage';

// import {v4} from 'node-uuid'; // this is used together with persist state to create very unique ids
// import throttle from 'lodash/throttle';
//
// const myLogger = (store) => (next) => (action) => {
// 	console.log('Redux Logger : ', action);
// 	console.log('Redux State : ', store.state);
// 	return next(action);
// };


//this needs a huge rewrite


const persistedState = {};

//const middleware = applyMiddleware(compose(promise,logger,thunk));
const middleware = applyMiddleware(compose(
	thunk
));

let store = createStore(
	rootReducer,
	persistedState,
	middleware
);



export default store;



