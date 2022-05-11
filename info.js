var lat1 = 0;
var lon1 = 0;
var lat2 = 0;
var lon2 = 0;
var routeType = "";
var travelMode = "";
var hilliness = "";
var URLend = "";

function HomePage() {
    document.location.href = 'index.html';
}
function Directions() {
    document.location.href = 'directions.html';
}

function validateType() {
    var type = document.getElementById("routeType").value;
    var hill = document.getElementById("hilliness").value;

    if (type === "thrilling") {
        URLend = '&hilliness=' + hill + '&key=Ti1bXZtwMA5Lx8WMxmTIIlLGLZGEKXu4';
    } else {
        hilliness = "";
        URLend = "&key=Ti1bXZtwMA5Lx8WMxmTIIlLGLZGEKXu4";
    }
}

function getLocation() {
    $("#direction").empty();

    var add1 = $("#add1").val();
    var add2 = $("#add2").val();

    a = $.ajax({
        url: 'https://api.tomtom.com/search/2/search/' + add1 + '.json?radius=1000&minFuzzyLevel=1&maxFuzzyLevel=2&view=Unified&relatedPois=off&key=Ti1bXZtwMA5Lx8WMxmTIIlLGLZGEKXu4',
        method: "GET"
    }).done(function(data) {

        lat1 = data.results[0].position.lat;
        lon1 = data.results[0].position.lon;
    }).fail(function(error) {});

    a = $.ajax({
        url: 'https://api.tomtom.com/search/2/search/' + add2 + '.json?radius=1000&minFuzzyLevel=1&maxFuzzyLevel=2&view=Unified&relatedPois=off&key=Ti1bXZtwMA5Lx8WMxmTIIlLGLZGEKXu4',
        method: "GET"
    }).done(function(data) {

        lat2 = data.results[1].position.lat;
        lon2 = data.results[1].position.lon;

    }).fail(function(error) {});

    validateType();
    getDirections();
}

function getDirections() {

    travelMode = document.getElementById("travelMode").value;
    routeType = document.getElementById("routeType").value;

    a = $.ajax({
        url: 'https://api.tomtom.com/routing/1/calculateRoute/' + lat1 + ',' + lon1 + ':' + lat2 + ',' + lon2 + '/json?instructionsType=text&routeType=' + routeType + '&travelMode=' + travelMode + URLend,
        method: "GET"
    }).done(function(data) {

        $("#dist").html("Total Distance: " + data.routes[0].summary.lengthInMeters + " meters");
        $("#time").html("Total Time: " + data.routes[0].summary.travelTimeInSeconds / 60 + " min");
        $("#traffic").html("Traffic Delay: " + data.routes[0].summary.trafficDelayInSeconds + " sec");

        var oldTime = 0;
        var oldLen = 0;

        for (var i = 0; i < 99; i++) {
            var url = 'https://api.tomtom.com/map/1/staticimage?layer=basic&style=main&format=jpg&zoom=12&center=' + data.routes[0].legs[0].points[i].longitude + ',' + data.routes[0].legs[0].points[i].latitude + '&width=512&height=512&view=Unified&key=Ti1bXZtwMA5Lx8WMxmTIIlLGLZGEKXu4';

            $("#direction").append("<br><p id='leg'>" + (i + 1) + ". " + data.routes[0].guidance.instructions[i].message + "</p>");
            $("#direction").append("<img src=" + url + " alt='mapImage'>");

            $("#direction").append("<p id='legLength'> Length: " + (data.routes[0].guidance.instructions[i].routeOffsetInMeters - oldLen) + " meters</p>");
            oldLen = data.routes[0].guidance.instructions[i].routeOffsetInMeters;

            $("#direction").append("<p id='legTime'> Time: " + (data.routes[0].guidance.instructions[i].travelTimeInSeconds - oldTime) / 60 + " min</p>");
            oldTime = data.routes[0].guidance.instructions[i].travelTimeInSeconds
        }
    }).fail(function(error) {});
}
