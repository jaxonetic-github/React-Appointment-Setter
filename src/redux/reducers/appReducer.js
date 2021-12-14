
/** @module reducer 
 * 
 * @desccription Uses reduxjs/tookit for Redux reducer and action creation 
 */

import { createAction, createReducer } from '@reduxjs/toolkit'
import {INITIAL_STATE } from '../../constants.js';
export const FETCH_SITEDATA ='FETCH_SITEDATA';
export const FETCH_SITEDATA_SUCCESS ='FETCH_SITEDATA_SUCCESS';
export const FETCH_SITEDATA_ERROR ='FETCH_SITEDATA_FAILED';
export const FETCH_RESERVATION ='FETCH_RESERVATIONS';
export const FETCH_RESERVATION_SUCCESS ='FETCH_RESERVATION_SUCCESS';
export const FETCH_RESERVATION_ERROR ='FETCH_RESERVATION_FAILED';
export const RESERVATION_INSERT_ERROR ='RESERVATION_INSERT_FAILED';
export const RESERVATION_INSERT_SUCCESS ='RESERVATION_INSERT_SUCCESS';
export const RESERVATION_INSERT ='RESERVATION_INSERT_REQUESTED';
export const LOGIN_SUCCEEDED ='LOGIN_SUCCEEDED';
export const LOGIN_ERROR ='LOGIN_FAILED';
export const LOGIN ='LOGIN';
export const LOGOUT ='LOGOUT';
export const REGISTER_SUCCESS ='REGISTER_SUCCESS';
export const REGISTER_ERROR ='REGISTER_FAILED';
export const REGISTER ='REGISTER_REQUESTED';
export const USERDATA_FETCH ='USERDATA_FETCH';
export const USERDATA_FETCH_SUCCESS ='USERDATA_FETCH_SUCCESS';
export const USERDATA_FETCH_ERROR ='USERDATA_FETCH_ERROR';
export const EDIT_PROFILE ='EDIT_PROFILE';
export const EDIT_PROFILE_SUCCESS ='EDIT_PROFILE_SUCCESS';
export const EDIT_PROFILE_ERROR ='EDIT_PROFILE_ERROR';
export const FETCH_BACKEND ='LOAD_BACKEND';
export const FETCH_BACKEND_SUCCESS ='LOAD_BACKEND_SUCCESS';
export const FETCH_BACKEND_ERROR ='LOAD_BACKEND_ERROR';
export const BUBBLE_ERROR ='BUBBLEERROR';
export const LOAD_USER='LOAD/USER';
export const LOAD_PROFILE = "LOAD_PROFILE";
export const ADD_SCHEDULED_ITEM = "Add Scheduled Item";
export const ADD_SCHEDULED_ITEM_SUCCESS = "Add Scheduled_ITEMS_SUCCESS";
export const ADD_SCHEDULED_ITEM_ERROR = "Add Scheduled_ITEMS_ERROR";
export const REMOVE_SCHEDULED_ITEM = "REMOVEScheduled Item";
export const REMOVE_SCHEDULED_ITEM_SUCCESS = "REMOVEScheduled_ITEMS_SUCCESS";
export const REMOVE_SCHEDULED_ITEM_ERROR = "REMOVEScheduled_ITEMS_ERROR";
export const FETCH_SCHEDULED_ITEMS = "FETCH_Scheduled_ItemS";
export const FETCH_SCHEDULED_ITEMS_SUCCESS = "FETCH_Scheduled_ITEMS_SUCCESS";
export const FETCH_SCHEDULED_ITEMS_ERROR = "FETCH_Scheduled_ITEMS_ERROR";
export const CREDIT_PAYMENT_SUCCESS = 'CREDIT_PAYMENT_SUCCESS';
export const CREDIT_PAYMENT_ERROR = 'CREDIT_PAYMENT_ERROR';
export const LOGIN_ANONYMOUSLY = 'LOGIN_ANONYMOUSLY';




export const fetchSiteData = createAction(FETCH_SITEDATA);
export const fetchSiteDataError = createAction(FETCH_SITEDATA_ERROR);
export const fetchSiteDataSuccess = createAction(FETCH_SITEDATA_SUCCESS);
export const loadBackEnd = createAction(FETCH_BACKEND);
export const loadProfile = createAction(LOAD_PROFILE);
export const loadUser = createAction(LOAD_USER);
export const loadBackEndError = createAction(FETCH_BACKEND_ERROR);
export const loadBackEndSuccess = createAction(FETCH_BACKEND_SUCCESS);

export const bubbleError = createAction(BUBBLE_ERROR);

export const loginError = createAction(LOGIN_ERROR);
export const loginAnonymously = createAction(LOGIN_ANONYMOUSLY);

