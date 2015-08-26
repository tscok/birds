<memberlist>
    <h3>Members</h3>
    <p if={ loading }>Loading…</p>

    <list heading="Pending" items={ pending }>
        <span>{ item.name }</span>
        <membership uid={ item.uid }></membership>
    </list>

    <list heading="Member" items={ member }>
        <span>{ item.name }</span>
        <span>({ item.role }<span if={ item.sign }>, { item.sign }</span>)</span>
        <memberrole data={ item }></memberrole>
    </list>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        self.loading = true

        riotcontrol.on('memberlist_data', function(type, data) {
            self[type] = data
            self.update({loading: false})
        })

        riotcontrol.on('memberlist_clear', function() {
            self.update({pending: [], member: []})
        })
    </script>
</memberlist>
