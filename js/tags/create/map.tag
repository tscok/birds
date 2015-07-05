<map>
    <div id="mapCanvas"></div>

    <script>
        var riotcontrol = require('riotcontrol');
        
        riotcontrol.on('route_changed', function(route) {
            if(route == 'create') {
                riotcontrol.trigger('map_init');
            }
        })
    </script>
</map>
