import * as React from 'react';
import ApplicationBar from '../navigation/ApplicationBar.js'
//import GeneralInfo from './GeneralInfo';
//import Reservations from './checkout/Reservations';
import { Outlet} from 'react-router-dom';
import Footer from '../navigation/Footer'
//import Agenda from '../calendars/agenda.js'
//const banner = '../images/sideview_closeddoors.jpeg';

//const driverImg = 'https://application-0-iyetn.mongodbstitch.com/assets/driver1.jpeg';
//await app.currentUser.refreshCustomData();
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';

import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import FullScreenAgendaDialog from '../calendars/fullScreenAgendaDialog.js'
import {useNavigate} from "react-router-dom";
import Grid from '@mui/material/Grid';
import Fade from '@mui/material/Fade';
import {APPBAR_INITIAL_COLOR, APPBAR_INITIAL_HEIGHT} from '../constants.js'
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';

/**
 *  <Box
    class="candles"
    style={{
      opacity: 0.8,
    backgroundImage: `url(${url})`,
    backgroundSize: "cover",
    height: "100vh",
    color: "#f5f5f5"
}}/>
 *  @description The Base component for the application without Providers
 */
 function MainComponent ({companyTitle, bannerURL}) {
const trigger = useScrollTrigger();
const navigate = useNavigate();

  return(<Container>

<Slide appear={false} direction="down" in={!trigger}>

    <Box sx={{height:APPBAR_INITIAL_HEIGHT}}>
       <ApplicationBar sx={{borderRadius:5}}  barColor={APPBAR_INITIAL_COLOR} companyTitle={companyTitle}/>
   </Box>
    </Slide>

    <Outlet /> 

 <Box>
    <Footer/>
    </Box>  </Container>
  );
}
export default MainComponent;
