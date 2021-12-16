/** module constants */

export const APP_NOTIFICATIONS = true;

/** isAdmin state selector */
export  const isAdminSelector = state => (state?.app?.app?.currentUser?.customData?.email==='kurawan@yahoo.com') 
const schedule = [
    {
      event_id: Math.random(),
      title: "Massage",
      start: new Date("2021 12 2 09:30"),
      end: new Date("2021 12 2 11:30"),
    },
    {
      event_id: Math.random(),
      title: "Reiki",
      start: new Date("2021 12 4 10:00"),
      end: new Date("2021 12 4 11:00"),
    },
  ];

export const RESERVATION = {
  userid:"6182198ee43796e8d32aff28",
  pickUpDate:"12:12:10",
  pickUpTime:"02:03:04",
  dropOffLocation:"dropoffdestinationf",
  pickupLocation:"pickupdestinationf",
  firstName:"Aa",
  lastName:"Zz",
  email:"az@email.com",
  createdDated:'2011:11:12',
  phone:"555-555-5555"};

const app={
  currentUser:{ 
      customData:{firstname:'first',
            email:'first@test.com',
            lastname:'test'
            },
      refreshCustomData:(()=>true),
      logIn:(()=>true),
      loginAnonymously:(()=>true),
      fetchSiteData:(()=>true),
      fetchReservations:(()=>true),
  }
}

const appDAO={
      
      refreshCustomData:(()=>({firstName:'first', email:'first@test.com', lastName:'test'  })),
      logIn:(()=>true),
      logOut:(()=>true),
      app:app,
      loginAnonymously:(()=>true),
      getSiteData:(()=>({pageData:HOME_PAGE_DEFAULT, cardData:TIERS, contactData:CONTACTINFO,screen:''})),
      getReservations:(()=>[{...RESERVATION}]),
      insertReservations:(()=>true),
  };


/** 
 *   @description Initial Reducer State @constant
 *   @type {string}
 *   @default
 */
export const INITIAL_STATE={
  auth:{loginState :{isLoggedIn:false, isLoggingIn:false},
            backEnd:{}
       },
       app:{...appDAO},
  availability:schedule,
  reservations:[RESERVATION],
  profile:{ firstname:"A", lastname:"Z",  email:"az@email.com"},
  siteData:{},
  settings:{notifyAfterReservation:false},
  error:''
};
/** 
 *   @description Initial Reducer State @constant
 *   @type {string}
 *   @default
 */
export const INITIAL_STATE_EMPTY={
  auth:{loginState :{isLoggedIn:false, isLoggingIn:false},
            backEnd:{}
       },
       app:null,
  reservations:[],
  availability:[],
  profile:null,
  siteData:null,
  settings:{notifyAfterReservation:false},
  error:'Initial Empty State'
};



/******************    ARIA Labels   *************/
export const NameOnCardAriaLabel = { 'aria-label': 'CreditCardName' };
export const EmailAriaLabel = { 'aria-label': 'EmailAddress' };
export const PhoneAriaLabel = { 'aria-label': 'Phone' };
export const ErrorAriaLabel = { 'aria-label': 'Error' };
export const submitAriaLabel = { 'aria-label': 'Submit' };
export const FirstNameAriaLabel = { 'aria-label': 'FirstName' };
export const LastNameAriaLabel = { 'aria-label': 'LastName' };
export const PickUpDateAriaLabel = { 'aria-label': 'PickUpDate' };
export const PickUpLocationAriaLabel = { 'aria-label': 'PickupLocation' };
export const DropOffDateAriaLabel = { 'aria-label': 'DropOFfDate' };
export const DropOffLocationAriaLabel = { 'aria-label': 'DropOffLocation' };
export const PasswordAriaLabel = { 'aria-label': 'Password' };
export const AgreementSignatureAriaLabel = { 'aria-label': 'AgreementSignature' };
export const AgreementAriaLabel = { 'aria-label': 'Agreement' };
export const AgreementCheckboxAriaLabel = { 'aria-label': 'AgreementCheck' };
 

/******* HOME PAGE user modifiable text **********/

const title = 'Service';
const subtitle = 'Entertainment and Pleasure';
const reservationButton = 'Make A Reservation';
const paragraph0Text = '8ANGELS is uniquely prepared to meet your private transportation needs. Our  program serves  a range of industries and occasions, including Concert/tours, sporting events, business venues, wedding events and more. You can depend on an affordable spacious vehicle. We\'ve got you covered! ';
const paragraph1Text = 'This Vehicle is exclusively for transportation to and from hotels and events.  It is also a perfect choice to transport groomsmen and bridesmaids during wedding preparations'
export const HOME_PAGE_DEFAULT = {title, subtitle, reservationButton,paragraphs: [paragraph0Text, paragraph1Text]};

