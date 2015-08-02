<app>
    <header>
        <navigation></navigation>
    </header>
    <main>
        <alert></alert>
        <login if={ route == 'login' }></login>
        <register if={ route == 'register' }></register>
        <create if={ route == 'create' }></create>
        <search if={ route == 'search' }></search>
        <profile if={ route == 'profile' }></profile>
        <project if={ route == 'project' && id && !action }></project>
        <newring if={ route == 'project' && id && action == 'new' }></newring>
        <control if={ route == 'project' && id && action == 'old'}></control>
    </main>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        riotcontrol.on('route', function(route, id, action) {
            self.update({route: route, id: id, action: action})
        })

        riotcontrol.on('route_project', function(pid) {
            riotcontrol.trigger('membership_check', pid);
        })
    </script>
</app>