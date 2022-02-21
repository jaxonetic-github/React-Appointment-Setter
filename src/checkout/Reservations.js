import React from 'react';
import { useNavigate} from "react-router-dom";
import { useSelector } from 'react-redux'

import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
//import {fetchReservations} from '../redux/reducers/appReducer'



/**
 *  View a history of Reservations
 * Sample:
 * const reservation = {
 * userid:"6182198ee43796e8d32aff28",
 * pickUpDate:"12:12:10",
 * pickUpTime:"02:03:04"
 * destination:"destinationf"
 * firstName:"A",
 * lastName:"Z",
 * email:"az@email",
 * createdDated:'12:11:12',
 * phone:"555-555-5555"};
 *
 */

function Reservations({bgColor}) {
  const getReservations = useSelector(state=>state?.reservations);
  const navigate = useNavigate();

  // const loginSuccessful = useSelector((state)=>state.profile);
/*
     React.useEffect(() => {
        if(!loginSuccessful)
          {console.log('An attempt to view Reservations from an Unauthorized User has been flagged; so, forcing home redirect.');  navigate('/');}  
      },[loginSuccessful, navigate]);
*/
  //const adjustDate = (someDate)=>(someDate && ((typeof someDate) === 'object' )? someDate.toDateString() : someDate);
 
  return (
    <React.Fragment>
    <Container sx={{backgroundColor: bgColor}}>
   <Toolbar>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
             { getReservations?.length} Reservations 
          </Typography>
        </Toolbar>
   
  
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell aria-label='createdColumn'>Created On</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Location</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
          {getReservations.map((reservation, index) => 
            (<TableRow key={index}>
              <TableCell>{new Date(reservation?.createdDate?.toString()).toLocaleString()}</TableCell>
              <TableCell><span aria-label='wholename'>{reservation?.firstName}{' '}{reservation?.lastName}</span>
              <Divider/><span aria-label='email'>{reservation?.email}</span><p aria-label='phone'>{reservation?.phone}</p></TableCell>
              <TableCell><span aria-label='pickupLocation'>{reservation?.pickupLocation}</span><p >{new Date( reservation?.pickUpDate).toLocaleString()}</p></TableCell>
            </TableRow>)
          )}
          <TableRow >
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
        </TableBody>
      </Table>
           <Button aria-label='another-reservation' variant='outlined'  size="large" onClick={()=>navigate('/checkout')}  sx={{ mt: 2 , color:'605757'}}>
        Make Another Reservation
      </Button>
      </Container>

 
    </React.Fragment>
  );
}

export default Reservations;
