var riotcontrol = require('riotcontrol')
require('./membership.tag')
require('./memberrole.tag')

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
        var self = this

        self.loading = true

        riotcontrol.on('memberlist_data', function(type, data) {
            self[type] = data
            self.update({loading: false})
        })

        riotcontrol.on('memberlist_clear', function(type) {
            self[type] = []
            self.update()
        })

        // // On route, clear members.
        // riotcontrol.on('route_project', function(pid, action) {
        //     if (!action) {
        //         self.update({members: {}})
        //     }
        // })

        // // Per event type, populate members.
        // riotcontrol.on('memberlist_data', function(type, list) {
        //     self.members[type] = list
        //     self.update()
        // })

        // // On empty result, clear members and cancel loader.
        // riotcontrol.on('memberlist_empty', function() {
        //     self.update({members: {}, loading: false})
        // })
    </script>
</memberlist>
