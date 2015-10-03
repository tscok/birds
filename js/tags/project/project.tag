<project>
    <p if={ loading }>Loading…</p>

    <div if={ !loading }>
        <h2>{ data.title }<span if={ data.site }>, { data.site }</span></h2>
        <p>{ data.dateStart } &ndash; { data.dateEnd }</p>
        <p if={ memberdata }>Your role in project: {memberdata.role} <span if={memberdata.sign}>({memberdata.sign})</span></p>
        <memberlist if={ data.isOwner }></memberlist>
        <ringlist pid={ data.pid }></ringlist>
    </div>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        self.loading = true

        riotcontrol.on('project_data', function(data) {
            self.update({data: data, loading: false})
        })

        riotcontrol.on('project_clear', function() {
            self.update({data: null, loading: true})
        })

        riotcontrol.on('membership_data', function(data) {
            self.update({memberdata: data})
        })
    </script>
</project>
