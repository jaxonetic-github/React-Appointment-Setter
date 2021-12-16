import  React , {useState} from 'react';
import { useSelector } from 'react-redux'

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import Input from '@mui/material/Input';
import FullScreenAgendaDialog from '../calendars/fullScreenAgendaDialog.js'
import  Divider  from '@mui/material/Divider';
import  Box  from '@mui/material/Box';

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

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

//const selectCardsData = state => state?.siteData?.cardData;

/**
 * @description  InfoCards, is a an editable fragment of the  home page.  If User is Admin then 
 *      a special "admin" menu is available allowing the user to change text
 */
function AppointmentHome({bgColor}) {
  const theme = useTheme();
  const matches = useMediaQuery('(min-width:600px)');
  const navigate = useNavigate();
  const [getCardData] = useState([{title:'View Availability Calendar', imageURL:'https://jaxonetic-github.github.io/React-Appointment-Setter/astroclock.jpeg'},{title:'Book Appointment',imageURL:'openCalendar.jpeg'}])
  const url = 'https://jaxonetic-github.github.io/React-Appointment-Setter/coveredInFlowers.jpeg';


  return (
    <React.Fragment>

<Container sx={{margin: 0, padding: 0, }}>
    <Grid container spacing={2} sx={{alignItems: 'center'}} >
  <Grid item={true} xs={12} md={5}  >
     <Card  sx={{ margin: 'auto' ,maxWidth:600}}><CardMedia component="img" alt="banner" image={url} /></Card>
  </Grid>
  <Grid  item={true}  xs={12} md={6} sx={{alignItems: 'center'}}>
  <Card sx={{ margin: 'auto',maxWidth:600}}><CardHeader title={'Massage & Reiki Therapy'}  titleTypographyProps={{ align: 'center' }}     >Massage Therapy</CardHeader>
  <CardContent> Massage, cupping and reiki</CardContent>
  <CardContent>Welcome to your portal for private alternative care.  I specialize in working
  with athletes and healthcare workers or those who have higly stressful professions.</CardContent>
  </Card>
  </Grid>
</Grid>

 <Card ><CardHeader title={'Pricing'}  titleTypographyProps={{ align: 'center' }}></CardHeader>
  <CardContent sx={{maxWidth:'80'}}> 
     <Grid container spacing={0} >
  <Grid item={true} xs={8} md={4}  sx={{ margin: 'auto'}}>
    <Box>
      <dl><h3>In Studio<sup>+$30 travel expense</sup></h3>
      <dt><u>Therapeutic Massages </u></dt><dd>: $80/70min or $140/120min (+1 addons)</dd>
      <dt>Bulk deal</dt><dd>: 5 * 70min massages for $400</dd>
      <dt><u>Add-Ons</u> </dt><dd></dd>
      <dt>Cupping </dt> <dd>: $10 for 20min</dd>
      <dt>Reflexology </dt> <dd>: $10 for 10min</dd>
      </dl>
    </Box>
  </Grid>
  <Grid  item={true}  xs={8} md={4} sx={{ margin: 'auto'}}>
    <Box > 
      <dl><h3>Rituals & Meditations</h3>
      <dt>Guided Meditations</dt><dd>: $90/70min or $140/120min </dd>
      <dt>Elemental Meditations (ex. Tattwa Shudhi) </dt><dd>: $40 for 30min</dd>
      <dt>Rituals </dt> <dd>: $500 </dd>
      </dl>
    </Box>
    </Grid>

</Grid>
   </CardContent >
  </Card>
   <Box sx={{ margin:'auto', justifyContent: 'space-around' , width:300}}>
     <Button variant='outlined'  size="small" onClick={()=>navigate('/availabilityCalendar')}  sx={{ mt: 2 , color:'605757'}}>{'View Availability'} </Button>
     <Button variant='outlined'  size="small" onClick={()=>navigate('/checkout')}  sx={{ mt: 2 , color:'605757'}}>{'Book Appointment'} </Button>
    </Box>

</Container>
    
    </React.Fragment>
  );
}


export default AppointmentHome;
