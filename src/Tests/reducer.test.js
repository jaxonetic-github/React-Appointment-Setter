import {creditPaymentSuccess,creditPaymenError,
  appReducer,registerSuccess,REGISTER_SUCCESS,
  fetchReservations, fetchReservationsSuccess,fetchSiteDataSuccess,fetchSiteData,
  insertReservationSuccess,insertReservation,
  refreshCustomData,
  editProfileSuccess,editProfileError, editProfile,
  loadUser,LOAD_USER, loadProfile,login,loginError,LOGIN_ERROR,loginSucceeded,
logout, LOGOUT,bubbleError,BUBBLE_ERROR,loadBackEnd,FETCH_BACKEND} from '../redux/reducers/appReducer';
import {INITIAL_STATE,INITIAL_STATE_EMPTY, RESERVATION} from '../constants';


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

  console.log("appreducer--->", appReducer (INITIAL_STATE, loginSucceeded( {profile:{email:'test@email.com'}, reservations:[RESERVATION], user:{id:'testid'} } ))) ;
  expect(appReducer (INITIAL_STATE, loginSucceeded( {customData:{email:'test@email.com'}, reservations:[RESERVATION], user:{id:'testid'} } ))).toEqual(
altState   
  )
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




