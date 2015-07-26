<projects>
    <h2>Projects</h2>

    <list if={ projects['own'] } heading="Own" items={ projects['own'] }>
        <a href="#project/{ item.pid }">{ item.title }, { item.site }</a>
        <pendingcount pid={ item.pid }></pendingcount>
    </list>

    <list if={ projects['member'] } heading="Member" items={ projects['member'] }>
        <a href="#project/{ item.pid }">{ item.title }, { item.site }</a>
        <leave item={ item.pid }></leave>
    </list>

    <list if={ projects['pending'] } heading="Pending" items={ projects['pending'] }>
        <a>{ item.title }, { item.site }</a>
        <leave item={ item.pid }></leave>
    </list>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        self.projects = {}

        // On route, clear projects.
        riotcontrol.on('route_profile', function() {
            self.update({projects: {}})
        })

        // Per event type, populate projects.
        riotcontrol.on('projects_listed', function(type, list) {
            self.projects[type] = list
            self.update()
        })
    </script>
</projects>