/** 
 * 
 *  @description addScheduledItem  plain text Action

 *  @constant
 *   @type {function}
 *   @default
 * @returns {string}  the addItem string action
 */
export const removeScheduledItem = createAction(REMOVE_SCHEDULED_ITEM);
export const removeScheduledItemSuccess = createAction(REMOVE_SCHEDULED_ITEM_SUCCESS);
export const removeScheduledItemError = createAction(REMOVE_SCHEDULED_ITEM_ERROR);
/** 
 * 
 *  @description addScheduledItem  plain text Action

 *  @constant
 *   @type {function}
 *   @default
 * @returns {string}  the addItem string action
 */
export const addScheduledItem = createAction(ADD_SCHEDULED_ITEM);
export const addScheduledItemSuccess = createAction(ADD_SCHEDULED_ITEM_SUCCESS);
export const addScheduledItemError = createAction(ADD_SCHEDULED_ITEM_ERROR);

/** 
 * 
 *  @description FETCH  plain text ActionS

 *  @constant
 *   @type {function}
 *   @default
 * @returns {string}  the FETCH string action
 */
export const fetchScheduledItems = createAction(FETCH_SCHEDULED_ITEMS);
export const fetchScheduledItemsSuccess = createAction(FETCH_SCHEDULED_ITEMS_SUCCESS);
export const fetchScheduledItemsError = createAction(FETCH_SCHEDULED_ITEMS_ERROR);

/** 
 * 
 *  @description loginSucceeded()   plain text Action

 *  @constant
 *   @type {function}
 *   @default
 * @returns {string}  the login string action
 */
export const login = createAction(LOGIN);

/** 
 * @description loginSucceeded()   plain text Action
 *  @constant
 *   @type {function}
 *   @default
 */
export const loginSucceeded = createAction(LOGIN_SUCCEEDED);
/** 
 * @description logout()   plain text Action
 *  @constant
 *   @type {function}
 *   @default
 */
export const logout = createAction(LOGOUT);
/** 
 * @description register()   plain text Action
 *  @constant
 *   @type {function}
 *   @default
 */
export const register = createAction(REGISTER)
/** 
 * @description registerSuccess()   plain text Action
 *  @constant
 *   @type {function}
 *   @default
 */
export const registerSuccess = createAction(REGISTER_SUCCESS);
/** 
 * @description registerError()   plain text Action
 *  @constant
 *   @type {function}
 *   @default
 */
export const registerError = createAction(REGISTER_ERROR)

/** 
 * @description fetchReservations()   plain text Action
 *  @constant
 *   @type {function}
 *   @default
 */
export const fetchReservations = createAction(FETCH_RESERVATION);
/** 
 * @description fetchReservationsSuccess()   plain text Action
 *  @constant
 *   @type {function}
 *   @default
 */
export const fetchReservationsSuccess = createAction(FETCH_RESERVATION_SUCCESS);
/** 
 * @description fetchReservationsError()   plain text Action
 *  @constant
 *   @type {function}
 *   @default
 */
export const fetchReservationsError = createAction(FETCH_RESERVATION_ERROR);
/** 
 * @description insertReservation()   plain text Action
 *  @constant
 *   @type {function}
 *   @default
 */
export const insertReservation = createAction(RESERVATION_INSERT);
/** 
 * @description insertReservationSuccess()   plain text Action
 *  @constant
 *   @type {function}
 *   @default
 */
export const insertReservationSuccess = createAction(RESERVATION_INSERT_SUCCESS);
/** 
 * @description insertReservationError()   plain text Action
 *  @constant
 *   @type {function}
 *   @default
 */
 export const insertReservationError = createAction(RESERVATION_INSERT_ERROR);

/** 
 * @description refreshCustomData()   plain text Action
 *  @constant
 *   @type {function}
 *   @default
 * 
 */
 export const editProfile = createAction(EDIT_PROFILE);
/** 
 * @description refreshCustomDataSuccess()   plain text Action
 * @param EDIT_PROFILE : {firstname, lastname, email, phone}
 *  @constant
 *   @type {function}
 *   @default
 */
export const editProfileSuccess = createAction(EDIT_PROFILE_SUCCESS);
/** 
 * @description refreshCustomDataError()   plain text Action
 *  @constant
 *   @type {function}
 *   @default
 */
 export const editProfileError = createAction(EDIT_PROFILE_ERROR);

/** 
 * @description refreshCustomData()   plain text Action
 *  @constant
 *   @type {function}
 *   @default
 */
 export const refreshCustomData = createAction(USERDATA_FETCH);
/** 
 * @description refreshCustomDataSuccess()   plain text Action
 *  @constant
 *   @type {function}
 *   @default
 */
