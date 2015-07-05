<project>
    <div if={ show } class="dashboard">
        <members></members>
    </div>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        riotcontrol.on('route_changed', function(route) {
            self.update({show: route == 'project'})
        })

        riotcontrol.on('route_project', function(pid) {
            riotcontrol.trigger('list_members', pid)
        })
    </script>
</project>
