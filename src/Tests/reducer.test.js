import {loadAnonymousData, addScheduledItemSuccess, fetchScheduledItemsSuccess,
  addScheduledItemError, fetchScheduledItemsError,
  creditPaymentSuccess,creditPaymenError,
  appReducer,registerSuccess,REGISTER_SUCCESS,
  fetchReservations, fetchReservationsSuccess,fetchSiteDataSuccess,fetchSiteData,
  insertReservationSuccess,insertReservation,
  refreshCustomData,reloadFromTokenSuccess, reloadFromToken,loadAnonymousDataSuccess,
  editProfileSuccess,editProfileError, editProfile,
  loadUser,LOAD_USER, loadProfile,login,loginError,LOGIN_ERROR,loginSucceeded,
logout, LOGOUT,bubbleError,BUBBLE_ERROR,loadBackEnd,FETCH_BACKEND} from '../redux/reducers/appReducer';
import {INITIAL_STATE,INITIAL_STATE_EMPTY, RESERVATION, test_AVAILABILITY} from '../constants';


const reservation = {
  userid:"6182198ee43796e8d32aff28",
  pickUpDate:"12:12:10",
  pickUpTime:"02:03:04",
  dropOffLocation:"dropoffdestinationf",
  pickupLocation:"pickupdestinationf",
  firstName:"A",
  lastName:"Z",
  email:"az@email",
  createdDated:'2011:11:12',
  phone:"555-555-5555"};


/**
 * Describes test cases for Reducer actions module
 */