export const refreshCustomDataSuccess = createAction(USERDATA_FETCH_SUCCESS);
/** 
 * @description refreshCustomDataError()   plain text Action
 *  @constant
 *   @type {function}
 *   @default
 */
 export const refreshCustomDataError = createAction(USERDATA_FETCH_ERROR);
/** 
 * @description creditPaymentSuccess()   plain text Action
 *  @constant
 *   @type {function}
 *   @default
 */
export const creditPaymentSuccess = createAction(CREDIT_PAYMENT_SUCCESS);

/** 
 * @description creditPaymenError()   plain text Action
 *  @constant
 *   @type {function}
 */export const creditPaymenError = createAction(CREDIT_PAYMENT_ERROR);



/**
 * @description Main/Initial App Redux Reducer
 *   @default

 * @returns The new state
 */
export const appReducer = createReducer(INITIAL_STATE, (builder) => {

  builder
  .addCase(addScheduledItemSuccess, (state, action) => {
      state.trace = action.type;
      state.availability.push(action.payload);
      return state;
    })
  .addCase(fetchScheduledItemsSuccess, (state, action) => {
      state.trace = action.type;
      state.availability = action.payload;
      return state;
    })
  .addCase(addScheduledItemError, (state, action) => {
      state.trace = action.type;
      state.error = action.payload;
      return state;
    })
  .addCase(fetchScheduledItemsError, (state, action) => {
      state.trace = action.type;
      state.error = action.payload;
      return state;
    })

  .addCase(creditPaymentSuccess, (state, action) => {
      state.trace = action.type;
      return state;
    })
    .addCase(creditPaymenError, (state, action) => {
      state.trace = action.type;
      state.error = action.payload;
      return state;
    })
      .addCase(loadUser, (state, action) => {
      state.trace = action.type;
      state.user = action.payload;
      return state;
    })
      .addCase(loadProfile, (state, action) => {
      state.trace = action.type;
      state.profile = action.payload;
      return state;
    })      
    .addCase(fetchSiteData, (state, action) => {
      state.trace = action.type;
      return state;
    })
        .addCase(fetchSiteDataSuccess, (state, action) => {
      state.trace = action.type;
      state.siteData= action.payload
      return state;
    })
    .addCase(refreshCustomData, (state, action) => {
      state.trace = action.type;
      return state;
    })
    .addCase(editProfile, (state, action) => {
      state.trace = action.type;
      return state;
    })
     .addCase(editProfileSuccess, (state, action) => {
      state.trace = action.type;
      state.profile = action.payload;
      return state;
     })
     .addCase(editProfileError, (state, action) => {
      state.trace = action.type;
      state.error = action.payload;
      return state;
    }).addCase(registerSuccess, (state, action) => {
      state.trace = action.type;
      state.user = action.payload.user;
      state.profile = action.payload.profile;
      state.reservations= action.payload.reservations? action.payload.reservations:[];

      return state;
    })
      .addCase(loadBackEnd, (state, action) => {
      state.trace = action.type;
      state.app= action.payload;
      return state;
    })
    .addCase(loginSucceeded, (state, action) => {
       state.trace = action.type;
       state.authState = {status :'Logged In successfully'};
       state.user = action.payload.user;
       state.profile = action.payload.profile;
       //state.reservation= action.payload.reservations;
      state.reservations= action.payload.reservations? action.payload.reservations:[];

    return state;
    })
      .addCase(loginError, (state, action) => {
       state.trace = action.type;
       state.error = action.payload;
      state.authState = {status :'Error while Logging In'};

    return state;
    })
    .addCase(login, (state, action) => { 
             state.trace = action.type;
             state.error = '';
            state.authState = {status :'Logging In'};
      return state;
    })
    .addCase(fetchReservations, (state, action) => {
    state.trace = action.type; 
      return state;
    })
    .addCase(fetchReservationsSuccess, (state, action) => {
    state.trace = action.type; 
     state.reservations = action.payload;
      return state;
    })
    .addCase(insertReservation, (state, action) => {
    state.trace = action.type; 
      return state;
    })
    .addCase(insertReservationSuccess, (state, action) => {
    state.trace = action.type; 
     // state.reservations= state.reservations? state.reservations.push(action.payload):[action.payload];
      return state;
    })
    .addCase(logout, (state, action) => {
      state.trace = action.type;
      state.profile=null;
      state.user = null;
      state.reservations = [];
      state.authState = null;
      return state;
    })
    .addCase(bubbleError, (state, action) => {
      state.trace = action.type;
      state.error = action.payload;
      return state;
    }).addDefaultCase((state, action) =>{
          state.trace = action.type;
            return state;})
})