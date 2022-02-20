import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import {AgreementCheckboxAriaLabel, AgreementAriaLabel, AgreementSignatureAriaLabel} from '../constants.js'
const Agreements = "As a Business person, I take pride and dignity in my role as caregiver and healer. In order to be able assist you please shower before our appointment and be present at least 5 min early to be able to take advantage of all the avaiable time.\n\nFurthermore, although you can register for an appointment without paying immediately, no services will be rendered until payment has been received. Payment can be made securely through this website via ACH or credit card.  Alternatives like Cash App, Zelle, and even Bitcoin or Etherium are also acceptable.\n\n Finally, please give 24 hour notice before cancelling or rescheduling."

/**
 * 
 * 
 */
export default function PaymentForm(props) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>Customer Agreements</Typography>
      <TextareaAutosize
  aria-label={AgreementAriaLabel['aria-label']}
  minRows={3}
  placeholder="Minimum 3 rows"
  style={{ width: 400 }}
  value={Agreements}
/>
      <Grid container spacing={3}>
              <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox inputProps={AgreementCheckboxAriaLabel} onChange={props.onChange} color="secondary" name='agreementChecked' />}
            label="Please check if you agree to the terms above"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
           inputProps={AgreementSignatureAriaLabel}
          name="agreementSignature"
            required
            id="cardName"
            label="Enter your name if you agree"
            fullWidth
            onChange={props.onChange}
            autoComplete="cc-name"
            variant="standard"
            

          />
        </Grid>
        

      </Grid>
    </React.Fragment>
  );
}
