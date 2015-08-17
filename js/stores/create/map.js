var riot = require('riot');
var agent = require('superagent');
var moment = require('moment');

module.exports = function() {
	riot.observable(this);

	var self = this, map, marker, coords;
	var geocoder = new google.maps.Geocoder();
	var annsjon = new google.maps.LatLng(63.27114510000001, 12.449269500000014);
	var mapOptions = {
		zoom: 8,
		center: annsjon,
		mapTypeId: google.maps.MapTypeId.TERRAIN,
		streetViewControl: false,
		zoomControl: false,
		scaleControl: false
	};

	function init() {
		map = new google.maps.Map(document.getElementById('mapCanvas'), mapOptions);

		google.maps.event.addListener(map, 'click', function(e){
			coords = e.latLng.lat() + ',' + e.latLng.lng();

			// Marker
			addMarker(e.latLng);
			// Location
			getPositionData(e.latLng);
			// Time
			getLocalTime();
		});
	}

	function addMarker(location) {
		if (marker) {
			clearMarker();
		}
		marker = new google.maps.Marker({
			position: location,
			map: map
		});
	}

	function clearMarker() {
		marker.setMap(null);
	}

	function getPositionData(location) {
		var country, data = {};
		geocoder.geocode({'latLng': location}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[0]) {
					country = results[results.length - 1].address_components[0];
					data.latLng = coords;
					data.countryIso = country.short_name;
					data.countryName = country.long_name;
					self.trigger('map_data', data);
				}
			}
		});
	}

	function getLocalTime() {
		var localtime;
		var timestamp = moment().unix();
		var baseURL = 'https://maps.googleapis.com/maps/api/timezone/json?location=';
		var url = baseURL + coords + '&timestamp=' + timestamp + '&key=AIzaSyDU-QSezsFkEm9DikRmj7CH6RQnQIJhq4c';
		agent.get(url).end(function(err, res) {
			if (!err && res.status == 200) {
				var offsets = res.body.dstOffset + res.body.rawOffset;
				localtime = moment.unix(timestamp + offsets).utc().format('HH:mm:ss, YYYY-MM-DD');
				console.log('local time:', localtime);
			}
		});
	}

	self.on('map_init', init);
	self.on('map_reset', clearMarker);
};