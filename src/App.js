import React from "react";
import MainComponent from "./home/MainComponent.js";
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
//import GeneralInfo from './home/GeneralInfo';
import Reservations from './checkout/Reservations';
import Checkout from './checkout/Checkout';
import Profile from './profile/Profile';
import SignIn from './signinup/Signin';
import SignUp from './signinup/Signup';
import AppointmentHome from './home/appointmentHome.js';
import {HOME_BANNER_URL, COMPANY_NAME} from './constants.js'
//import { useIdleTimer } from 'react-idle-timer';
import FullScreenAgendaDialog from './calendars/fullScreenAgendaDialog.js'



/*const loginAnonymous = async () => {
    const user = await app.logIn(Realm.Credentials.anonymous());

     axios.get("/React-Appointment-Setter/getObject").then((response) => {
     console.log( '/React-Appointment-Setter/getObject',response.data );
    });
    
  };*/


/**
 *  the Main Component containing the app routes          
 *      <Route path="*" element={<GeneralInfo />} />
 */
function App() {

  const bgColor = 'transparent';// 'cadetblue';

  return (
    <Router>
    <Routes >
          <Route path='/'  element={<MainComponent companyTitle={COMPANY_NAME} bannerURL={HOME_BANNER_URL} />} >
             <Route  index   element={<AppointmentHome  bgColor={bgColor}/>} />
             <Route path={"/profile"} element={<Profile bgColor={bgColor} />} />
             <Route  path={'signin'} element={<SignIn bgColor={bgColor} />} />
             <Route  path={"availabilityCalendar"} element={<FullScreenAgendaDialog  bgColor={bgColor} displayAs={'full'} />} />
             <Route  path={"signup"} element={<SignUp bgColor={bgColor} />} />
             <Route  path={"checkout"} element={<Checkout bgColor={bgColor}/>} />
             <Route path={"reservations"} element={<Reservations bgColor={bgColor} />} />
         </Route>
       </Routes></Router>
  );

}



export default App;