describe('Application reducer Test', () => {

const schedule = test_AVAILABILITY();

test('loadAnonymousData', () => {
    const altState = {...INITIAL_STATE,trace: loadAnonymousData.type};

  expect(appReducer (INITIAL_STATE, loadAnonymousData({user:{},availability:test_AVAILABILITY()}) )).toEqual( altState  )
})
test('addScheduledItemSuccess', () => {
    const altState = {...INITIAL_STATE,trace: addScheduledItemSuccess.type};
   altState.availability = [INITIAL_STATE.availability[0],INITIAL_STATE.availability[1], schedule[0]];

  expect(appReducer (INITIAL_STATE, addScheduledItemSuccess(schedule[0]) )).toEqual( altState  )
})
test('fetchScheduledItemsSuccess', () => {
    const altState = {...INITIAL_STATE,trace: fetchScheduledItemsSuccess.type,  availability:schedule};

  expect(appReducer (INITIAL_STATE, fetchScheduledItemsSuccess(schedule) )).toEqual( altState  )
})
test('addScheduledItemError', () => {
    const altState = {...INITIAL_STATE, trace: addScheduledItemError.type, error: "Unable to schedule Item"};

  expect(appReducer (INITIAL_STATE, addScheduledItemError("Unable to schedule Item") )).toEqual( altState  )
})
test('fetchScheduledItemsError', () => {
    const altState = {...INITIAL_STATE,trace: fetchScheduledItemsError.type, error:"Unable to fetch schedules"};

  expect(appReducer (INITIAL_STATE, fetchScheduledItemsError("Unable to fetch schedules") )).toEqual( altState  )
})
test('reloadFromTokenSuccess', () => {
    const altState = {...INITIAL_STATE,trace: reloadFromTokenSuccess.type, user:{}, availability:schedule};

  expect(appReducer (INITIAL_STATE, reloadFromTokenSuccess({user:{},availability:schedule}) )).toEqual( altState  )
})

test('reloadFromToken', () => {
    const altState = {...INITIAL_STATE, trace: reloadFromToken.type,availability:schedule};
   altState.availability = [INITIAL_STATE.availability[0],INITIAL_STATE.availability[1], schedule[0]];
  const  nextState = appReducer (INITIAL_STATE, reloadFromToken(schedule[0]) );
  expect(nextState).toEqual( altState  )
})
test('loadAnonymousDataSuccess', () => {

    const altState = {...INITIAL_STATE,trace: loadAnonymousDataSuccess.type, availability:schedule, profile:{email:'a@b.com'}, siteData:{}, reservations:RESERVATION};

  expect(appReducer (INITIAL_STATE, loadAnonymousDataSuccess({availability:schedule, profile:{email:'a@b.com'},site:{}, reservations:RESERVATION}) )).toEqual( altState  )
})

test('refreshCustomData', () => {
    const altState = {...INITIAL_STATE,trace: refreshCustomData.type};

  expect(appReducer (INITIAL_STATE, refreshCustomData() )).toEqual( altState  )
})

test('editProfile', () => {
    const altState = {...INITIAL_STATE,trace: editProfile.type};

  expect(appReducer (INITIAL_STATE, editProfile() )).toEqual( altState  )
})

test('editProfileSuccess', () => {
  const profile = INITIAL_STATE.profile;
    const altState = {...INITIAL_STATE,trace: editProfileSuccess.type,profile:profile };

  expect(appReducer (INITIAL_STATE, editProfileSuccess(profile) )).toEqual( altState  )
})
test('editProfileError', () => {
    const profileEditError = 'Error Editing Profile';
    const altState = {...INITIAL_STATE,trace: editProfileError.type, error:profileEditError};

  expect(appReducer (INITIAL_STATE, editProfileError(profileEditError) )).toEqual( altState  )
})


test('creditPaymentSuccess', () => {
    const altState = {...INITIAL_STATE,trace: creditPaymentSuccess.type};

  expect(appReducer (INITIAL_STATE, creditPaymentSuccess() )).toEqual( altState  )
})

/**
 * Pass the error to state and update Trace
 */
test('creditPaymenError', () => {
    const creditError = 'Credit Payment Test Error';
    const altState = {...INITIAL_STATE, trace: creditPaymenError.type, error:creditError};

  expect(appReducer (INITIAL_STATE, creditPaymenError(creditError))).toEqual( altState  )
})

test('insertReservationSuccess', () => {
    const altState = {...INITIAL_STATE, trace:insertReservationSuccess.type};

  expect(appReducer (INITIAL_STATE, insertReservationSuccess())).toEqual( altState  )
})
test('insertReservation', () => {
    const altState = {...INITIAL_STATE, trace:insertReservation.type};

  expect(appReducer (INITIAL_STATE, insertReservation())).toEqual( altState  )
})

test('fetchReservations', () => {
    const altState = {...INITIAL_STATE,trace: fetchReservations.type};

  expect(appReducer (INITIAL_STATE, fetchReservations())).toEqual( altState  )
})

test('fetchReservationsSuccess', () => {
    const altState = {...INITIAL_STATE, reservations:[RESERVATION],trace: fetchReservationsSuccess.type};

  expect(appReducer (INITIAL_STATE, fetchReservationsSuccess([RESERVATION]))).toEqual( altState  )
})


test('fetchSiteDataSuccess', () => {
  const altState = {...INITIAL_STATE, siteData:{screen:'test'},trace: fetchSiteDataSuccess.type};
  expect(appReducer (INITIAL_STATE, fetchSiteDataSuccess({screen:'test'}))).toEqual( altState )
})
test('fetchSiteData', () => {
  const altState = {...INITIAL_STATE,trace: fetchSiteData.type};
  expect(appReducer (INITIAL_STATE, fetchSiteData())).toEqual( altState )
})

test('loadProfile', () => {
  const altState = {...INITIAL_STATE, profile:{email:'test@email.com'},trace: "LOAD_PROFILE"};
  expect(appReducer (INITIAL_STATE, loadProfile({email:'test@email.com'}))).toEqual( altState )
})

test('loadUser', () => {
  const altState = {...INITIAL_STATE,trace: LOAD_USER, user:{id:'testid'}};
  expect(appReducer (INITIAL_STATE, loadUser({id:'testid'}))).toEqual(
altState   
  )
})


test('login', () => {

  const altState = {...INITIAL_STATE_EMPTY, trace: login.type,
    error:'', authState : {status :'Logging In'} };
  expect(appReducer (INITIAL_STATE_EMPTY, login({email:'test@email.com', password:'password'}) )).toEqual(
altState   
  )
})

test('loginSucceeded', () => {
  const altState = {...INITIAL_STATE, trace: loginSucceeded.type,
    reservations:[RESERVATION],
    profile:{email:'test@email.com'},
    user:{id:'testid'},
    authState : {status :'Logged In successfully'}
  };

const nextState = appReducer (INITIAL_STATE, loginSucceeded( {customData:{email:'test@email.com'}, reservations:[RESERVATION], user:{id:'testid'} } ));
 // console.log("appreducer--->", appReducer (INITIAL_STATE, loginSucceeded( {profile:{email:'test@email.com'}, reservations:[RESERVATION], user:{id:'testid'} } ))) ;
  expect(nextState).toEqual( altState    )
})


test('registerSuccess', () => {
  const altState = {...INITIAL_STATE, trace: REGISTER_SUCCESS,
    reservations:[RESERVATION],
    profile:{email:'test@email.com'},
    user:{id:'testid'},
  };
  expect(appReducer (INITIAL_STATE, registerSuccess( {profile:{email:'test@email.com'}, reservations:[RESERVATION], user:{id:'testid'} } ))).toEqual(
altState   
  )
})


test('logout', () => {
  const altState = {...INITIAL_STATE,trace: LOGOUT, user:null, profile:null,reservations:[],authState:null};
  expect(appReducer (INITIAL_STATE, logout())).toEqual(
altState   
  )
})


test('BUBBLE_ERROR', () => {
  const altState = {...INITIAL_STATE,trace: BUBBLE_ERROR, error:'unexpected error'};
  expect(appReducer (INITIAL_STATE, bubbleError('unexpected error'))).toEqual(
altState   
  )
})



test('loginError action', () => {
  const altState = {...INITIAL_STATE,trace: LOGIN_ERROR, error:'unexpected error',authState: {status :'Error while Logging In'}};
  expect(appReducer (INITIAL_STATE, loginError('unexpected error'))).toEqual(
altState   
  )
})


test('Load  BackEnd', () => {
  const altState = {...INITIAL_STATE,trace: FETCH_BACKEND, app:{}};
  expect(appReducer (INITIAL_STATE, loadBackEnd({}))).toEqual(
altState   
  )
})
test('Unknown action', () => {
  const altState = {...INITIAL_STATE,trace: 'UNKNOWN_TEST_ACTION'};
  expect(appReducer (INITIAL_STATE,{type:'UNKNOWN_TEST_ACTION', payload:'Some Unknown Payload'}  )).toEqual(
altState   
  )
})

})


