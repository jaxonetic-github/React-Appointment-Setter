/**
 * @jest-environment jsdom
 */
 import React from 'react';
import { render, screen, fireEvent,createEvent ,waitFor,act } from '@testing-library/react';
import * as ReactRedux from 'react-redux';
import SignUp from '../signinup/Signup';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import {appReducer} from '../redux/reducers/appReducer'
import createSagaMiddleware from 'redux-saga';
import INITIAL_STATE from '../constants.js';
import { configureStore } from '@reduxjs/toolkit'

  describe('Signup Component Test', () => {
let sagaMiddleware;
let store;
  let app = null;
  const signUpObject = { email:'jaxonetic@gmail.com', password:'123456789',  };
 let signup = null;
  const useSelectorMock = jest.spyOn(ReactRedux, 'useSelector')
  const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch')

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



test('SignUp displays expected text', async () => {
  useSelectorMock.mockReturnValue(INITIAL_STATE);

     render( <ReactRedux.Provider store={store}><BrowserRouter>
        <Routes>
        <Route path="/" element={<SignUp/>} />
        </Routes>
        </BrowserRouter> </ReactRedux.Provider>);

 
  const passwordField = screen.getByLabelText('Password');

 const emailField =  screen.getByLabelText('EmailAddress');

  const signUnButton = screen.getByLabelText('Submit');
 
 const firstNameField =  screen.getByLabelText('FirstName');

  const lastNameField = screen.getByLabelText('LastName');
 
 const signInLink = screen.getByLabelText(`signInLink`);

});





test('user get error when credentials don\'t match', async () => {
    useSelectorMock.mockReturnValue(INITIAL_STATE)

     render(<ReactRedux.Provider store={store}>
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<SignUp/>} />
        </Routes>
        </BrowserRouter></ReactRedux.Provider>);

  const passwordField = screen.getByLabelText('Password');
  fireEvent.change(passwordField, {target: {value: '123456789'}})

  const emailField =  screen.getByLabelText('EmailAddress');
  await act(async () =>fireEvent.change(emailField, {target: {value: 'jaxonetic@gmail.com'}}));

  const submitButton = screen.getByLabelText('Submit');
 const signInLink = screen.getByLabelText(`signInLink`);

  userEvent.click(submitButton);
  userEvent.click(signInLink);

});



/**afterAll(() => {
  app.logout();
  expect(app.currentUser ).ToBeNull();
});
*/
});