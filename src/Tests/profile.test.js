/**
 * @jest-environment jsdom
 */

 import React from 'react';
import { render, screen, fireEvent,createEvent ,waitFor,act } from '@testing-library/react';
import * as ReactRedux from 'react-redux';

import { configureStore } from '@reduxjs/toolkit'

import Profile from '../profile/Profile.js';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import userEvent from '@testing-library/user-event'
import {appReducer, editProfile} from '../redux/reducers/appReducer';

import INITIAL_STATE from '../constants.js';
import validator from 'validator';
/**
 * Describes test cases for Profile module
 */
describe('Profile Test', () => {

    const store = configureStore({ reducer: appReducer, INITIAL_STATE })

    let app = null;
    let signin = null;
     // const useSelectorMock = jest.spyOn(ReactRedux, 'useSelector');

    const mockDispatch = jest.fn();
    const useDispatchMock = jest.spyOn(store, 'dispatch');
     // beforeAll(() => {});

    beforeEach(() => {
     // useSelectorMock.mockClear();
      useDispatchMock.mockClear();
    })


test('Profile dispatches editProfile action', async () => {
   const profile = {firstname:'fntest', lastname:'tttttttest', email:'test@email.com', phone:'1230900982'};
     render(
      <ReactRedux.Provider store={store}>
        <BrowserRouter>
        <Routes>
             <Route path={"/"} element={<Profile/>} />
        </Routes>
        </BrowserRouter>
        </ReactRedux.Provider>);

   //get all the elements to be tested
   const emailField =  screen.getByLabelText('EmailAddress');
   const phone = screen.getByLabelText('Phone');
   const firstNameField =  screen.getByLabelText('FirstName');
   const lastNameField = screen.getByLabelText('LastName');
   const saveButton = screen.getByLabelText('SaveProfile');

    userEvent.clear(phone);
    userEvent.type(phone, profile.phone);

    userEvent.clear(emailField);
    userEvent.type(emailField, profile.email);

    userEvent.clear(firstNameField)
    userEvent.type(firstNameField, profile.firstname);

    userEvent.clear(lastNameField)
    userEvent.type(lastNameField, profile.lastname)

    userEvent.click(saveButton);
    console.log(saveButton.disabled,'--',validator.isMobilePhone(profile.phone))
    expect(useDispatchMock).toHaveBeenCalledWith(editProfile(profile));
});


test('Profile button not clickable if all fields not valid', async () => {
 // useSelectorMock.mockReturnValue(INITIAL_STATE)
//  console.log(store.getState());
  
     render(
      <ReactRedux.Provider store={store}>
        <BrowserRouter>
        <Routes>
             <Route path={"/"} element={<Profile/>} />
        </Routes>
        </BrowserRouter>
        </ReactRedux.Provider>);
 
     //get all the elements to be tested
     const emailField =  screen.getByLabelText('EmailAddress');
     const phone = screen.getByLabelText('Phone');
     const firstNameField =  screen.getByLabelText('FirstName');
     const lastNameField = screen.getByLabelText('LastName');
     const saveButton = screen.getByLabelText('SaveProfile');

    userEvent.clear(phone);
    userEvent.type(phone, 'pppiuuiui');
    expect(saveButton.disabled).toBeTruthy();
    userEvent.clear(phone);
    userEvent.type(phone, '1230900982');
    expect(saveButton.disabled).toBeFalsy();


    userEvent.clear(emailField);
    userEvent.type(emailField, 'test@@email.com');
    expect(saveButton.disabled).toBeTruthy();
userEvent.clear(emailField);
    userEvent.type(emailField, 'test@email.com');

    userEvent.clear(firstNameField)
    //userEvent.type(firstNameField, 'fntest');
        console.log(saveButton.disabled,'--',firstNameField.value)

    expect(saveButton.disabled).toBeTruthy();
    userEvent.clear(firstNameField)
    userEvent.type(firstNameField, 'fntest');


    userEvent.clear(lastNameField)
   // userEvent.type(lastNameField, '')
    expect(saveButton.disabled).toBeTruthy();
    userEvent.clear(lastNameField)
    userEvent.type(lastNameField, 'tttttttest')

    userEvent.click(saveButton);
   expect(saveButton.disabled).toBeFalsy();
  //expect(useDispatchMock).not.toHaveBeenCalled();

 
     userEvent.click(saveButton);
    console.log(saveButton.disabled);
    expect(useDispatchMock).toHaveBeenCalledWith(editProfile({firstname:'fntest', lastname:'tttttttest', email:'test@email.com', phone:'1230900982'}));
});

/**afterAll(() => {
  app.logout();
  expect(app.currentUser ).ToBeNull();
});
*/
});