// var riot = require('riot');
// var agent = require('superagent');
// var moment = require('moment');
// var momentz = require('moment-timezone');

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
		map = new google.maps.Map(document.getElementById('mapCanvas'));

		resetMap();

		google.maps.event.addListener(map, 'click', function(e){
			coords = e.latLng.lat() + ',' + e.latLng.lng();

			// Marker
			addMarker(e.latLng);
			// Location
			getPositionData(e.latLng);
			// Timezone
			getTimezoneData();
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
		if (!marker) {
			return;
		}
		marker.setMap(null);
	}

	function resetMap() {
		clearMarker();
		map.setOptions(mapOptions);
		self.trigger('map_data', {});
		self.trigger('map_tzData', {});
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

	function getTimezoneData() {
		var ts = moment().unix();
		var apiKey = 'AIzaSyDU-QSezsFkEm9DikRmj7CH6RQnQIJhq4c';
		var baseURL = 'https://maps.googleapis.com/maps/api/timezone/json';
		var url = baseURL + '?location=' + coords + '&timestamp=' + ts + '&key=' + apiKey;

		agent.get(url).end(function(err, res) {
			if (!err && res.status == 200 && res.body.status == 'OK') {
				var id = res.body.timeZoneId; // ex. 'Europe/Stockholm'
				var m = moment.tz(moment.unix(ts), id);
				var abbr = m.format('z'); // ex. 'CEST'
				var offset = m.format('Z'); // ex. '+02:00'
				
				self.trigger('map_tzData', {tz: id, abbr: abbr, offset: offset});
			}
		});
	}

	self.on('map_init', init);
	self.on('map_reset', resetMap);

	self.on('route', function(route) {
		if (route == 'create') {
			resetMap();
		}
	})
};