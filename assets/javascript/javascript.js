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

$("#submit").on("click", function(event) {

    event.preventDefault();

    //get user input and store it in variables
    var trainName = $("#train-name").val().trim();
    var destination= $("#destination").val().trim();
    var arrivalTime = $("#arrival-time").val().trim();
    var frequency = $("#frequency").val().trim();

    //create an object of the user inputs
    var newEmp = {
      trainName: trainName,
      destination: destination,
      arrivalTime: arrivalTime,
      frequency: frequency
      //dateAdded: firebase.database.ServerValue.TIMESTAMP
    };

    //push object to the database
    database.ref().push(newEmp);

    //clear input boxes
	$("#train-name").val("");
	$("#destination").val("");
	$("#arrival-time").val("");
	$("#frequency").val("");
});


//create a Firebase event that will add the employee to the database and will also add a row in the table for the employee info inputted by user
database.ref().on("child_added", function(childSnapshot) {
	// console.log(childSnapshot.val());

	//store the childSnapshots in variables
    var trainName = childSnapshot.val().trainName;
    var destination= childSnapshot.val().destination;
    var arrivalTime = childSnapshot.val().arrivalTime;
    var frequency = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(destination);
    console.log(arrivalTime);
    console.log(frequency);
	//based on user's input for First Train Time and Frequency, use moment.js to output when the train will be arriving next in relation to the current time (output to Next Arrival column) and also display in Minutes Away column how long from the current time till the traim arrives
	  //Example: using the frequency and First Train time, calculate what the next arrival time is in relation to the current time (ex: if the train arrives every 30 minutes and first train time was 1:00 PM and right now, in reality, it is 1:40 PM, then the next arrival time is 2:00 PM and the train is 20 minutes away)

	 var currentTime = moment().format("HH" + "mm");
	 console.log(currentTime);
	 //calculate nextArrival by taking the initial arrivalTime and adding the frequency until the initial arrivalTime is a greater value than the current time
	 	//if currentTime is greater than initial arrivalTime + frequency
	 var nextArrival = ;
	 var minutesAway = ;

	 $("#train-schedule").append(
	 		"<tr>" +
	 			"<td>" + trainName + "</td>" +
	 			"<td>" + destination + "</td>" +
	 			"<td>" + frequency + "</td>" +
	 			"<td>" + nextArrival + "</td>" +
	 			"<td>" + minutesAway + "</td>" +
	 		"</tr>"
	 	);

});