import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import RootReducer from './reducers/rootReducer';
const allEnhancers = compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
const store = createStore(RootReducer,allEnhancers);
export default store;