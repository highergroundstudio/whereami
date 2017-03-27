
function geoFindMe() {
  var output = document.getElementById("out");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    var latLngPLS = new LatLng(position.coords.latitude, position.coords.longitude);
    var utmPLS = latLngPLS.toUTMRef(new LatLng(position.coords.latitude, position.coords.longitude));
    var utmString = utmPLS.toString();

    acc = position.coords.accuracy;

    // Get textback number from link
    var tb = getQueryVariable("tb");
    var tbTxt = '';
    if(tb){
      tbTxt = '<a class="button" href="sms://' + tb + '?body=' + utmString + '">Text your location back</a>';
    }

    output.innerHTML = '<h1>Your location is: ' + utmString + '</h1><p>With an accuracy of ' + acc + ' meters</p>' + tbTxt;

    document.addEventListener('DOMContentLoaded', (function () {
      link = new SMSLink.link();
      link.replaceAll();
    }), false);
  }

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }

  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);
}

function getQueryVariable(variable)
{
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if(pair[0] == variable){return pair[1];}
  }
  return(false);
}

geoFindMe();
