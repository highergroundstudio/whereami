
function geoFindMe() {
  //Grab output div for use
  var output = document.getElementById("out");

  // Geolocation no supported by browser
  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  // Successfully found position, now do stuff
  function success(position) {
    //Get location
    var latLngPLS = new LatLng(position.coords.latitude, position.coords.longitude);
    //What is our accuracy?
    var acc = position.coords.accuracy;
    //Convert to UTM
    var utmPLS = latLngPLS.toUTMRef(new LatLng(position.coords.latitude, position.coords.longitude));
    //Convert UTM to string
    var utmString = utmPLS.toString();

    // Get textback number
    var tb = getQueryVariable("tb"),
        tbTxt = '',
        sep = '?';

    // Get textback number from link
    if(tb){
      //Check if iOS
      if(isIos()){
        //Change seperator for textback link if iOS
        sep = '&';
      }
      //Lets create our textback button link
      tbTxt = '<a class="button" href="sms://' + tb + sep + 'body=WGS84 ' + utmString + ' w/ accuracy of ' + acc + 'm">Text your location back</a>';
    }

    // Output our html to the user
    output.innerHTML = '<h1>Your location is: ' + utmString + '</h1><p>With an accuracy of ' + acc + ' meters</p>' + tbTxt;

  }

  // There is a problem
  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }

  //Get variable out of url
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

  // Check if it is iOS or not
  function isIos() {
    var userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        iosPlatforms = ['iPhone', 'iPad', 'iPod'];

    if (iosPlatforms.indexOf(platform) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  // While running set so user knows
  output.innerHTML = "<p>Locating…</p>";

  // Get the user's location
  navigator.geolocation.getCurrentPosition(success, error);
}

// Call everything above
geoFindMe();
