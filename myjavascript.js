var config = {
    apiKey: "AIzaSyBgQRtSheqT5JjOtrPc6imgyPRTmwenx0Q",
    authDomain: "myfirstdbproject-4ad43.firebaseapp.com",
    databaseURL: "https://myfirstdbproject-4ad43.firebaseio.com",
    projectId: "myfirstdbproject-4ad43",
    storageBucket: "",
    messagingSenderId: "396744614278"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#submit-button").on("click", function () {

    event.preventDefault();

    database.ref().push({

        trainName: $("#train-name").val().trim(),
        destination: $("#destination").val().trim(),
        firstTrainTime: $("#first-train-time").val().trim(),
        frequency: $("#frequency").val().trim()
    })
});

database.ref().on("child_added", function (snapshot) {

    var trainTime = snapshot.val().firstTrainTime;
    console.log("train time" + trainTime);

    var frequency = snapshot.val().frequency;

    // console.log(snapshot.val().name);
    // console.log(snapshot.val());
    // console.log(moment());

    var firstTimeConverted = moment(trainTime, "HH:mm");
    console.log("first time converted" + firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesAway = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesAway);

    // Next Train
    var nextArrival = moment().add(tMinutesAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));

    $("#tbody").append("<tr> <td>" + snapshot.val().trainName + "</td> <td>" + snapshot.val().destination + "</td> <td>" + 
    snapshot.val().frequency + "</td> <td>" + nextArrival + "</td> <td>" + tMinutesAway + "</td> </tr>");

}, function (errorObject) {

    console.log("The read failed: " + errorObject.code);
});