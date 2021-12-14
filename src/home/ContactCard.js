import  React , {useState} from 'react';
import { useSelector } from 'react-redux'

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import Input from '@mui/material/Input';

import AdminDrawerMenu from './AdminMenu';

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

import {  isAdminSelector} from '../constants';

const selectContactData = state => state?.siteData?.contactData;

/**
 * @description  Display Contact Info
 */
function ContactCard(props) {
  const navigate = useNavigate();
    const app = null;
    const componentData = useSelector(selectContactData);
const [displayData, setDisplayData] = useState(componentData);
   const [edit, setEditMode] = useState(false);
  const [editable] = useState(isAdminSelector);
 const [drawerState, setDrawerState] = React.useState(false);



  const toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerState(!drawerState);
  };

//console.log(app,'----',editable,"editable",app?.profile?.email);
  //const displayData = props.cardData? props.cardData :app?.siteData?.cardData;
//setDisplayData(app?.siteData?.cardData)
 //console.log(title,'  +==============++',app?.siteData?.pageData?.title);
 // });  


  const handleSave = async (event) => {
    // eslint-disable-next-line no-console
    
      try {   
      const obj = {cardData:app?.siteData?.cardData,pageData:app?.siteData?.pageData, contactData:displayData };
      await app?.editHomeData(obj)

    } catch (err) {
     console.log('CONTACT err',err);
  }
}

  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />

{AdminDrawerMenu(toggleDrawer,handleSave, drawerState,editable,setEditMode, edit)}

      <Container sx={{marginTop:10}} maxWidth="md" component="main">
        <Grid container spacing={2} alignItems="flex-end">
        
            <Grid item key={componentData?.title} xs={12} sm={12} md={12}>
              <Card><img src={componentData?.imageURL}  className="driver1-image" alt="logo" />
                <CardHeader
                  title={componentData?.title+'hjbghjgj'}
                  subheader={componentData?.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={componentData?.title === 'Pro' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  
                  <ul>
                    { componentData?.description.map((line,descriptionIndex) => (
                      <Typography
                        component="li"
                       
                        align="center"
                        key={descriptionIndex+line}
                      >
                  {line}
                   {edit &&    <Input   id="makeReservation"
                  label="Make Reservation"
                  onBlur={(event)=>{
                    const clone = JSON.parse(JSON.stringify(displayData));
                    clone.description[descriptionIndex]=event.target.value;
                    console.log( event.target, 'cloning and resetting', clone);
                  setDisplayData(clone);
                    

                }}
                  name="makeReservation"
                  defaultValue={componentData.description[descriptionIndex]}
               
                />}
                      </Typography>
                    ))}
                  </ul>
                 {  <Button variant='outlined' fullWidth size="large" onClick={()=>navigate('/checkout')}  sx={{ mt: 2 , color:'605757'}}>{'reserve now '}<AirportShuttleIcon/></Button>}
                </CardContent>
        
              </Card>
            </Grid>
          
        </Grid>
      </Container>
     
    </React.Fragment>
  );
}

/**  @module ContactCard */
export default ContactCard;
