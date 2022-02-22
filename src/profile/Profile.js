import * as React from 'react';
import {  useSelector, useDispatch } from 'react-redux'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
//import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
//import Input from '@mui/material/Input';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
//import { createTheme, ThemeProvider } from '@mui/material/styles';
import {PhoneAriaLabel, FirstNameAriaLabel, LastNameAriaLabel, EmailAriaLabel} from '../constants'
import validator from 'validator';
import { useNavigate} from "react-router-dom";
import  {editProfile} from '../redux/reducers/appReducer'


//const theme = createTheme();

/**
 * Profile : Displays User specific and saved info.
 *           Button disabled until all fields are validated
 */
function Profile({bgColor}) {
    const navigate = useNavigate();
    const profile = useSelector((state)=>state?.profile);
    const loggedInUser = useSelector((state)=>state?.profile?.email);
  const  dispatch = useDispatch();

 const [firstName, setFirstName] = React.useState(profile?.firstname||'');
  const [lastName, setLastName] = React.useState(profile?.lastname||'');
  const [email, setEmail] = React.useState(profile?.email||'');
  const [phone, setPhone] = React.useState(profile?.phone||'');

  const [isEmailValid, setIsEmailValid] = React.useState(validator.isEmail(email));
  const [isPhoneValid, setIsPhoneValid] = React.useState(validator.isEmail(email));
  const [isLastNameValid, setIsLastNameValid] = React.useState(!validator.isEmpty(lastName));
  const [isFirstNameValid, setIsFirstNameValid] = React.useState(!validator.isEmpty(firstName));
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if(!loggedInUser) {console.log('User with no Profile logged in; so, forcing home redirect.'); navigate("/");}
  },[loggedInUser,navigate/*,firstName,lastName,email,phone*/]);


/**
 *  Validate all fields
 */
function componentValidated  (){

    const validated = (isPhoneValid && isEmailValid  && isFirstNameValid && isLastNameValid);
//console.log(isPhoneValid, isEmailValid, isFirstNameValid, isLastNameValid)
    return validated;
}


  /**
   * @Desc dispatches the editProfile action if all fields have been validated
   * @param object  event, usually the HTMLEvent
   */
  const handleSubmit = async (event) => {

if(componentValidated())  dispatch(editProfile({firstname:firstName, lastname:lastName, email:email, phone:phone}));
else{setError('Unable to continue, found invalid fields')}
  };

  return (

      <Container  sx={{backgroundColor: bgColor}} component="main" maxWidth="xs">
      
        <Box
          sx={{
            backgroundColor:bgColor,
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Profile
          </Typography>
       {error}
          <Box component="form" noValidate onSubmit={handleSubmit}   sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  defaultValue={profile?.firstname}
                  fullWidth
                  id="firstName"
                  label="First Name"
                  inputProps={FirstNameAriaLabel}
                      onChange={(event)=>{
                         const validFirstName = !validator.isEmpty(event.target.value);
                        if(validFirstName){
                          console.log(`event.target.value=${event.target.value}`)
                        setFirstName(event.target.value);
                        setIsFirstNameValid(validFirstName);
                        setError('');
                        } else
                        { setIsFirstNameValid(false)
                          setError('Invalid or missing First Name');
                      }
                      }
                  }

                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  defaultValue={profile?.lastname}
                  inputProps={LastNameAriaLabel}
                  placeholder='Last Name'
                  onChange={(event)=>{
                    const validLastName = !validator.isEmpty(event.target.value);
                        if(validLastName){
                        setLastName(event.target.value);
                        setIsLastNameValid(validLastName);
                        setError('');
                        } else 
                      {
                        setIsLastNameValid(false);
                        setError('Invalid or missing Last Name');
                      }
                      
                      }
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  defaultValue={profile?.email}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  inputProps={EmailAriaLabel}
                  onChange={(event)=>{
                    const validEmail = !validator.isEmpty(event.target.value);
                        if(validEmail){
                        setEmail(event.target.value);
                        setIsEmailValid(validator.isEmail(event.target.value));
                        setError('');
                        } else setError('Invalid or missing Email');
                      }
                  }                    
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  defaultValue={profile?.phone}
                  fullWidth
                  name="phone"
                  label="phone"
                  inputProps={PhoneAriaLabel}
                  type="phone"
                  id="phone"
                  onChange={(event)=>{
                    const validPhone = !validator.isEmpty(event.target.value)  ;
                        if(validPhone){
                        setPhone(event.target.value);
                        setIsPhoneValid( validator.isMobilePhone(event.target.value));
                        setError('');
                        } else setError('Invalid or missing Phone');
                      }
                  } 
                         />
              </Grid>
             
            </Grid>
            <Button
             
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
             
            >
              Cancel
            </Button>
            <Button
            aria-label="SaveProfile"
              type="submit"
              fullWidth
             
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!componentValidated()}
            >
              Save
            </Button>
           
          </Box>
        </Box>
      </Container>
  );
}

export default Profile;