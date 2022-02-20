import  React /*, {useState}*/ from 'react';
//import { useSelector } from 'react-redux'

import Card from '@mui/material/Card';
/*
import Button from '@mui/material/Button';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import Input from '@mui/material/Input';
import AdminDrawerMenu from './AdminMenu';
*/
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
//import CssBaseline from '@mui/material/CssBaseline';
//import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
//import GlobalStyles from '@mui/material/GlobalStyles';
//import Container from '@mui/material/Container';
//import {Link as ReactLink} from "react-router-dom";
//import { useNavigate} from "react-router-dom";

import {  /*isAdminSelector,*/CONTACTINFO} from '../constants';

//const selectContactData = state => state?.siteData?.contactData;

/**
 * @description  Display Contact Info
 */
function ContactCard(props) {
 // const navigate = useNavigate();
 //   const app = null;
    const componentData =CONTACTINFO;
//const [displayData, setDisplayData] = useState(componentData);
 //  const [edit, setEditMode] = useState(false);
//  const [editable] = useState(isAdminSelector);
 //const [drawerState, setDrawerState] = React.useState(false);


/*
  const toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerState(!drawerState);
  };
*/
//console.log(app,'----',editable,"editable",app?.profile?.email);
  //const displayData = props.cardData? props.cardData :app?.siteData?.cardData;
//setDisplayData(app?.siteData?.cardData)
 //console.log(title,'  +==============++',app?.siteData?.pageData?.title);
 // });  

/*
  const handleSave = async (event) => {
    // eslint-disable-next-line no-console
    
      try {   
      const obj = {cardData:app?.siteData?.cardData,pageData:app?.siteData?.pageData, contactData:displayData };
      await app?.editHomeData(obj)

    } catch (err) {
     console.log('CONTACT err',err);
  }
}
*/
  return (
    <React.Fragment>

              <Card sx={{margin:'auto',minWidth: 270,width:1/3}}>
                <CardHeader
                  title={componentData?.title}
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
                  
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
        
              </Card>
   
     
    </React.Fragment>
  );
}

/**  @module ContactCard */
export default ContactCard;
