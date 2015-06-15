<profile>
    <user if={ show }></user>
    <list if={ show } title="Project Ownerships">
        <ownerships></ownerships>
    </list>
    <list if={ show } title="Project Memberships">
        <memberships></memberships>
    </list>
    

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