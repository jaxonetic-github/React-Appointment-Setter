import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import {addScheduledItem} from '../redux/reducers/appReducer';
import { Scheduler } from "@aldabil/react-scheduler";
import {  useDispatch, useSelector } from 'react-redux'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/styles';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


/**
* @param {string} displayAs : 'Button' || 'Accordion'
*/
export default function FullScreenAgendaDialog({displayAs, onConfirm}) {
 const scheduledItems = useSelector((state)=>state?.availability);
 const state = useSelector((state)=>state);
 const dispatch = useDispatch();
 const [open, setOpen] = React.useState(false);
  const [selectedDateTime, setSelectedDateTime] = React.useState('');
 const theme = useTheme();
  const fullScreen = useMediaQuery(theme?.breakpoints?.down('md'));
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

          
  const handleConfirm = async (event, action) => {
    const stampedEvent = { ...event,
          event_id: event.event_id || Math.random(),
        }
    const finalEvent =  {target:{name:'appointmentDateTime',value:stampedEvent } };
   
       console.log(stampedEvent,'****************',typeof stampedEvent.start.toUTCString())
    setSelectedDateTime(stampedEvent.start.toUTCString());
       if(onConfirm)
        onConfirm(finalEvent);
    
    /**
     * Make sure to return 4 mandatory fields:
     * event_id: string|number
     * title: string
     * start: Date|string
     * end: Date|string
     * ....extra other fields depend on your custom fields/editor properties
     */
    // Simulate http request: return added/edited event
    return new Promise((res, rej) => {
      setTimeout(() => {
        stampedEvent.temporary = true;
        res(stampedEvent);
      }, 1000);
    });
  };



const AccordionView = ({children,selectedDate})=>{ 


  React.useEffect(() => {
    console.log('cew selectedDate? ',selectedDate)

  },[selectedDate ]);

  return (<Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>View Availability {selectedDate}</Typography> 
        </AccordionSummary>
        <AccordionDetails>
        {children}
        </AccordionDetails>
      </Accordion>);

}

 const AppScheduler = ()=><Scheduler
  view="month"
  month={{
weekDays: [0, 1, 2, 3, 4, 5,6], 
weekStartOn: 1, 
startHour: 9, 
endHour: 21,
}}
 week={{ 
weekDays: [0, 1, 2, 3, 4, 5,6], 
weekStartOn: 6, 
startHour: 9, 
endHour: 21,
step: 60
 }}
day={{
  
startHour: 9, 
endHour: 21, 
step: 60
 }}
dialogMaxWidth="sm"
  onConfirm={handleConfirm}
  events={scheduledItems?.map((item)=>item)}
/>     

 console.log(Object.keys(scheduledItems),'massages=>',typeof scheduledItems,typeof scheduledItems[0]);
  return (
    displayAs==='Accordion'?(<AccordionView selectedDate={selectedDateTime}><AppScheduler/></AccordionView>) :(<AppScheduler onClick={(event)=>console.log('schedulue cal event lick::', event)}/>)

  );
}