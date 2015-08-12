<app-main>
    <alert></alert>
    <login if={ route == 'login' }></login>
    <search if={ route == 'search' }></search>
    <create if={ route == 'create' }></create>
    <profile if={ route == 'profile' }></profile>
    <project if={ route == 'project' && id && !action }></project>
    <newring if={ route == 'project' && id && action == 'new' }></newring>
    <control if={ route == 'project' && id && action == 'old'}></control>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        riotcontrol.on('main', function(route, id, action) {
            self.update({route: route, id: id, action: action})
        })
    </script>
</app-main>