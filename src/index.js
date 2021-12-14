import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import './css/App.css';

import App from './App';
import { RealmDAO } from "./RealmDAO.js";
import { INITIAL_STATE,INITIAL_STATE_EMPTY } from "./constants.js";
import reportWebVitals from './reportWebVitals';
//import RealmApolloProvider from "./graphql/RealmApolloProvider";

import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'

import {appReducer,fetchScheduledItems,refreshCustomData,fetchReservations,loginAnonymously,loadBackEnd,fetchSiteData} from './redux/reducers/appReducer'
import saga from './redux/sagas';
import {logger} from 'redux-logger';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const mock  = false
const initialState=mock?INITIAL_STATE : INITIAL_STATE_EMPTY;

// mount it on the Store
   const store = createStore(appReducer, initialState,  applyMiddleware(sagaMiddleware, logger))
   
   // start the saga
   sagaMiddleware.run(saga);

   const app =  new RealmDAO(process.env.REACT_APP_MONGODB_REALM_APPID); // mock ? INITIAL_STATE.app;
  
   store.dispatch(loadBackEnd(app));

   if(!app.app.currentUser){
    //logging in anonymously to load changeable data
      store.dispatch(loginAnonymously());
   
  }
   else{
    //ensure non-stale customData object
    store.dispatch(refreshCustomData());
    //load changeable data
    store.dispatch(fetchSiteData());
    //load user reservations, if any
    store.dispatch(fetchReservations());
        store.dispatch(fetchScheduledItems());
   }

  /*
          const credentials = {
          email: 'jaxonetic@gmail.com',
          password: '123456789',
        }
    app.logIn(Realm.Credentials.emailPassword(credentials.email, credentials.password));
  //  store.dispatch(refreshCustomData());
            
    sagaMiddleware.run(mySaga, app);
    console.log('placibo app::',app);

    if(!app.currentUser)
    {
console.log('no app cuser',app);

    }
    else{//there is aleadry a user 
        console.log(app);

        }*/
        /*
        try {
        store.dispatch(loadBackEnd(app));
        if(!app?.currentUser)
        {
          const user = app.login(Realm.Credentials.anonymous());
          store.dispatch()
        }
        store.dispatch(fetchSiteData());
       // console.log(store.getState());
    
   
// load our back end access
//console.log(app.login);


}catch(err){
  console.log('Unable to load Back End', err);
}
*/
  
console.log(store.getState());
// render the application
const theme = createTheme();

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
      <ThemeProvider theme={theme}>

        <App />
    </ThemeProvider >

  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
