<project>
    <p if={ isLoading }>Loading…</p>

    <div if={ !isLoading }>
        <h1>{ project.title }<span if={ project.site }>, { project.site }</span></h1>
        <p>{ project.dateStart } &ndash; { project.dateEnd }</p>
        <memberlist if={ project.isOwner }></memberlist>
        <ringsize data={ project.pid }></ringsize>
    </div>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        riotcontrol.on('route_project', function(pid, action) {
            if (!action) {
                riotcontrol.trigger('project_init', pid)
                riotcontrol.trigger('memberlist_init', pid)
                riotcontrol.trigger('ringsizes_init', pid)
                // self.update({project: {}, isLoading: true})
            }
        })

        riotcontrol.on('project_data', function(data) {
            self.update({project: data, isLoading: false})
        })
    </script>
</project>
