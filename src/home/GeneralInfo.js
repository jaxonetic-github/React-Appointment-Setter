import  React , {useState} from 'react';

import { useSelector } from 'react-redux'
//import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';

//import CardContent from '@mui/material/CardContent';
//import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
//import Grid from '@mui/material/Grid';
//import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import AdminDrawerMenu from './AdminMenu';
import Input from '@mui/material/Input';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { useNavigate} from "react-router-dom";
import InfoCards from './InfoCards'
import ContactCard from './ContactCard'
//import { useRealmApp } from "../RealmApp";
//import { useLocation } from 'react-router-dom';

import {  isAdminSelector} from '../constants';
//import { createBrowserHistory } from 'history';
const selectSiteData = state => state?.siteData?.pageData;
//const selectAuthedUserDataState = state => state?.app?.currentUser?.customData;
/**
 * @description General Info, is the home page.  If User is Admin then 
 *      a special "admin" menu is available allowing the user to change text
 */
function GeneralInfo({siteData}) {

//const location = useLocation();
const getSiteData = useSelector(selectSiteData)
const getIsAdmin = useSelector(isAdminSelector)
  const app  = {};
  app.siteData = getSiteData;
  const navigate = useNavigate();
  const [edit, setEditMode] = useState(false);
  const [editable, setEditableMode] = useState(getIsAdmin);

  //const [error, setError] = useState();
  const [title, setTitle] = useState(getSiteData?.title);
  const [reservationButton, setReservationButton] = useState(app?.siteData?.pageData?.reservationButton);
  const [subtitle, setSubTitle] = useState(getSiteData?.subtitle);
  const [paragraph1, setParagraph1] = useState(getSiteData?.paragraphs[0]);
  const [paragraph2, setParagraph2] = useState(getSiteData?.paragraphs[1]);
  const [drawerState, setDrawerState] = React.useState(false);
 //   const authedUserSelector = useSelector(selectAuthedUserDataState);
 // const [authedUser, setAuthedUser] = useState(authedUserSelector?.email!==undefined);


   React.useEffect(() => {
    setEditableMode(getIsAdmin);
  },[getIsAdmin, getSiteData]);  
  

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
       const obj = {title, subtitle, reservationButton,paragraphs: [paragraph1, paragraph2]};
       const cardData = {pageData:obj,cardData:app?.siteData?.cardData };
       app?.editHomeData(cardData);

    } catch (err) {
     console.log(err)
  }
}



  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
{AdminDrawerMenu(toggleDrawer,handleSave, drawerState,editable,setEditMode, edit)}

          {edit  ? <Box> <label>Replace title with::</label><Input   id="subTitle-replacement"
                  label="Replacetitle"
                  name="Replacetitle"
                  onChange={(event)=>{console.log(event.target.value); setTitle(event.target.value)}}

                  value={title}
                  placeholder='Enter Title text'
                /></Box>
         :<Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
          {title} </Typography>}
          {edit ? <Box> <label>Replace Subtitle With::</label><Input   id="subTitle-replacement"
                  label="ReplaceSubtitle"
                  name="ReplaceSubtitle"
                  onChange={(event)=>setSubTitle(event.target.value)}
                  value={subtitle}
                  placeholder='Enter Button Text'
                /></Box>:
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          {subtitle}</Typography>}
        
        <Box>{edit && <label>Replace 1st Paragraph Text::</label>}
        <Typography onChange={(event)=>setParagraph1(event.target.value)}  component={edit ? "textarea" :'div'}>{paragraph1}</Typography>
        </Box>
         <Box>{edit && <label>Paragraph 2 Replacement Text::</label>} <Typography onChange={(event)=>setParagraph2(event.target.value)}
 component={edit ? "textarea" :'div'}   >{paragraph2}</Typography>
         </Box>
         <Typography>  </Typography>
          <Typography>  </Typography>
          {edit ? <Box>
        <label>Replace ButtonText::</label>
         <Input   id="makeReservation"
                  label="Make Reservation"
                  onChange={(event)=>setReservationButton(event.target.value)}
                  name="makeReservation"
                  value={reservationButton}
                  placeholder='Enter Button Text'
                /></Box>: <Button variant='outlined' fullWidth size="large" onClick={()=>navigate('/checkout')}  sx={{ mt: 2 , color:'605757'}}>{reservationButton}<AirportShuttleIcon/></Button>}
          
         <Typography> </Typography>
         <Typography> </Typography>
          <InfoCards /> 
          <ContactCard />       
      </Container>
       
    </React.Fragment>
  );
}

export default GeneralInfo;
