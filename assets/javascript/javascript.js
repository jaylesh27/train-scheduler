// Initialize Firebase
var config = {
  apiKey: "AIzaSyAMGMbn41H3oN36Tf-m5-NdOEGvDl3tPsk",
  authDomain: "train-scheduler-7e57c.firebaseapp.com",
  databaseURL: "https://train-scheduler-7e57c.firebaseio.com",
  projectId: "train-scheduler-7e57c",
  storageBucket: "train-scheduler-7e57c.appspot.com",
  messagingSenderId: "329784046307"
};
firebase.initializeApp(config);

//store firebase database in var database
var database = firebase.database();

//create a function that captures the click on the submit button and allows the user to submit the train name, destination, frequency, and arrival time (in military time) and push the inputs to firebase

//based on user's input for First Train Time and Frequency, use moment.js to output when the train will be arriving next in relation to the current time (output to Next Arrival column) and also display in Minutes Away column how long from the current time till the traim arrives
  //Example: using the frequency and First Train time, calculate what the next arrival time is in relation to the current time (ex: if the train arrives every 30 minutes and first train time was 1:00 PM and right now, in reality, it is 1:40 PM, then the next arrival time is 2:00 PM and the train is 20 minutes away)

