/**
 * @jest-environment jsdom
 */
 import React from 'react';
 import * as ReactRedux from 'react-redux';

import { render, screen, fireEvent,createEvent ,waitFor,act } from '@testing-library/react';

import Reservations from '../checkout/Reservations';

import { BrowserRouter, Routes, Route} from 'react-router-dom';
import userEvent from '@testing-library/user-event'
import { configureStore } from '@reduxjs/toolkit'
import {appReducer} from '../redux/reducers/appReducer';
import {logger} from 'redux-logger';
import {INITIAL_STATE} from '../constants';



  describe('Reservations Test', () => {
  

  let app = null;
 let signin = null;

  const useSelectorMock = jest.spyOn(ReactRedux, 'useSelector');
  const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');
   let  store = configureStore({ reducer: { user: appReducer }, INITIAL_STATE })

//beforeAll(() => {  });


/**
*
*/
beforeEach(() => {
  useSelectorMock.mockClear();
  useDispatchMock.mockClear();
})

/**
*
*/
test('Reservation displays expected text',  () => {
    useSelectorMock.mockReturnValue(INITIAL_STATE.reservations);
   const reservation = INITIAL_STATE.reservations[0];
console.log(store.getState().reservations);
     render(
        <ReactRedux.Provider store={store}><BrowserRouter>
        <Routes>
        <Route path="/" element={<Reservations/>} />
        </Routes>
        </BrowserRouter></ReactRedux.Provider>);

 
  const headerColumn = screen.getByLabelText('createdColumn');
  //const wholename = screen.getByLabelText('wholename');
 //screen.debug(wholename);
  screen.getByText(reservation.email);
  screen.getByText(reservation.phone);
//  screen.getByText(reservation.dropOffLocation);
  screen.getByText(reservation.pickupLocation);

  //expect(true).toBe(true);


});


});