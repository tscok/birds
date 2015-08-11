var riot = require('riot');

module.exports = function() {
	riot.observable(this);

	var self = this, marker, geocoder;

	function init() {
		var delta = new google.maps.LatLng(63.27114510000001, 12.449269500000014);
		var mapOptions = {
			zoom: 8,
			center: delta,
			mapTypeId: google.maps.MapTypeId.TERRAIN,
			streetViewControl: false,
			zoomControl: false,
			scaleControl: false
		};

		geocoder = new google.maps.Geocoder();
		map = new google.maps.Map(document.getElementById('mapCanvas'), mapOptions);

		google.maps.event.addListener(map, 'click', function(e){
			addMarker(e.latLng);
			setPositionData(e.latLng);
		});
	}

	function addMarker(location) {
		if(marker) {
			marker.setMap(null);
		}
		marker = new google.maps.Marker({
			position: location,
			map: map
		});
	};

	function setPositionData(location) {
		var country, data = {};
		geocoder.geocode({'latLng': location}, function(results, status) {
			if(status == google.maps.GeocoderStatus.OK) {
				if(results[0]) {
					country = results[results.length - 1].address_components[0];
					data.latLng = location.lat() +', '+ location.lng();
					data.countryIso = country.short_name;
					data.countryName = country.long_name;
					self.trigger('map_data', data);
				}
			}
		});
	};

	self.on('map_init', init);
};