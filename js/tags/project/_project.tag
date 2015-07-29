<project>
    <p if={ !hasLoaded }>Loading…</p>

    <div if={ hasLoaded }>
        <h1>{ project.title }<span if={ project.site }>, { project.site }</span></h1>
        <p>{ project.dateStart } &ndash; { project.dateEnd }</p>
        <memberlist if={ project.isOwner }></memberlist>
        <ringsizes data={ project.pid }></ringsizes>
    </div>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        self.hasLoaded = false

        riotcontrol.on('route_project', function(pid) {
            riotcontrol.trigger('init_project', pid)
            riotcontrol.trigger('list_members', pid)
            riotcontrol.trigger('list_ringsizes', pid)
            self.update({project: {}})
        })

        riotcontrol.on('project_data', function(data) {
            self.update({project: data, hasLoaded: true})
        })
    </script>
</project>
