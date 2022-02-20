/**
 * @jest-environment jsdom
 */

 import React from 'react';
import { render, screen, fireEvent,createEvent ,waitFor,act } from '@testing-library/react';
import * as ReactRedux from 'react-redux';

import { configureStore } from '@reduxjs/toolkit'

import Review from '../checkout/Review';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import userEvent from '@testing-library/user-event'
import {appReducer} from '../redux/reducers/appReducer';

import INITIAL_STATE from '../constants.js';

  describe('Signin Test', () => {
let store;
  let app = null;
  const signInObject = { email:'jaxonetic@gmail.com', password:'123456789',  };
 let signin = null;
  const useSelectorMock = jest.spyOn(ReactRedux, 'useSelector');
  const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

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

 beforeAll(() => {
     store = configureStore({ reducer: { user: appReducer }, INITIAL_STATE })
   });
beforeEach(() => {
  useSelectorMock.mockClear();
  useDispatchMock.mockClear();
})

/**
*
*/


test('SignIn displays expected text', async () => {
  useSelectorMock.mockReturnValue(INITIAL_STATE)

     render(
<Review handleSuccess={()=>console.log('success')} reservation={reservation}/>

);

 

 const emailField =  screen.getByText('Name on card');

});





/**afterAll(() => {
  app.logout();
  expect(app.currentUser ).ToBeNull();
});
*/
});