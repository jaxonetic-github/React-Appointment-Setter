import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import CreatableSelect from 'react-select/creatable';
import {  OnChangeValue } from 'react-select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const locations = [{label:'Alchemeia Center', value:'262 E Pastime rd, Tucson Az,'},
                    {label:'ASIS Massage', value:'000 4th St, Tucson AZ'}];

export default function LocationSelect() {
  const [location, setLocation] = React.useState([]);
  const [userLocation, setUserLocation ] = React.useState([]);

  const handleChange = (value, meta) => {

 console.log(value.target.value, meta)
   
        console.log(location,'----loc change--',value.target.value.length,value.target.value);

    setLocation(value.target.value);
  };


  const handleLocationChange = (value, meta) => {

   
    console.log(`value---${value.target.value}--${meta}`);
    setUserLocation(value.target.value);
        setLocation(null);

  };


  return (
    <div>
     <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">123 Address St, City State,</InputLabel>
        <Select  isClearable

          labelId="demo-multiple-checkbox-label"
          id="demo-mult.iple-checkbox"
          multiple
          value={[location]}
          onChange={handleChange}
         input={<OutlinedInput label="123 Address St, City State," />}
          renderValue={(selected) =>{ console.log(location,'|||||||selected',selected); return selected;}}
          MenuProps={MenuProps}
        >
        <MenuItem key={'alt'} value={`${userLocation}`}>
              <TextField             
                 placeholder='123 Address St, City State,'
                onChange={handleLocationChange}
                  fullWidth
                  id="altLocation"
                 
                />
            </MenuItem>
          {locations.map((loc) => (
            <MenuItem key={loc.name} value={loc.value}>
             
              <ListItemText primary={loc.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
   
    </div>
  );
}
