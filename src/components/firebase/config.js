 // Your web app's Firebase configuration
 var firebaseConfig = {};
 if(process.env.REACT_APP_ENVIRONMENT === 'development' || process.env.REACT_APP_ENVIRONMENT === 'staging'){
     firebaseConfig = {
         apiKey: "AIzaSyDfXoUXA0JhhoExlNjDMqEEIujPtGAZ6ok",
         authDomain: "tavus-d5029.firebaseapp.com",
         projectId: "tavus-d5029",
         storageBucket: "tavus-d5029.appspot.com",
         messagingSenderId: "205803166169",
         appId: "1:205803166169:web:eefbc9cf24e0bbb93fa1c8"
     };
 } else if(process.env.REACT_APP_ENVIRONMENT === 'production'){
     firebaseConfig = {
         apiKey: "AIzaSyCg5NckMelJEc8tNdMvTiyyBmyCxM3ivoI",
         authDomain: "tavus-e088f.firebaseapp.com",
         projectId: "tavus-e088f",
         storageBucket: "tavus-e088f.appspot.com",
         messagingSenderId: "546328747514",
         appId: "1:546328747514:web:4c54d68e83257b88459843"
     };
 }
 export default firebaseConfig;
