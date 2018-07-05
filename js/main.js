
var googleLocation = new XMLHttpRequest();
var weatherConditions = new XMLHttpRequest();
var weatherForecast = new XMLHttpRequest();
var cObj;
var fObj;
var googleMapApiKey = 'AIzaSyCtJmxkXKVhoh9OwY9hPhb_ucqUv3cCMW8';

function load(){
	var cityObj = document.getElementById('city');

	if(cityObj !== undefined && cityObj !== null){
		var city = document.getElementById('city').value;		
	}
	if(city === '' || city === undefined) {
		city = 'Sydney'
	}
	loadByCityName(city);
}
load();

function loadByCityName(city){
	if(city === '' || city === undefined){ //if no city typed
		city = 'Sydney';
	}
	var googleLocationURL = 'https://maps.googleapis.com/maps/api/geocode/json?address='+city+'&key='+googleMapApiKey;
	googleLocation.open('GET', googleLocationURL, true);
	googleLocation.responseType = 'text';
	googleLocation.send(null);
	

	var weatherConditionURL = 'http://api.wunderground.com/api/f029e46fd0232d12/geolookup/conditions/q/Australia/'+city+'.json'; 
	weatherConditions.open('GET', weatherConditionURL, true);
	weatherConditions.responseType = 'text';
	weatherConditions.send(null);

	var weatherForecastURL = 'http://api.wunderground.com/api/f029e46fd0232d12/geolookup/forecast10day/q/Australia/'+city+'.json';
	weatherForecast.open('GET', weatherForecastURL, true);
	weatherForecast.responseType = 'text';
	weatherForecast.send(null);
}
//loadByCityName('Sydney');

//Get the Location lat and lng 
googleLocation.onload = function() {
	console.log(googleLocation);
    if (googleLocation.status === 200){
        cObj = JSON.parse(googleLocation.responseText);
		console.log(cObj);
		//wetherCity=cObj.results[0].address_components[0].long_name;
        document.getElementById('location').innerHTML=cObj.results[0].address_components[0].long_name;
		document.getElementById('lat').innerHTML = cObj.results[0].geometry.location.lat;
		document.getElementById('lng').innerHTML = cObj.results[0].geometry.location.lng;
    } //end if
}; //end function

//Get the Weather Condition
weatherConditions.onload = function() {
	console.log(weatherConditions);
    if (weatherConditions.status === 200){
        cObj = JSON.parse(weatherConditions.responseText);
        console.log(cObj);
		//document.getElementById('location').innerHTML = cObj.current_observation.display_location.full;
		document.getElementById('weather').innerHTML = cObj.current_observation.weather;
		document.getElementById('temperature').innerHTML = cObj.current_observation.temp_c + 'c';
    } //end if
}; //end function

//Get the Weather Forecast
weatherForecast.onload = function() {	
	if (weatherForecast.status === 200){
		fObj = JSON.parse(weatherForecast.responseText);		
		console.log(fObj);
		document.getElementById('desc').innerHTML = fObj.forecast.txt_forecast.forecastday[0].fcttext_metric;
		var forecastdayArray= fObj.forecast.simpleforecast.forecastday;
		for (var i = 1; i <=forecastdayArray.length; i++) {
			document.getElementById('r'+i+'c1').innerHTML = forecastdayArray[i].date.weekday;
			document.getElementById('r'+i+'c2').src = forecastdayArray[i].icon_url;
			document.getElementById('r'+i+'c3').innerHTML = forecastdayArray[i].high.celsius;
			document.getElementById('r'+i+'c4').innerHTML = forecastdayArray[i].low.celsius;
		}

	} //end if
}; //end function


//auto complete places
function initAutocomplete(){
	var options = {
  types: ['(cities)'],
  componentRestrictions: {country: "au"}
 };
	var input=document.getElementById('city');
	var autocomplete = new google.maps.places.Autocomplete(input,options);
	google.maps.event.addListener(autocomplete, 'place_changed', function () {
		var place = autocomplete.getPlace().address_components[0].long_name;
		console.log("###############");
		console.log(place);
		loadByCityName(place);
	});
}


//http://api.wunderground.com/api/f029e46fd0232d12/geolookup/conditions/forecast/q/Australia/Sydney.json

// GET THE FORECARST
/*  AIzaSyBqvTU7LnRScpHbdH0Fu1NPiQA61qJQHA8
weatherForecast.open('', '', true);
weatherForecast.responseType = 'text';
weatherForecast.send();
AIzaSyCtJmxkXKVhoh9OwY9hPhb_ucqUv3cCMW8
weatherForecast.onload = function() {
if (weatherForecast.status === 200){
	fObj = JSON.parse(weatherForecast.responseText);
	console.log(fObj);

} //end if
}; //end function
*/
