var riot = require('riot');
var agent = require('superagent');

module.exports = function() {
	riot.observable(this);

	var self = this, map, marker;
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
			// Local time
			var ts = new Date().getTime() / 1000;
			var url = 'https://maps.googleapis.com/maps/api/timezone/json?location=';
			agent.get(url + e.latLng.lat() + ',' + e.latLng.lng() + '&timestamp=' + ts).end(function(err, res) {
				var dstOffset = res.body.dstOffset;
				var rawOffset = res.body.rawOffset;
				var localTime = ((rawOffset - dstOffset) + ts) * 1000;
				console.log(res.body);
				console.log('local time', new Date(localTime));
			})

			// Marker
			addMarker(e.latLng);
			setPositionData(e.latLng);
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

	function setPositionData(location) {
		var country, data = {};
		geocoder.geocode({'latLng': location}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[0]) {
					country = results[results.length - 1].address_components[0];
					data.latLng = location.lat() +', '+ location.lng();
					data.countryIso = country.short_name;
					data.countryName = country.long_name;
					self.trigger('map_data', data);
				}
			}
		});
	}

	self.on('map_init', init);
	self.on('map_reset', clearMarker);
};