<projects>
    <h2>Projects</h2>
    <p if={ loading }>Loading…</p>

    <list heading="Own" items={ own }>
        <span><a href="#project/{ item.pid }">{ item.title }</a>, { item.site }, Ends { item.date.end }</span>
        <span riot-tag="pending" pid={ item.pid }></span>
    </list>

    <list heading="Member" items={ member }>
        <span><a href="#project/{ item.pid }">{ item.title }</a>, { item.site }, { item.date.start }-{ item.date.end }</span>
        <button type="button" onclick={ parent.parent.leaveProject }>X</button>
    </list>

    <list heading="Pending" items={ pending }>
        <span>{ item.title }, { item.site }, { item.date }</span>
        <button type="button" onclick={ parent.parent.removePending }>X</button>
    </list>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        self.loading = true

        leaveProject(e) {
            var data = e.item.item
            riotcontrol.trigger('membership_revoke', data)
        }

        removePending(e) {
            var data = e.item.item
            riotcontrol.trigger('membership_deny', data)
        }

        riotcontrol.on('projects_data', function(type, data) {
            self[type] = data
            self.update({loading: false})
        })

        riotcontrol.on('projects_clear', function() {
            self.update({own: [], member: [], pending: []})
        })
    </script>
</projects>
