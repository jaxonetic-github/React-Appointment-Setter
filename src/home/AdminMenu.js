    import React from "react";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';

/**
 * Admin Drawer and Menu for the Admin panel
 */
export default function AdminDrawerMenu(toggleDrawer,handleSave, drawerState,editable,setEditMode, edit) {
  const app  =null;

  const menu = editable && (<React.Fragment key={'right'}>

             <IconButton
                  onClick={toggleDrawer}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 ,position:'relative', top:'50px',justifyContent: 'right'}}
          >
            <MenuIcon />Admin
          </IconButton>

          <Drawer
            anchor={'right'}
            open={drawerState}
            onClose={toggleDrawer}
          >
          <Box component='form' sx={{ p: 2, border: '1px dashed grey', width:200 }}>
 <p>Welcome Awan to your private Admin section</p>

 <Typography component="h5" variant="h5" align="left" color="text.primary" gutterBottom>Admin Options</Typography>
<Switch
  checked={edit}
  onChange={(event)=>setEditMode(event.target.checked)}
  inputProps={{ 'aria-label': 'controlled' }}
/>
  <label>Edit</label>
  <Button onClick={handleSave}>Save</Button>
  <Button onClick={()=>{app.editHomeData(null);  window.location.reload(true);  }}>Reset</Button>
</Box>  </Drawer>
        </React.Fragment>)
  return menu;

      }