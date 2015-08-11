<map>
    <div id="mapCanvas"></div>
    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        self.on('mount', function() {
            riotcontrol.trigger('map_init')
        })
    </script>
</map>