export const CONTACTINFO =  {
    title: 'Contact Me',

    price: '15',
    description: [
      'Caregiver:            Alora Cohen',
      'Phone :           520-000-0000',
      'Email :      aloracohen@yahoo.com', ],
      imageURL: 'https://jaxonetic-github.github.io/React-Appointment-Setter/face_small.jpeg',
    buttonText: 'Get started',
    buttonVariant: 'contained',
  };

export const TIERS = [
  {
    title: 'Massage',
    price: 'For your Comfort and Protection',
    description: [
      'Cupping',
      'Tai Massage',
      'Full or Partial Massage',
      'hand sanitizers and wipes',
    ],
     imageURL: 'https://instagram.fphx1-1.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/217278443_267284748501693_421826271010334924_n.jpg?_nc_ht=instagram.fphx1-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=lkzL5Ic-xGYAX_Qd_gW&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9oMY3usJg7o_4dBxwxY9RON92DfT5Dmaxk7G9CrRTLGg&oe=61BD5086&_nc_sid=86f79a',
  },
 
  {
    title: 'Arrive in styles',
    price: '30',
    description: [
      'Weddings',
      'Airport Escorts',
      'Business Conventions',
      'Concentions',
    ],
      imageURL: 'https://raw.githubusercontent.com/jaxonetic-github/React-Reserver/3f90afcd4efbb7e8a62559deaf8162e7bcdba2b8/public/sideview_closeddoors.jpeg',

  },
]

export const COMPANY_NAME = 'Alchemeia';
export const HOME_BANNER_URL = 'https://instagram.fphx1-2.fna.fbcdn.net/v/t51.2885-15/e35/211493852_1515322732138516_6545539816536996866_n.jpg?_nc_ht=instagram.fphx1-2.fna.fbcdn.net&_nc_cat=104&_nc_ohc=naMzpoWL_vcAX_Qd7eT&edm=APU89FABAAAA&ccb=7-4&oh=d85cf58ed87659d2c7cf801501da532f&oe=61BD9AF4&_nc_sid=86f79a';
export const APPBAR_INITIAL_HEIGHT = 64;
export const APPBAR_INITIAL_COLOR = 'white';

/*********************  fee structue used by Review screen to display to user  ******/
export const FEE_FORMULA = [
  {
    name: 'Reservation Fee',
    desc: 'Due by Pickup : Flat fee',
    price: '$150.00',
  },
  {
    name: 'Hourly adjustments',
    desc: 'ex. $20 hour after 3 hours',
    price: '$3.45',
  },
  {
    name: 'Mileage adjustments',
    desc: 'ex. $3/mi after 150 miles',
    price: '$3.00/mi',
  },
  {
    name: 'Security Deposit',
    desc: '',
    price: '$100.00',
  },
  { name: 'Shipping', desc: '', price: 'Free' },
];

/************************** DB **************************/

/***************Authentication Specific *******************/
export function handleAuthenticationError(err) {
  let returnMsg=null;
  const { status, message } = parseAuthenticationError(err);
  const errorType = message || status;
  console.log(err,'   ===',message,'---', status);
  switch (errorType) {
    case "invalid username":
       returnMsg = "Invalid email address." ;
      break;
    case "invalid username/password":
    case "invalid password":
    case "401":

      returnMsg =  "Incorrect password.";
      break;
    case "name already in use":
    case "409":
//      setError((err) => ({ ...err, errorMsg: "Email is already registered." }));
      returnMsg = "Email is already registered." ;
      break;
    case "password must be between 6 and 128 characters":
    case "400":
     // setError((err) => ({...err,  errorMsg: "Password must be between 6 and 128 characters."  }));
      returnMsg = "Password must be between 6 and 128 characters.";
      break;
    default:
      break;
  }
  return returnMsg ;
}

export function parseAuthenticationError(err) {
  const parts = err.message.split(":");
  const reason = parts[parts.length - 1].trimStart();
  if (!reason) return { status: "", message: "" };
  const reasonRegex = /(?<message>.+)\s\(status (?<status>[0-9][0-9][0-9])/;
  const match = reason.match(reasonRegex);
  const { status, message } = match?.groups ?? {};
  return { status, message };
}