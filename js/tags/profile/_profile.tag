<profile>
    <user></user>
    <projects></projects>

    <script>
        var riotcontrol = require('riotcontrol')

        riotcontrol.on('route_profile', function() {
            riotcontrol.trigger('user_update')
            riotcontrol.trigger('list_projects')
        })
    </script>
</profile>
