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
        name: $("#employee-name").val().trim(),
        title: $("#role").val().trim(),
        startDate: $("#startDate").val().trim(),
        endDate: $("#monthlyDate").val().trim()
    });
});

database.ref().on("child_added", function (snapshot) {

}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

  //get stuff from snapshot

  //add to table