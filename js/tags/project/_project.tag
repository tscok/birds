var riotcontrol = require('riotcontrol')
require('./member/memberlist.tag')
require('./ring/ringsize.tag')

<project>
    <h2>Project</h2>
    <p if={ loading }>Loading…</p>

    <div if={ !loading }>
        <h3>{ data.title }<span if={ data.site }>, { data.site }</span></h3>
        <p>{ data.date.start } &ndash; { data.date.end }</p>
        <memberlist if={ data.isOwner }></memberlist>
        <ringsize pid={ data.pid }></ringsize>
    </div>

    <script>
        var self = this

        self.loading = true

        riotcontrol.on('project_data', function(data) {
            self.update({data: data, loading: false})
        })
    </script>
</project>
