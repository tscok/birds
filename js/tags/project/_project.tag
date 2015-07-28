<project>
    <div if={ Object.keys(project).length }>
        <h1>{ project.title }<span if={ project.site }>, { project.site }</span></h1>
        <p>{ project.dateStart } &ndash; { project.dateEnd }</p>
    </div>
    <memberlist if={ project.isOwner }></memberlist>
    <rings></rings>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        riotcontrol.on('route_project', function(pid) {
            riotcontrol.trigger('init_project', pid)
            riotcontrol.trigger('list_members', pid)
            self.update({project: {}})
        })

        riotcontrol.on('project_data', function(data) {
            self.update({project: data})
        })
    </script>
</project>
