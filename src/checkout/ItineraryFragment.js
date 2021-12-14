import  * as React from 'react';
import { useSelector } from 'react-redux'

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import {PickUpDateAriaLabel,PickUpLocationAriaLabel,DropOffDateAriaLabel,DropOffLocationAriaLabel,
FirstNameAriaLabel,LastNameAriaLabel,EmailAriaLabel,PasswordAriaLabel,PhoneAriaLabel}  from '../constants'


/**
 *  Display itinerary specific field for user input
 */
 function ItineraryFragment({onChange, firstNameText,lastNameText, phone}) {

  const currentUser = useSelector((state)=>state.profile);

const isPasswdNeeded = (currentUser?.email==null);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Pick up Date
      </Typography>
      <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
          <TextField
            onChange = {onChange}
            inputProps={PickUpDateAriaLabel}
        name="pickupdate"
        id="pickupdate"
        label="Choose a pick up date"
       type="datetime-local"
         defaultValue="2021-11-21T11:30"
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}/>        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
          onChange ={onChange}
            required
            inputProps={PickUpLocationAriaLabel}
            id="pickup-location"
            name="pickupLocation"
            label="Pick Up Location"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
          inputProps={DropOffDateAriaLabel}
          onChange = {onChange}
          name='dropoffDate'
        id="dropoffdate"
        label="Choose a drop off date"
       type="datetime-local"
         defaultValue="2021-11-21T11:30"
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}/>        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
          inputProps={DropOffLocationAriaLabel}
          onChange = {onChange}
            id="dropoff-location"
            name="dropoffLocation"
            label="Drop off Location"
            fullWidth
            variant="standard"
          />
        </Grid>
     <Grid item xs={12} sm={6}>
          <TextField
                
                  name="firstName"
                 placeholder='First Name'
onChange = {onChange}
                  fullWidth
                  id="firstName"
                  inputProps={FirstNameAriaLabel}
                  defaultValue={currentUser?.firstname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
             
                <Input
                  fullWidth
                  id="lastName"
                  name="lastName"
                  inputProps={LastNameAriaLabel}
                  placeholder='Last Name'
onChange = {onChange}
defaultValue={currentUser?.lastname}
                />
              </Grid>
       <Grid item xs={12} sm={6}>
                <Input
                  name="email"
                  onChange = {onChange}
                 placeholder='email'
                  defaultValue={currentUser?.email}
                  inputProps={EmailAriaLabel}
                  fullWidth
                  id="email"
                  label="Email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                onChange = {onChange}
                  fullWidth
                  id="phone"
                  label="Phone"
                  name="phone"
                  inputProps={PhoneAriaLabel}
                  defaultValue={phone}

                  placeholder='Contact #'
                />
              </Grid>

 {isPasswdNeeded && <Grid item xs={12}>
                 <Grid item xs={6} sm={6}>
                 <TextField 
              margin="normal"
              required
              fullWidth
              onChange = {onChange}
              name="password"
              label="Password"
              inputProps={PasswordAriaLabel}
              type="password"
              id="password"
              autoComplete="current-password"
            />
              </Grid>
        </Grid>  }

      </Grid>
    </React.Fragment>
  );
}

export default ItineraryFragment;
