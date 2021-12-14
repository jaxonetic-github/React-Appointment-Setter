import  React , {useState} from 'react';
import { useSelector } from 'react-redux'

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import Input from '@mui/material/Input';
import FullScreenAgendaDialog from '../calendars/fullScreenAgendaDialog.js'


import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
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
function AppointmentHome(props) {
  const navigate = useNavigate();
  const [getCardData] = useState([{title:'View Availability Calendar', imageURL:'astroclock.jpeg'},{title:'Book Appointment',imageURL:'openCalendar.jpeg'}])

  const displayActionByIndex = index =>
                  {
                     switch(index){
                    case 0 : return <FullScreenAgendaDialog/>;
                    case 1 : return <Button variant='outlined' fullWidth size="large" onClick={()=>navigate('/checkout')}  sx={{ mt: 2 , color:'605757'}}>{'Make Appointment'} <AirportShuttleIcon/></Button>;
                     default :return null;
                    }
                  }

  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />

      <Container sx={{marginTop:10}} maxWidth="md" component="main">
        <Grid container spacing={2} alignItems="flex-end">
          { getCardData?.map((tier, index) => (
            <Grid item key={tier.title} xs={12} sm={12} md={6}>
              <Card><img src={tier.imageURL}  className="driver1-image" alt="logo" />
                <CardHeader
                  title={tier.title}        
                  titleTypographyProps={{ align: 'center' }}     
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  {displayActionByIndex(index)}
                 
                </CardContent>
        
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
     
    </React.Fragment>
  );
}


export default AppointmentHome;
