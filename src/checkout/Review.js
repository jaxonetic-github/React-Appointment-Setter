import * as React from 'react';

//import { ApiError, Client, Environment,square } from 'square'
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { FEE_FORMULA, NameOnCardAriaLabel } from '../constants';
import TextField from '@mui/material/TextField';
import SquarePaymentForm from './squarePayComponent.js';
/**
* Review component is the final stage of the Reservation process where the user can
* view the details of the desired reservation  and finalize with payment
*
* @param props : 
*     props.reservation   - expects a Reservation javascript object {} used to fill component data
*     props.handleSuccess - expects a callback upon succesful submission of credit card info 
*/
function ReviewFragment(props) {

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {FEE_FORMULA.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $34.06
          </Typography>
        </ListItem>
      </List>

      <Grid container spacing={1}>
        <Grid item xs={12} sm={10}>
          <Box sx={{
    paddingBottom: 2,
    paddingTop: 2,
    marginInline: 'auto',
    borderBlock: 'groove'}} >
          <Typography variant="h5" gutterBottom >
            Itinerary
          </Typography>
          <Typography gutterBottom>{'Contact : '}{props.reservation.firstName} {props.reservation.lastName}</Typography>
          <Typography gutterBottom>{'Pick-up : '}{props.reservation.pickupLocation}{new Date(props.reservation.pickupDate).toLocaleString()}</Typography>
          <Typography gutterBottom>{'Drop-off : '}{props.reservation.dropOffLocation}{new Date(props.reservation.dropOffDate).toLocaleString()}</Typography>                    
          </Box>
        </Grid>
      </Grid>

       <Typography variant="h5" gutterBottom sx={{marginTop:3}}>
        Secure Payment
      </Typography>
       <Grid item xs={12} md={6}>
          <TextField
          inputProps={NameOnCardAriaLabel}
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
          />
        </Grid>

   <SquarePaymentForm data-testid="SquarePay" handleSuccess={props.handleSuccess}/>
    </React.Fragment>
  );
}
export default ReviewFragment;