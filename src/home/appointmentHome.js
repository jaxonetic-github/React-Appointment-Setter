import  React , {useState} from 'react';
import { useSelector } from 'react-redux'

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import Input from '@mui/material/Input';
import FullScreenAgendaDialog from '../calendars/fullScreenAgendaDialog.js'


import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';

import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
//import {Link as ReactLink} from "react-router-dom";
import { useNavigate} from "react-router-dom";

import AdminDrawerMenu from './AdminMenu';
import {  isAdminSelector} from '../constants';


//const selectCardsData = state => state?.siteData?.cardData;

/**
 * @description  InfoCards, is a an editable fragment of the  home page.  If User is Admin then 
 *      a special "admin" menu is available allowing the user to change text
 */
function AppointmentHome({bgColor}) {
  const navigate = useNavigate();
  const [getCardData] = useState([{title:'View Availability Calendar', imageURL:'astroclock.jpeg'},{title:'Book Appointment',imageURL:'openCalendar.jpeg'}])
const url = 'coveredInFlowers.jpeg';


  return (
    <React.Fragment>
      <GlobalStyles styles={{backgroundColor: bgColor, ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />

<Container sx={{margin:5, backgroundColor: bgColor}}>
    <Grid container spacing={3} columns={6}>
  <Grid item xs={3}>
     <Card><CardMedia component="img" alt="banner" image={url} /></Card>
  </Grid>
  <Grid item xs={3}>
  <Card><CardHeader title={'Massage & Reiki Therapy'}  titleTypographyProps={{ align: 'center' }}     >Massage Therapy</CardHeader>
  <CardContent> Massage, cupping and reiki</CardContent>
  <CardContent>Welcome to your portal for private alternative care.  I specialize in working
  with athletes and healthcare workers or those who have higly stressful professions.</CardContent>
  
 <CardActions>
     <Button variant='outlined' fullWidth size="large" onClick={()=>navigate('/availabilityCalendar')}  sx={{ mt: 2 , color:'605757'}}>{'View Availability'} </Button>
     <Button variant='outlined' fullWidth size="large" onClick={()=>navigate('/checkout')}  sx={{ mt: 2 , color:'605757'}}>{'Book Appointment'} </Button>

      </CardActions>
  </Card>
  </Grid>

</Grid>
</Container>
     
    </React.Fragment>
  );
}


export default AppointmentHome;
