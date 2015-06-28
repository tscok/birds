<profile>
    <user if={ show }></user>
    <projects if={ show } type="ownerships"></projects>
    <projects if={ show } type="memberships"></projects>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        riotcontrol.on('route_changed', function(route) {
            self.update({show: route == 'profile'})
        })

        riotcontrol.on('route_profile', function() {
            riotcontrol.trigger('user_update')
            riotcontrol.trigger('list_ownerships')
            riotcontrol.trigger('list_memberships')
        })
    </script>
</profile>
