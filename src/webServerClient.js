import { handleAuthenticationError, parseAuthenticationError/*, APP_NOTIFICATIONS*/} from './constants';
    import emailjs, { init } from 'emailjs-com';
//import {DEMO_BACKEND_MGR} from './constants';
import axios from "axios";
//import log from 'loglevel';
import qs from 'qs';


/**
 * @class
 * @description Using the Provider and the React.Context to store teh DB link.
 * 
 * @param demoAppId : The Realm Aplication ID.  If not supplied than a Stub is returned.
 */
export default class WebServerClient  {

  constructor( path){
   this.path = path || '/';
   //this.currentUser = this.loginAnonymously();
   this.app={currentUser:null}
  }

postOptions = (postData, uri)=>{return {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: qs.stringify(postData),
  uri,
};}



/**
 * @desc ensure customData object is not stale
 * 
 * @returns profile info as object
 *
*/
 refreshCustomData = async ()=>{
 await this.app?.currentUser?.refreshCustomData(); 
 return this.app?.currentUser?.customData;
}
   

/**
 * @desc Add an item to schedule
 * 
 * @returns profile info as object
 *
*/
 addScheduledItem = async (item)=>{
    try
    {

 const result = await this.app?.currentUser?.functions.addScheduledItem(item); 

return result;

}catch(error){
    return{error}
}
}

/**
 * @desc ensure customData object is not stale
 * 
 * @returns profile info as object
 *
*/
 getScheduleItems = async ()=>{
    const uri = `${this.path}/getScheduleItems`;
    const  results = await axios.get(uri);
    
 return results.data;
}
/**
 * @desc ensure customData object is not stale
 * 
 * @returns profile info as object
 *
*/
 removeScheduledItems = async ()=>{
 return await this.app?.currentUser?.functions.DeleteFromAvailabilityCalendar(); 
}



/**
 *  Logout current user, by clearing the CurrentUSer, Profile, and Reservations
 */
  logOut = async ()=> {
    const uri = `${this.path}/logout`;
    try{
    const  results = await axios.post(uri);
    
    console.log('results', results);
    return results;
} catch(error){
   //prob network error
    return {error : error.message};
 }
  }



  /**
   *  login with the provided Login Credentials.  After loggin in , set Profile and Reservations
   */
  loginAnonymously = async  ()=> {

    const uri = `${this.path}/loginAnonymously`;
   // const data = { 'bar': 123 };
const options = {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: { 'bar': 123 },
  uri,
};

try{
    console.log(`:DEBUG: WebServerClient anon login uri${uri}`);
      const  loginResult = await axios.post(uri,options);
        //    console.log("anon loginResult->",loginResult);

     return loginResult.data;
 }
 catch(error){
   //prob network error
    return {error : error.message};
 }
}

