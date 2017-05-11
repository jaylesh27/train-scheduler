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
    var initialTime = $("#initial-time").val().trim();
    var frequency = $("#frequency").val().trim();

    //create an object of the user inputs
    var newTrain = {
      trainName: trainName,
      destination: destination,
      initialTime: initialTime,
      frequency: frequency
      //dateAdded: firebase.database.ServerValue.TIMESTAMP
    };

    //push object to the database
    database.ref().push(newTrain);

    //clear input boxes
    $("#train-name").val("");
    $("#destination").val("");
    $("#initial-time").val("");
    $("#frequency").val("");
});


//create a Firebase event that will add the employee to the database and will also add a row in the table for the employee info inputted by user
database.ref().on("child_added", function(childSnapshot) {
	// console.log(childSnapshot.val());

	//store the childSnapshots in variables
    var trainName = childSnapshot.val().trainName;
    var destination= childSnapshot.val().destination;
    var initialTime = childSnapshot.val().initialTime;
    var frequency = childSnapshot.val().frequency;

    // console.log(trainName);
    // console.log(destination);
    // console.log(initialTime);
    // console.log(frequency);
	//based on user's input for First Train Time and Frequency, use moment.js to output when the train will be arriving next in relation to the current time (output to Next Arrival column) and also display in Minutes Away column how long from the current time till the traim arrives
	  //Example: using the frequency and First Train time, calculate what the next arrival time is in relation to the current time (ex: if the train arrives every 30 minutes and first train time was 1:00 PM and right now, in reality, it is 1:40 PM, then the next arrival time is 2:00 PM and the train is 20 minutes away)


    var initialTimeConverted = moment(initialTime, "hh:mm").subtract(1, "years");
    // console.log(initialTimeConverted);

    // Current Time
    var currentTime = moment();

    // Difference between the current time and the initial train start time in minutes
    var diffTime = moment().diff(moment(initialTimeConverted), "minutes");

    // Calculate the remainder of the diffTime and frequency to help calculate how many minutes away the train is
    var tRemainder = diffTime % frequency;

    // create var to store how many minutes the train is away
    var tMinutesTillTrain = frequency - tRemainder;

    // Calculate the next train by taking the current time and adding how many minutes away the train is
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var nextTrainArrival = moment(nextTrain).format("hh:mm")

    //display in HTML the inputted and calculated train info
	 $("#train-schedule").append(
	 		"<tr>" +
	 			"<td>" + trainName + "</td>" +
	 			"<td>" + destination + "</td>" +
	 			"<td>" + frequency + "</td>" +
	 			"<td>" + nextTrainArrival + "</td>" +
	 			"<td>" + tMinutesTillTrain + "</td>" +
	 		"</tr>"
	 	);


});