<profile>
    <user if={ show }></user>
    <ownerships if={ show }></ownerships>
    <memberships if={ show }></memberships>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        riotcontrol.on('route_changed', function(route) {
            self.update({show: route == 'profile'})

            if (route == 'profile') {
                riotcontrol.trigger('list_ownerships')
                riotcontrol.trigger('list_memberships')
            }
        })
    </script>
</profile>