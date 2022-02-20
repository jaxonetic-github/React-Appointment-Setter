import {  put,call, takeEvery, select } from 'redux-saga/effects'
import log from 'loglevel';


import {loadAnonymousDataSuccess,/*reloadFromTokenSuccess,/*loadAnonymousData,*/ bubbleError,logout,loginError, login,loginSucceeded, register,
fetchSiteDataSuccess,fetchSiteData,fetchSiteDataError,loginAnonymously,
 refreshCustomData,fetchReservations,fetchReservationsError,fetchReservationsSuccess,
  loadProfile,insertReservation,editProfile,editProfileSuccess,editProfileError,
addScheduledItem,addScheduledItemSuccess,/*addScheduledItemError,*/fetchScheduledItems,fetchScheduledItemsSuccess,fetchScheduledItemsError,} from './reducers/appReducer';
// worker Saga: will be fired on USER_FETCH_REQUESTED actions



/**
 * @description Register user
 * @param {object} action - action.payload.credentials={email, password, firstName, lastName, phone}
 * 
 */
function* registerSaga(action) {
  const app = yield select(state=>state.app);
  const customData = yield call(app.registerWithEmail,action.payload );    
  console.log('registersaga:', customData);
if(customData.error)
    yield put (bubbleError(customData.error));
else
  yield put(loadProfile( customData));
}


/**
 *  logout Saga:
 */
function* signOutSaga(action) {
    const app = yield select(state=>state.app);
    yield call(app.logOut ); 
}

/**
 *  getReservation Saga: will be fired on getReservation actions
 *
 */

function* getReservationsSaga(action) {

       const app = yield select(state=>state.app);
   try {
      const reservationsResult = yield call(app.getReservations );
    yield put(fetchReservationsSuccess(reservationsResult) );
    //  const user = yield call(Api.fetchUser, action.payload.userId);
      //yield put({type: "USER_FETCH_SUCCEEDED", user: user});
   } catch (e) {
      yield put(fetchReservationsError( e.message));
   }
}

/**
 * worker Saga: will be fired on USER_FETCH_REQUESTED actions
 *
 */

function* insertReservationSaga(action) {

       const app = yield select(state=>state.app);

   try {
    console.log(action);
     const insertResult =  yield call(app.insertReservations,action.payload );
       log.warn('post call to insertReservations',insertResult);
    yield put(fetchReservations() );
    //  const user = yield call(Api.fetchUser, action.payload.userId);
      //yield put({type: "USER_FETCH_SUCCEEDED", user: user});
   } catch (e) {
      yield put(fetchReservationsError( e.message));
   }
}


/**
 *  worker Saga: to be fired when unauthed user needs SiteData
 *  
 */
function* loginAnonymouslySaga(action) {
     const app = yield select(state=>state.app);

  const result = yield call(app.loginAnonymously );

/**
 * The rest API returns result.data and prefills reservation, schedule, etc
 * The Realm direct route just returns a valid anonymous user 
 */

  if(result.data){
  const {user, site, schedule,reservations, error} = result.data;
     if(user?.email ){
        //need to migrate all success to this path
        console.log('updated anonlogin path');
       yield put(loadAnonymousDataSuccess({site:site,profile:user,availability:schedule, reservations:reservations}));

     }
     if(error){
        yield put (bubbleError(error));
     }}
        else{
            //deprecating this else path as soon as possible
         const site = yield call(app.getSiteData);
        
        if(site.screen) {
          yield put(fetchSiteDataSuccess(site))
          yield put(fetchScheduledItems())
        }
        // yield call(app.logOut);
    }

}

/**
 * @description Attempt to Log in. If successful,fetch reservations, profile 
 * 
 */
function* loginSaga(action) {
   const app = yield select(state=>state.app);

const email = action.payload.email;
const password = action.payload.password;
console.log('Preparing to login',{email,password} );
const loginResult = yield call(app.login,{email,password} );
console.log('app',loginResult);

  if( loginResult.error)
  { 
    log.warn('logn errer',loginResult.error)
   yield put(loginError(loginResult.error));

  }
  else 
   {
     log.warn('loginResult no erroe',loginResult.error )
     yield put(loginSucceeded(loginResult));
   yield put(fetchReservations());
 //   yield put(refreshCustomData());
     yield put(fetchScheduledItems())
   }

}


