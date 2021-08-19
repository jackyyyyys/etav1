function geteta(stop_name) {
    var stop = [];
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
                    if (result.data && result.data.length) {
                        for (arrival of result.data)
                        {
                            // clear old data in the elements
                            $('#' + arrival.route + ' .eta' + arrival.eta_seq).empty();
                            $('#' + arrival.route + ' .dest' + arrival.eta_seq).empty();
                            // calculate time
                            var diffD = new Date(arrival.eta) - new Date(arrival.data_timestamp);
                            var diffM = Math.round(diffD / 60000);
                            // set time to element
                            $('#' + arrival.route + ' .eta' + arrival.eta_seq).text(diffM);
                            // 0-2 RED
                            // 3-5 GREEN
                            if (diffM <= 2) {
                                $('#' + arrival.route + ' .eta' + arrival.eta_seq).addClass("text-danger");
                            } else if (diffM > 2 && diffM <= 5) {
                                $('#' + arrival.route + ' .eta' + arrival.eta_seq).addClass("text-success");
                                $('#' + arrival.route + ' .eta' + arrival.eta_seq).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
                            }
                            // set dest to element
                            $('#' + arrival.route + ' .dest' + arrival.eta_seq).text(arrival.dest_tc);
                            // print api response to console
                            console.log(JSON.stringify(arrival, null, 4));
                        }
                    }
                    else if (result.data.length.isEmpty) {
                        console.log(arrival.route + ": NO");
                        $('#' + arrival.route + ' .eta1').empty();
                        $('#' + arrival.route + ' .eta2').empty();
                        $('#' + arrival.route + ' .eta3').empty();
                        $('#' + arrival.route + ' .dest1').empty();
                        $('#' + arrival.route + ' .dest2').empty();
                        $('#' + arrival.route + ' .dest3').empty();
                        $('#' + arrival.route + ' .dest1').text("No service in coming 60 minutes");
                    }
                    var d = new Date();
                    document.getElementById("updated").innerHTML = "Updated : " + d.getHours() + ":" + checkTime(d.getMinutes()) + ":" + checkTime(d.getSeconds());
                },
                complete: function() {
                    console.log("")
                }
            })      // ajax call for each line
        }           // loop of lines in the stop
    });             // get json
}                   // function geteta

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}