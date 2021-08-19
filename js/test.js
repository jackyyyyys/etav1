function get_arrivals(stop_name) {
    var stop = [];
    var arrivals = [];
    $.getJSON("json/" + stop_name + ".json", function(result) {
        stop = result[0];
        // load lines of the stop into a constant
        for (line of stop.lines) {
            $("#" + line.route + " #through" ).text(line.through);
            // loop through lines
            $.ajax({
                url: "https://rt.data.gov.hk/v1/transport/citybus-nwfb/eta/" + line.co + "/" + stop.id + "/" + line.route,
                type: "GET",
                success: function(result) {
                    if (result.data.length >= 0) {
                        for (arrival of result.data)
                        {
                            // calculate time
                            var diffD = new Date(arrival.eta) - new Date(arrival.data_timestamp);
                            var diffM = Math.round(diffD / 60000);
                            arrival.min = diffM;
                            // add to arrivals
                            arrivals.push(arrival);
                        }
                    }
                },
                complete: function() {
                    console.log("");
                }   // complete function
            })      // ajax call for each line
        }           // loop of lines in the stop
    }).done(function(){
        console.log(arrivals);
        arrivals.sort(function(a, b){return a - b});
        console.log(arrivals);
    });             // get json
}                   // function geteta


function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}