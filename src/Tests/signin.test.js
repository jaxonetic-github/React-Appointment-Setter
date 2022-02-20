/**
 * @jest-environment jsdom
 */

 import React from 'react';
import { render, screen, fireEvent,createEvent ,waitFor,act } from '@testing-library/react';
import * as ReactRedux from 'react-redux';

import { configureStore } from '@reduxjs/toolkit'

import SignIn from '../signinup/Signin';
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
      <ReactRedux.Provider store={store}>
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<SignIn/>} />
        </Routes>
        </BrowserRouter>
        </ReactRedux.Provider>);

 
  const passwordField = screen.getByLabelText('Password');

 const emailField =  screen.getByLabelText('EmailAddress');

  const signInButton = screen.getByLabelText('Submit');
 


 const forgotPwdLink = screen.getByText(/forgot password?/i);
 
 const signUpLink = screen.getByText(`Don't have an account? Sign Up`);

});





test('user get error when credentials don\'t match', async () => {
    useSelectorMock.mockReturnValue(INITIAL_STATE)

     render( <ReactRedux.Provider store={store}>
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<SignIn/>} />
        </Routes>
        </BrowserRouter></ReactRedux.Provider>);

  const passwordField = screen.getByLabelText('Password');
  fireEvent.change(passwordField, {target: {value: '123456789'}})

  const emailField =  screen.getByLabelText('EmailAddress');
  await act(async () =>fireEvent.change(emailField, {target: {value: 'jaxonetic@gmail.com'}}));

  const signInButton = screen.getByLabelText('Submit');
 const forgotPwdLink = screen.getByText(/forgot password?/i); 
 const signUpLink = screen.getByText(`Don't have an account? Sign Up`);

  userEvent.click(signInButton);
  userEvent.click(forgotPwdLink);
  userEvent.click(signUpLink);

});



/**afterAll(() => {
  app.logout();
  expect(app.currentUser ).ToBeNull();
});
*/
});