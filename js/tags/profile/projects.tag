<projects>
    <h2>Projects</h2>
    <p if={ loading }>Loading…</p>

    <div if={ !loading }>
        <list heading="Own" items={ own }>
            <span><a href="#project/{ item.pid }">{ item.title }</a>, { item.site }, { item.dateStart } &ndash; { item.dateEnd }</span>
            <span riot-tag="pending" pid={ item.pid }></span>
        </list>

        <p if={ !own.length }>Project leader type? It's easy to <a href="#create">create a project</a> for others to join, or private if you prefer.</p>

        <list heading="Member" items={ member }>
            <span><a href="#project/{ item.pid }">{ item.title }</a>, { item.site }, { item.dateStatus }</span>
            <button type="button" onclick={ parent.parent.leaveProject }>X</button>
        </list>

        <p if={ !member.length }>No leader type? Know of an existing project? Try to <a href="#search">find it here</a>, then send a membership request.</p>

        <list heading="Pending" items={ pending } if={ pending.length }>
            <span>{ item.title }, { item.site }, { item.pendingSince }</span>
            <button type="button" onclick={ parent.parent.removePending }>X</button>
        </list>
    </div>

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
