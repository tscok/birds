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
        <project if={ route == 'project' }></project>
    </main>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        riotcontrol.on('route_changed', function(route) {
            self.update({route: route})
        })
    </script>
</app>