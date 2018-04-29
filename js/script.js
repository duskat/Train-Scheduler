var config = {
    apiKey: "AIzaSyB8UY48Cq3Ak858-Ef6kLhOn6S7ctKjYAY",
    authDomain: "trainscheduler-c9478.firebaseapp.com",
    databaseURL: "https://trainscheduler-c9478.firebaseio.com",
    projectId: "trainscheduler-c9478",
    storageBucket: "trainscheduler-c9478.appspot.com",
    messagingSenderId: "553565149107"
};
firebase.initializeApp(config);
database = firebase.database();

// var trainName = ""
// var destination = ""
// var timeSchedle = ""
// var frequence = 0;
$("#submit").on("click", function(event) {
    event.preventDefault();
    counter ++;
    console.log(counter);
    var formTrainName = $('#trainName').val().trim();
    var formDestination = $('#destination').val().trim();
    var formTimeSchedle = $('#timeSchedle').val();
    var formFrequence = $('#frequence').val();
    $('form :input').val('');
    // console.log(formTrainName, formDestination, formTimeSchedle, formFrequence);
    // console.log(formFrequence);

    var scheduler = {
        TrainName: formTrainName,
        Destination : formDestination,
        TimeSchedle  : formTimeSchedle,
        Frequence : formFrequence
    }
    database.ref().push(scheduler);
    console.log(scheduler);
})

var counter = 0 ;
// var seconds = Math.round(new Date().getTime() / 1000); 
// console.log(seconds);
// var date = moment.utc().format('YYYY-MM-DD HH:mm:ss');
// console.log(date); 
// var stillUtc = moment.utc(date).toDate();
// var local = moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
// console.log(local); 
// var format = "HH:mm";
// var now = moment();
// console.log(now);  
// var min = now.diff(b, 'm');
// var hr = now.diff(b, 'h');
// var left = min - (hr*60);
// console.log(left);


database.ref().on('child_added', function(dbsnapshot){
    counter ++;
    var trainName = dbsnapshot.child('TrainName').val();
    var destination = dbsnapshot.child('Destination').val();
    var timeSchedle = dbsnapshot.child('TimeSchedle').val();
    var frequence = dbsnapshot.child('Frequence').val();
    // var frequenceInSeconds = frequence*60
    // console.log(frequenceInSeconds);
    // var arrivalSeconds = seconds + frequenceInSeconds;
//    var di    ff = moment().now(diff(timeSchedle), format)
//    console.log(diff);
    console.log("time now : "+moment().format('HH:mm'));

    // var removesemicolons  = timeSchedle.replace(/[^0-9]/, '');
    var traintime = moment(timeSchedle, "hh:mm");
    console.log('train time:' + traintime.format("HH:mm"));
    
    var min = Math.abs(moment().diff(traintime, 'm'));
    console.log("min from now: " + min);
    if (min<0){
       // min = min*(-1);
    }
    var zzz = Math.floor(min/frequence);
    var xxx = zzz*frequence;
    var curentMin = min - xxx;
    var frequenceHr = 0;
    if (frequence > 60){
        frequenceHr = Math.floor(frequence/60);
        var z = 60*frequenceHr;
        curentMin = frequence - z;
    }
    else{
       
    }
    
    var curentMinutes = ("0" + curentMin).slice(-2);
    var currentHour = moment().format('hh');
    var timeForArrivals = currentHour+curentMinutes;
  
    

    var hr = moment().diff(traintime, 'h');
       
    var diffMin = min - (hr*60);
    console.log("Time from now HR:" + hr +' Min: '+diffMin); 
    var minArrive = 0;
    if (diffMin < frequence){
        minArrive = frequence - diffMin;
    }
    else if(diffMin === frequence){
        diffMin = frequence;
    }
    else{
        var x = Math.floor(diffMin/frequence);
        var y = x * frequence;
        var minArrive = diffMin - y;
    }
    console.log(minArrive);
   

    var newTimeArrival =moment().add(minArrive, "minutes");
    var NextArrival = moment(newTimeArrival).format("hh:mm a");
    // console.log('Next Arrival am/pm = ' + NextArrival);
    // console.log("min to next arrival: " + minArrive);
    var tr = $('<tr>');
    var th = $('<th>').attr('scope', 'row');
    // th.text(counter);
    var td = $('<td>')
    // td = td.text(trainName) + td.text(destination) + td.text(timeSchedle) + td.text(frequence);
    // $('table').append(tr, td.html(trainName) + td.html(destination) + td.html(timeSchedle) + td.html(frequence));
    $('table').append('<tr><th scope="row">'+counter+'</th><td>'+trainName+'</td><td>'+destination+'</td><td>'+frequence+'</td><td>'+NextArrival+'</td><td>'+minArrive+'</td></th></tr>')
})

   