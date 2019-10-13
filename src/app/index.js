import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';
//router
import { HashRouter } from 'react-router-dom';

//redux
import { Provider } from 'react-redux';
import { createStore, combineReducers} from 'redux';

//store
import elementInfo from './containers/store/reducers/elementInfo';

const rootReducer = combineReducers({
    elementInfo: elementInfo
});

const store = createStore(rootReducer);

function render(Component) {
    ReactDOM.render(
        <Provider store={store}>
            <HashRouter>
                <Component />
            </HashRouter>
        </Provider>,           
      document.getElementById("root")
    )
}
render(App);