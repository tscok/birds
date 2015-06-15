<dashboard>
    <div if={ show }>
        <div if={ !data }>Loading…</div>

        <div if={ data }>
            <h1>{ data.title }</h1>
            <p>{ data.site }, { data.dateStart } &ndash; { data.dateEnd }</p>
        </div>
        <div if={ data.isOwner }>
            <members pid={ data.pid } />
        </div>
        
        <!--
        <button type="button">Edit Rings</button>
        <button type="button" onclick={ remove }>Remove project</button>
        -->
    </div>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        self.show = false

        // remove(e) {
        //     riotcontrol.trigger('project_delete', self.pid);
        // }

        riotcontrol.on('dashboard_data', function(project) {
            self.update({data: project})
        })

        riotcontrol.on('route_changed', function(route, id) {
            if(route == 'project' && id) {
                riotcontrol.trigger('dashboard_init', id)
            }
            self.update({show: (route == 'project' && id)})
        })
    </script>
</dashboard>