/**
 * @description Attempt to Log in. If successful,fetch reservations, profile 
 * @param {object }action - action.payload={first, last, email, phone}
 */
function* editProfileSaga(action) {
    console.log('editProfileSaga', action);
   const app = yield select(state=>state.app);

const email = action.payload.email;
const lastname = action.payload.lastname;
const firstname = action.payload.firstname;
const phone = action.payload.phone;
console.log('---------->',email, lastname, firstname, phone);
const {modifiedCount, profile} = yield call(app.editProfile,action.payload );
console.log("profileeditresults=",modifiedCount, profile)
  if( modifiedCount>0)
  { 
    yield put(editProfileSuccess(profile));
    //yield put(refreshCustomData());
  }
  else 
   put(editProfileError('Profile was not modified'));

}




/**
 * @description ensure the customData object is uptoData 
 * 
 */
function* customDataRefreshSaga(action) {
  const app = yield select(state=>state.app);
  console.log('state',app);
  const customData = yield call(app.refreshCustomData );
      
  yield put(loadProfile( customData));
}


/**
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.

function* UnhandledSaga(action) {
  console.log('UnhandledSaga',action);
}
*/


/**
 *  worker Saga: will be fired on USER_FETCH_REQUESTED actions
 */ 
function* fetchSiteDataSaga(action) {
     const app = yield select(state=>state.app);
console.log('siteData saga', app)

   try {
       const siteData =   yield call(app.getSiteData);
console.log('siteData retrieved', siteData)
    yield put( fetchSiteDataSuccess(siteData) );
    //  const user = yield call(Api.fetchUser, action.payload.userId);
      //yield put({type: "USER_FETCH_SUCCEEDED", user: user});
   } catch (e) {
    console.log(e);
      yield put(fetchSiteDataError( e.message));
   }
 }

/**
 * @description ensure the customData object is uptoData 
 * 
 */
function* addScheduledItemSaga(action) {
  const app = yield select(state=>state.app);
  const newItemResult = yield call(app.addScheduledItem, action.payload );
  console.log('new item result',newItemResult.insertedId)
  yield put(addScheduledItemSuccess(action.payload))
  // yield put(fetchScheduledItems())

  //yield put(loadProfile( customData));
}

/**
 *  worker Saga: will be fired on FETCH_AVAILABILITY actions
 */ 
function* fetchScheduleItemsSaga(action) {
     const app = yield select(state=>state.app);

   try {
       const scheduledItems =   yield call(app.getScheduleItems);
console.log('ScheduleItem retrieved', scheduledItems)
    yield put( fetchScheduledItemsSuccess(scheduledItems) );
    //  const user = yield call(Api.fetchUser, action.payload.userId);
      //yield put({type: "USER_FETCH_SUCCEEDED", user: user});
   } catch (e) {
    console.log(e);
      yield put(fetchScheduledItemsError( e.message));
   }
 }


/**
 *  getReservation Saga: will be fired on getReservation actions
 *
 */
/*
function* reloadFromTokenSaga(action) {

       const app = yield select(state=>state.app);
console.log('state.app in getreservationssaga:', app);
   try {
      const reloadResults = yield call(app.reloadFromToken, action.payload );
    yield put(reloadFromTokenSuccess(reloadResults) );
    //  const user = yield call(Api.fetchUser, action.payload.userId);
      //yield put({type: "USER_FETCH_SUCCEEDED", user: user});
   } catch (e) {
      yield put(bubbleError( e.message));
   }
}
*/

/**

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* appSaga(app) {
    console.log('saga');
 // yield takeEvery(reloadFromToken, reloadFromTokenSaga);
  yield takeEvery(loginAnonymously, loginAnonymouslySaga);
   yield takeEvery(addScheduledItem, addScheduledItemSaga);
   yield takeEvery(fetchScheduledItems, fetchScheduleItemsSaga);
  yield takeEvery(editProfile, editProfileSaga);
  yield takeEvery(login, loginSaga);
  yield takeEvery(logout, signOutSaga);
  yield takeEvery(refreshCustomData,customDataRefreshSaga);
  yield takeEvery(insertReservation,insertReservationSaga);
  yield takeEvery(register,registerSaga);
  yield takeEvery(fetchReservations,getReservationsSaga);
yield takeEvery(fetchSiteData,fetchSiteDataSaga);
}

export default appSaga;