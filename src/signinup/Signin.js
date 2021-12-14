import React from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from "react-router-dom";
import {  useSelector,useDispatch } from 'react-redux'
import { login} from '../redux/reducers/appReducer';


const theme = createTheme();
const PasswordAriaLabel = { 'aria-label': 'Password' };
const EmailAriaLabel = { 'aria-label': 'EmailAddress' };

/**
 * @description Perform Sign-in when user Submits form by 
 * 1. Reads the form data 
 * 2. Attempts to signin with credentials{email, password}.
 * 3. Navigates home on success or displays any errors
 * 
 * 
 */
function SignIn({bgColor}) {
   const stateError = useSelector((state)=>state.error);
   const loginSuccessful = useSelector((state)=>state?.profile?.email);
 //const  app = useRealmApp();
const navigate = useNavigate();
  const [error, setErrorMsg] = React.useState('');
      const dispatch = useDispatch(); //(action)=>(console.log(action));
 

     React.useEffect(() => {
if(loginSuccessful) {console.log('Already logged in; so, forcing home redirect.'); navigate('/'); }

  });

/**
 * Performs the Signin when user Submits form
 * 
 */
  const handleSubmit = async (event) => {
//clear errors on resubmission
    setErrorMsg(null);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const credentials = {
      email: data.get('email'),
      password: data.get('password'),
    }
try{     dispatch(login(credentials)); 
/*app.logIn(credentials);*/ }catch{ setErrorMsg('We are having difficulties logging you in.')} };

  return (
    <ThemeProvider theme={theme}>
      <Container  sx={{backgroundColor: bgColor}} component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
           backgroundColor: bgColor,
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
            Sign in
          </Typography>
              <Typography component="span" aria-label='Error'  align="center" sx={{color:'red'}}>
    {error}{stateError}
          </Typography>
          <Box component="form" onSubmit={(event)=>handleSubmit(event)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label='Enter Your Email Address'
              id="email"
              inputProps={EmailAriaLabel}
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              inputProps={PasswordAriaLabel}
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              aria-label="Submit"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Button  href="#" variant="body2">
                  Forgot password?
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={()=>navigate('/signup')} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;