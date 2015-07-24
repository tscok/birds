<project>
    <div if={ show } class="dashboard">
        <members if={ isOwner }></members>
    </div>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        riotcontrol.on('route_changed', function(route) {
            self.update({show: route === 'project'})
        })

        riotcontrol.on('route_project', function(pid) {
            riotcontrol.trigger('init_project', pid)
            riotcontrol.trigger('list_members', pid)
            self.update({isOwner: false})
        })

        riotcontrol.on('project_data', function(data) {
            self.update({isOwner: data.isOwner})
        })
    </script>
</project>
