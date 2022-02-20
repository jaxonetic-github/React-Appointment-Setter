import React  from 'react';
import { useSelector,useDispatch } from 'react-redux'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import {logout} from '../redux/reducers/appReducer'

import { useNavigate} from "react-router-dom";

const selectAuthedUserDataState = state => state?.profile;
//const selectProfile = state=>state?.profile;
/**
 * @description Main Application Bar with menus, title and  greeting tologged in users
 */
function ApplicationBar({companyTitle, barColor, barHeight}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authedUserSelector = useSelector(selectAuthedUserDataState);
  const hasProfileSelector = useSelector((state)=>state?.profile?.email);
  //const [authedUser, setAuthedUser] = useState(authedUserSelector?.email);
  const [anchorEl, setAnchorEl] = React.useState(null);
//const location = useLocation();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
 
      <AppBar  sx={{  bgcolor: barColor, minHeight:0, height:barHeight, color:'black' }}>
        <Toolbar >
        <Grid container spacing={3}>
  <Grid item xs={1}>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 4,  }}
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>       
  </Grid>
  <Grid item xs={10}>
    <Box align='center'  ><Typography component="div"
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
          sx={{fontFamily: "cursive",fontWeight: 650}}
         >
            {companyTitle}
          </Typography>
          </Box>
          
  </Grid>

</Grid>
      { hasProfileSelector  ?   <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={()=>{handleClose(); navigate('/');}}><HomeIcon/>Home</MenuItem>
          
                <MenuItem onClick={()=>{handleClose(); navigate('profile');}}><AccountCircle />Profile</MenuItem>
                <MenuItem onClick={()=>{handleClose(); navigate('/reservations');}}><AssignmentIcon />Reservations</MenuItem>
                <MenuItem onClick={()=>{handleClose(); dispatch(logout()); navigate('/');}}>Logout</MenuItem>
              </Menu>
               :<Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={()=>{handleClose(); navigate('/');}}><HomeIcon/>Home</MenuItem>
                  <MenuItem onClick={()=>{handleClose();  navigate('/signin');}}>SignIn</MenuItem>
               
              </Menu>
      }
         {hasProfileSelector? `Hello,${authedUserSelector?.firstname}` : hasProfileSelector}
        </Toolbar>
      </AppBar>
   
  );
}

export default ApplicationBar;
