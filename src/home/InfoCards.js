import  React , {useState} from 'react';
import { useSelector } from 'react-redux'

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import Input from '@mui/material/Input';


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


const selectCardsData = state => state?.siteData?.cardData;

/**
 * @description  InfoCards, is a an editable fragment of the  home page.  If User is Admin then 
 *      a special "admin" menu is available allowing the user to change text
 */
function InfoCards(props) {
  const navigate = useNavigate();
  const getCardData = useSelector(selectCardsData);
//  const isAdmin = useSelector(isAdminSelector);
    const app = null;
const [displayData, setDisplayData] = useState(getCardData);
   const [edit, setEditMode] = useState(isAdminSelector);
  const [editable] = useState();
 const [drawerState, setDrawerState] = React.useState(false);


  const toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerState(!drawerState);
  };


/**
 * Admin method which allows Admin to edit or save text changes
 */

  const handleSave = async (event) => {
    // eslint-disable-next-line no-console
    
      try {   
      const obj = {cardData:displayData,pageData:app?.siteData?.pageData };
      await app?.editHomeData(obj)

    } catch (err) {
     console.log('Infocards err',err);
  }
  window.location.reload(true);
} 
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
{AdminDrawerMenu(toggleDrawer,handleSave, drawerState,editable,setEditMode, edit)}

      <Container sx={{marginTop:10}} maxWidth="md" component="main">
        <Grid container spacing={2} alignItems="flex-end">
          { getCardData?.map((tier, index) => (
            <Grid item key={tier.title} xs={12} sm={12} md={6}>
              <Card><img src={tier.imageURL}  className="driver1-image" alt="logo" />
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
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
                    {tier.description.map((line,descriptionIndex) => (
                      <Typography
                        component="li"
                       
                        align="center"
                        key={index+descriptionIndex+line}
                      >
                  {line}
                   {edit &&    <Input   id="makeReservation"
                  label="Make Reservation"
                  onBlur={(event)=>{
                    const clone = JSON.parse(JSON.stringify(displayData));
                    clone[index].description[descriptionIndex]=event.target.value;
                  setDisplayData(clone);
                    event.target.focus();

                }}
                  name="makeReservation"
                  defaultValue={displayData[index].description[descriptionIndex]}
               
                />}
                      </Typography>
                    ))}
                  </ul>
                 {  <Button variant='outlined' fullWidth size="large" onClick={()=>navigate('/checkout')}  sx={{ mt: 2 , color:'605757'}}>{'reserve now '}<AirportShuttleIcon/></Button>}
                </CardContent>
        
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
     
    </React.Fragment>
  );
}


export default InfoCards;
