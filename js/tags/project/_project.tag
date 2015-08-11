var riotcontrol = require('riotcontrol')
require('./member/memberlist.tag')
require('./ring/ringsize.tag')

<project>
    <h2>Project</h2>
    <p if={ loading }>Loading…</p>

    <div if={ !loading }>
        <h3>{ data.title }<span if={ data.site }>, { data.site }</span></h3>
        <p>{ data.dateStart } &ndash; { data.dateEnd }</p>
        <memberlist if={ data.isOwner }></memberlist>
        <ringsize pid={ data.pid }></ringsize>
    </div>

    <script>
        var self = this

        self.loading = true

        riotcontrol.on('project_data', function(data) {
            self.update({data: data, loading: false})
        })

        // self.isLoading = true
        // self.project = {}
        
        // riotcontrol.on('route_project', function(pid, action) {
        //     if (!action) {
        //         riotcontrol.trigger('project_init', pid)
        //         riotcontrol.trigger('memberlist_init', pid)
        //         riotcontrol.trigger('ringsizes_init', pid)
        //         // self.update({project: {}, isLoading: true})
        //     }
        // })

        // riotcontrol.on('project_data', function(data) {
        //     self.update({project: data, isLoading: false})
        // })
    </script>
</project>
