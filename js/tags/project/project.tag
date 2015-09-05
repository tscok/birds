<project>
    <p if={ loading }>Loading…</p>

    <div if={ !loading }>
        <h2>{ data.title }<span if={ data.site }>, { data.site }</span></h2>
        <p>{ data.date.start } &ndash; { data.date.end }</p>
        <memberlist if={ data.isOwner }></memberlist>
        <ringsize pid={ data.pid }></ringsize>
    </div>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        self.loading = true

        riotcontrol.on('project_data', function(data) {
            self.update({data: data, loading: false})
        })
    </script>
</project>
