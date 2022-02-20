import  * as React from 'react';
import { useSelector } from 'react-redux'
import FullScreenAgendaDialog from '../calendars/fullScreenAgendaDialog.js'

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import {/*PickUpDateAriaLabel,*/PickUpLocationAriaLabel,/*DropOffDateAriaLabel,DropOffLocationAriaLabel,*/
FirstNameAriaLabel,LastNameAriaLabel,EmailAriaLabel,PasswordAriaLabel,PhoneAriaLabel}  from '../constants'
//import LocationSelect from './locationSelect.js';
import CreatableSelect from 'react-select/creatable';
//import {  OnChangeValue } from 'react-select';

/**
 *  Display itinerary specific field for user input
 */
 function SetAppointmentFragment({onChange}) {

 const [selectedLocation, setSelectedLocation] = React.useState('');

  const currentUser = useSelector((state)=>state.profile);

const isPasswdNeeded = (currentUser?.email==null);
const locations = [{label:'Alchemeia Center', value:'262 E Pastime rd, Tucson Az,'},
                    {label:'ASIS Massage', value:'000 4th St, Tucson AZ'}];


  return (
    <React.Fragment>
    <FullScreenAgendaDialog onConfirm={onChange} displayAs={'Accordion'}/>
      <Typography variant="h6" sx={{marginBottom:3, marginTop:3}} >
        Appointment Location
      </Typography>
        <h6>{selectedLocation}</h6>
        <CreatableSelect name='locationSelect' isClearable  aria-label={PickUpLocationAriaLabel['aria-label']} onChange={(event)=>{ const newArg={target:{name:'locationSelect', value:event.value} }; setSelectedLocation(event.value) ; onChange(newArg);}} options={locations}/>
      
      <Typography variant="h6" sx={{marginBottom:3, marginTop:3}} >
        Contact Info
      </Typography>

      <Grid container spacing={3}>
     <Grid item xs={12} sm={6}>
   
          <TextField
                
                  name="firstName"
                 placeholder='First Name'
onChange = {onChange}
                  
                  id="firstName"
                  inputProps={FirstNameAriaLabel}
                  defaultValue={currentUser?.firstname}
                />
              </Grid>
        <Grid item xs={12} sm={6}>
                <TextField
                  
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
                  defaultValue={currentUser?.phone}

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

export default SetAppointmentFragment;
