<map>
    <div id="mapCanvas"></div>

    <script>
        var riotcontrol = require('riotcontrol')

        riotcontrol.on('route_create', function() {
            riotcontrol.trigger('map_init')
        })
    </script>
</map>
