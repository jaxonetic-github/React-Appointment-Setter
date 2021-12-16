import React from 'react';
import {useNavigate} from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//import validator from 'validator'
import {FirstNameAriaLabel, LastNameAriaLabel, EmailAriaLabel, PasswordAriaLabel} from '../constants'
import {register} from '../redux/reducers/appReducer';

const theme = createTheme();


/**
 * @description SignUp: take basic info and use it to register a user and log in 
 * 
 * 
 */
function SignUp({bgColor}) {
   const stateError = useSelector((state)=>state.error);
    const profile = useSelector((state)=>state?.profile);

  const [error, setErrorMsg] = React.useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

     React.useEffect(() => {
if(profile) {console.log('Already logged in; so, forcing home redirect.');  navigate('/');}
},[profile,navigate]);
/**
 * Performs the registration when user Submits form by 
 * 1. reads the form data 
 * 2. Attempts to register with credentials{email, password}.
 * 3. Navigates home on success or displays any errors
 * 
 * @param event: the submit event
 */
  const handleSubmit = async (event) => {
//clear errors on resubmission
    setErrorMsg(null);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
   
    const submissionInfo = {email:data.get('email'), password:data.get('password'), firstname:data.get('firstName'), lastname:data.get('lastName')};

     dispatch(register(submissionInfo));          
          
  };

  return (
    <ThemeProvider theme={theme}>
      <Container  sx={{backgroundColor: bgColor}} component="main" maxWidth="xs">
        <CssBaseline />
        <Box  sx={{
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
            Sign up
          </Typography>
           <Typography component="span"  align="center" sx={{color:'red'}}>
       {error}{stateError}
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  inputProps={FirstNameAriaLabel}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  inputProps={LastNameAriaLabel}

                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  inputProps={EmailAriaLabel}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  inputProps={PasswordAriaLabel}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              aria-label="Submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button aria-label='signInLink' onClick={()=>navigate('/signin')} href="#" variant="body2">
                  Already have an account? Sign in
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;