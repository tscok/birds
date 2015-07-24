<profile>
    <div if={ show } class="profile">
        <user></user>
        <projects></projects>
    </div>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        riotcontrol.on('route_changed', function(route) {
            self.update({show: route === 'profile'})
        })

        riotcontrol.on('route_profile', function() {
            riotcontrol.trigger('user_update')
            riotcontrol.trigger('list_projects')
        })
    </script>
</profile>
