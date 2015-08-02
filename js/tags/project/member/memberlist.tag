<memberlist>
    <h2>Members</h2>
    <p if={ loading && !Object.keys(members).length }>Loading…</p>
    <p if={ !loading && !Object.keys(members).length }>No members found.</p>

    <list if={ members['pending'] } heading="Pending" items={ members['pending'] }>
        <span>{ item.name }</span>
        <membership data={ this }></membership>
    </list>

    <list if={ members['member'] } heading="Member" items={ members['member'] }>
        <span>{ item.name }</span>
        <span>({ item.role }<span if={ item.sign }>, { item.sign }</span>)</span>
        <memberrole data={ this }></memberrole>
    </list>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        self.loading = true

        // On route, clear members.
        riotcontrol.on('route_project', function(pid, action) {
            if (!action) {
                self.update({members: {}})
            }
        })

        // Per event type, populate members.
        riotcontrol.on('memberlist_data', function(type, list) {
            self.members[type] = list
            self.update()
        })

        // On empty result, clear members and cancel loader.
        riotcontrol.on('memberlist_empty', function() {
            self.update({members: {}, loading: false})
        })
    </script>
</memberlist>