  /**
   *  login with the provided Login Credentials.  After loggin in , set Profile and Reservations
   *  @return loginresult {id,accesstoken,refreshtoken,customdata} || {error:errmsg}  
   */
  login =async  (credentials) =>{

    const uri = `${this.path}/login`;
    const options = this.postOptions(credentials,uri);

    try
    {
      const  loginResult = await axios.post(options.uri,options.data,options.headers);
      //loginresult {id,accesstoken,refreshtoken,customdata} || {error:errmsg}  
     return loginResult.data;
    } catch(err)
    {
      const msg = handleAuthenticationError(err);
      console.log(msg,'--',err);
     return {error:err}
    }
  }
 

/**
 * Register user by autoconfirmaed email, 
 * @params email, password needed for registration
 * @params firstName, lastName : needed for profile
 * @params phone: optional
 * 
 */
  registerWithEmail =async  (registerData)=> {
    try{
     // const args = {email,password,firstName, lastName, phone};
     //  dispatch(register(args));

        const uri = `${this.path}/registerWithEmail`;
        const options = this.postOptions(registerData,uri);
        const  loginResult = await axios.post(options.uri,options.data,options.headers);
/*
     await this.app.emailPasswordAuth.registerUser(registerData.email, registerData.password);
      await this.app?.logIn(Realm.Credentials.emailPassword(registerData.email, registerData.password));

         //add CustomData
         await this.app?.currentUser?.functions?.AddUserData({...registerData, userid:this.app?.currentUser?.id});
*/    
console.log("registerWithEmailresult",loginResult);
          return  loginResult.data || loginResult;//this.refreshCustomData();


       // const prof = await newUser.functions.GetUserData(newUser.id);
    

    //dispatch(registerSuccess({user:newUser, profile:app?.currentUser?.customData, reservations:reservations}))
/*
try {
      await getReservations();
}catch(err2){console.log('error gettinng reservation',err2)}
*/

}catch(error){
  console.log(error);
   //   dispatch({type: 'REGISTER_FAILED', payload:{error:handleAuthenticationError(error)} });

  return {error:handleAuthenticationError(error)};
}

  }


/**
 * Return Profile of registered user.
 * 
 */
 getProfile = async ()=> {
    
     let prof = null;
     try{
     prof = await this.app?.currentUser?.functions?.GetUserData(this.app?.currentUser?.id);
    }catch(error){
       const { status, message } = parseAuthenticationError(error);
       return {error:status+message};
    }
return prof;
}

/**
 * Edit Profile of registered user.
 * 
 * @param profileObj: 
 * 
 */
 editProfile = async (profileObj)=> {
    const uri = `${this.path}/editProfile`;
    const options = this.postOptions(profileObj, uri);

    try{
       const prof = await axios.put(options.uri,options.data,options.headers);
       console.log('profile edit',prof);
       return prof;
    }catch(error){
    
       return {error:error.message};
    }
}



/**
 * Read Site Data: If user object has the *?.functions* variable available
 *   then retrieve the Site Data, otherwise anonymously login first for access 
 *   to backend functions.
 *  @return {object} site -  {pageData:HOME_PAGE_DEFAULT, cardData:TIERS};
 */
  getSiteData = async ()=> {
 
   //  let site =  {pageData:HOME_PAGE_DEFAULT, cardData:TIERS};
    try{

        const uri = `${this.path}/getSiteData`;
        const  site = await axios.get(uri);

        return site;
    }catch(error){
           return {error:error};
    }
}


/**
 * Edits data  for the Home Page by a registered Admin user.  
 * @param newPageData takes a HOME_PAGE_DEFAULT type object
 */
 editHomeData = async (newPageData) =>{
  
try{
if (newPageData){
const obj ={screen:'home_general',pageData:newPageData.pageData, cardData:newPageData.cardData}
console.log(newPageData,'passing to edithomefuncion',obj);

     const editResults = await this.app?.currentUser?.functions.EditHomeData(newPageData);
console.log('editResults from realm', editResults);
this.setSiteData({screen:'home_general',pageData:newPageData.pageData, contactData:newPageData.contactData, cardData:newPageData.cardData});

}else
{
  console.log('reseting dome data')
  const resetResults = await this.app?.currentUser?.functions?.EditHomeData();
  console.log(resetResults);
  const newdata = await this.getSiteData();
  console.log('new site returned from db=',newdata);

}
}catch(error){
  console.log("EditHomeData Error",error);
  const {  message } = parseAuthenticationError(error);
       console.log(message);
       return {error:message};
}
 

}



/**
 *  Allows a registered user to add a new reservation
 * @param {reservation}
 */
 insertReservations = async  (reservation)=> {
console.log("Web Client", reservation );

    const newReservation = {...reservation, dateAdded :(new Date()), userid:this.app.currentUser?.id };
    const uri = `${this.path}/insertReservation`;
    const options = this.postOptions(newReservation, uri);
try{
    const result = await axios.post(options.uri,options.data,options.headers);
    console.log(result);
    console.log(result.data);
    console.log((typeof result.data));
    console.log(JSON.parse(result?.data).insertedId?.length,'res insert result=',JSON.parse(result?.data).insertedId)
if(JSON.parse(result?.data).insertedId && process.env.REACT_APP_EMAILJS_USERID){
     init(process.env.REACT_APP_EMAILJS_USERID);
    const message = `Reservation requested from (${newReservation.firstName} ${newReservation.lastName}). Contact Info:${newReservation.phone}, ${newReservation.email}`;
     const emailTemplate  =  {to_name:'Alora', from_name:'Alchemeia Notifier', message:message};


 emailjs.send(process.env.REACT_APP_SERVICEID, process.env.REACT_APP_EMAILJS_TEMPLATEID, emailTemplate, process.env.REACT_APP_EMAILJS_USERID).then((result)=>console.log('Notification Success', result),(error)=>console.log('Notification Error', error));
}else{
    console.log('unable to send notification,either missing env vars or insert failed', process.env.REACT_APP_EMAILJS_USERID, result.data);
}
    return JSON.parse(result?.data);
   }catch(error){
        return {error:handleAuthenticationError(error)};
   }
}


/**
 *  Return all Reservations by query, for loggedIn and connected users
 *  @return JSON.parse(reservation_array)
 */
getReservations = async  ()=>{
 const uri = `${this.path}/getReservations`;

  try
  {
    const  results = await axios.get(uri);
    
   console.log('axios getreservation results:', results.data);
   if(!results.data) return [];

  return (results.data);
}catch(err){
return {error:err};
}
}


//the variables wrapped and available to the components within this Providor
 // const wrapped = { ...app,siteData,editHomeData, currentUser,registerWithEmail,insertReservations, reservations,profile,getReservations, getProfile, logIn, logOut };

}
