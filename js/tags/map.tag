var riotcontrol = require('riotcontrol');

<map>
	<div id="mapCanvas"></div>

	<script>
		riotcontrol.on('route_changed', function(route) {
			if(route == 'create') {
				riotcontrol.trigger('map_init');
			}
		})
	</script>
</map>