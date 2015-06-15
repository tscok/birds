<auth>
    <login if={ login }></login>
    <register if={ register }></register>

    <script>
        var riotcontrol = require('riotcontrol');
        var self = this

        riotcontrol.on('route_changed', function(route) {
            self.update({login: route == 'login', register: route == 'register'})
        })
    </script>
</auth>