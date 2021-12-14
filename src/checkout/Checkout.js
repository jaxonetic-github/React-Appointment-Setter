import * as React from 'react';
import {  useDispatch, useSelector } from 'react-redux'
//import { useRealmApp } from "../RealmApp";

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SetAppointmentFragment from './setAppointmentFragment';
import AssignmentIcon from '@mui/icons-material/Assignment';

import AgreementForm from './AgreementForm';
import ReviewFragment from './Review';
import {useNavigate} from "react-router-dom";
import validator from 'validator';
import { register,addScheduledItem, insertReservation,creditPaymenError ,creditPaymentSuccess} from '../redux/reducers/appReducer';
const steps = ['Itinerary', 'Agreements', 'Review'];


const theme = createTheme();

/**
 *  Module to take reservations from user. 
 */
 function Checkout({bgColor}) {
  const currentUser = useSelector((state)=>state?.profile);
//  const hasProfile = useSelector((state)=>state?.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = React.useState(currentUser?.firstname||'');
  const [lastName, setLastName] = React.useState(currentUser?.lastname||'');
  const [email, setEmail] = React.useState(currentUser?.email||'');
  const [password, setPassword] = React.useState();
  const [error, setError] = React.useState();
  const [phone, setPhone] = React.useState(currentUser?.phone||'');

  const [activeStep, setActiveStep] = React.useState(0);
  const [pickUpDate, setPickUpDate] = React.useState(new Date());
  const [dropOffDate, setDropoffDate] = React.useState(new Date());
  const [dropOffLocation, setDropoffLocation] = React.useState('');
  const [pickupLocation, setPickupLocation] = React.useState('');
  //const [itineraryValid, setItineraryValid] = React.useState(false);

  const [agreementSignature, setAgreementSignature] = React.useState('');
  const [agreementChecked, setAgreementChecked] =React.useState(false);

  const [paymentSucceeded, setPaymentSucceeded] = React.useState(false);
  const [ScheduledItem,setScheduledItem] = React.useState();

  React.useEffect(() => {
 //console.log(`firstNameState = ${firstName}--,`,currentUser);
    setFirstName(currentUser?.firstname);
  },[currentUser/*,lastName,email,phone*/]);


   function itineraryValidated  (currentStep){
    let validated = false;
    if(currentStep===0){
         const phoneValidated = phone && validator.isMobilePhone(phone);
         const emailValidated = email && validator.isEmail(email);
         const pickupLocationValidated =  !validator.isEmpty(pickupLocation);
         const dropOffLocationValidated = true;// !validator.isEmpty(dropOffLocation);
         const firstNameValidated = firstName && !validator.isEmpty(firstName) ;
         const lastNameValidated =  lastName && !validator.isEmpty(lastName);
           validated = (phoneValidated && emailValidated && pickupLocationValidated && dropOffLocationValidated && firstNameValidated && lastNameValidated);
          console.log(`phone=${phone}, email(${email}),  pickupDate(${pickUpDate}),pickupLocation(${pickupLocation}),dropOffLocationValidated, firstNameValidated(${firstNameValidated}), firstName(${firstName}), lastNameValidated(${lastNameValidated}/ ${lastName})`);
      }else
         if(currentStep===1){
          const agreementSignatureValidated = !validator.isEmpty(agreementSignature);
          validated = agreementSignatureValidated && agreementChecked;
         }
         else 
          if(currentStep===2) {
            //if we made it this far everything has been validated
            validated = paymentSucceeded;
          }

      return validated;
}

function getStepContent(step) {
  const tmpRes = {
                    userid:'realmApp?.currentUser?.id',
                   pickUpDate:pickUpDate,
                    dropOffDate:dropOffDate,
                   dropOffLocation:dropOffLocation,
                   pickupLocation:pickupLocation,
                   firstName:firstName,
                    lastName:lastName,
                      email:email,
                      createdDate:new Date(),
                      phone:phone}; 

console.log(tmpRes);
  switch (step) {
    case 0:
    console.log("checkout.getStepContent before ItineraryFragment-->",firstName,lastName,email,phone);
      return <SetAppointmentFragment  onChange={(event)=>onChange(event)}/>;
    case 1:
      return <AgreementForm onChange={onChange} />;
    case 2:
      return <ReviewFragment handleSuccess={(successEvent)=> 
                                        {
                                          if(successEvent.status==='OK'){
                                            dispatch(creditPaymentSuccess())
                                          setPaymentSucceeded(true); 
                                        dispatch(insertReservation(tmpRes)); 
                                         setActiveStep(activeStep + 1);
                                       }else{console.log("Credit Error::=>",successEvent.errors);
                                              dispatch(creditPaymenError('Payment Error',successEvent.toString()))}
                                      }}
                      reservation={tmpRes}
            />;
    default:
      throw new Error('Unknown step');
  }
}


 const onChange = (event) =>{
  console.log(event)
    console.log(event.target.name,'---',event.target.value);
     
    switch (event.target.name) {
  case 'appointmentDateTime':setScheduledItem(event.target.value);
                            setPickUpDate(event.target.value.start); break;
  case 'locationSelect':setPickupLocation(event.target.value); break;
  case 'agreementSignature':setAgreementSignature(event.target.value); break;
  case 'agreementChecked' : setAgreementChecked(event.target.checked); break;
  case 'email':setEmail(event.target.value);break;
  case 'password':setPassword(event.target.value);break;
  case 'phone':setPhone(event.target.value);break;

  case 'firstName':setFirstName(event.target.value);break;
  case 'lastName':setLastName(event.target.value);break;
  case 'pickupdate':setPickUpDate(event.target.value);break;
  case 'dropoffDate': setDropoffDate(event.target.value); break;
  case 'dropoffLocation': setDropoffLocation(event.target.value); break;
  case 'pickupLocation': setPickupLocation(event.target.value); break;
  default:
    console.log(`Sorry, we are out of ${event.target.name}.`);

  }
}
  const handleConfirm = async (event, action) => {
    const stampedEvent = { ...event,
          event_id: event.event_id || Math.random()
        }
    console.log(event, action);
    if (action === "edit") {
      /** PUT event to remote DB */
      console.log('edit');
    } else if (action === "create") {
      /**POST event to remote DB */
     // dispatch(addScheduledItem(stampedEvent))
      console.log(stampedEvent.start,'create', typeof stampedEvent.start)
    }
}

  const handleNext = async (event) => {
          let canContinue = false;
    if(activeStep === steps.length - 1){
        //  const data = new FormData(event.currentTarget);
       
    }
    else if (activeStep === 0){
        //if(fullyValidated){
          if(password ){
          //register with the email and password
              try{
             const {error} =  dispatch(register({email, password, firstName,lastName, phone})) ;
             console.log('result....',error);
             //canContinue = success  ;
             if(error)
             setError(error);
           else canContinue=true;
            // console.log(success,'========',error )
            }catch(err){
        console.log('Error attempting to register user',err);
            }
          
          }//if passwd
    else { canContinue=true;}
if (canContinue) {setActiveStep(activeStep + 1); setError(null)}

   }//if(activestep ===0)
else if(activeStep ===1){
setError(null);
  setActiveStep(activeStep + 1);

}
  }//handlenext();

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    setError(null);

  };

  return (
  

      <Container component="main" maxWidth="sm" sx={{ mb: 4 , backgroundColor: bgColor}}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout 
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. You will be contacted shortly by your driver to make introductions and finalize the registration.
                </Typography>
                <Button variant='outlined' sx={{ marginTop:'20px' }}  size="large" onClick={()=>{ navigate('/reservations');}}><AssignmentIcon />View Reservations</Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                  disabled={!itineraryValidated(activeStep)}
                  aria-label='Next'
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </Box>
    <Typography component="span"  align="center" sx={{color:'red'}}>
       {error}
          </Typography>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>

  );
}

/** 
 *  @module Checkout 
 *  @description Autonomous reserve and checkout w/payment modulue
 */
export default Checkout;
