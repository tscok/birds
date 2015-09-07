<projects>
    <h2>Projects</h2>
    <p if={ loading }>Loading…</p>

    <list heading="Own" items={ own }>
        <a href="#project/{ item.pid }">{ item.title }<span if={ item.site }>, { item.site }</span></a>
        <span riot-tag="pending" pid={ item.pid }></span>
    </list>

    <list heading="Member" items={ member }>
        <a href="#project/{ item.pid }">{ item.title }<span if={ item.site }>, { item.site }</span></a>
        <button type="button" onclick={ parent.parent.leaveProject }>X</button>
    </list>

    <list heading="Pending" items={ pending }>
        <span>{ item.title }<span if={ item.site }>, { item.site }</span></span>
        <button type="button" onclick={ parent.parent.undoPending }>X</button>
    </list>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        self.loading = true

        leaveProject(e) {
            var data = e.item.item
            riotcontrol.trigger('membership_revoke', data)
        }

        undoPending(e) {
            var data = e.item.item
            riotcontrol.trigger('membership_deny', data)
        }

        riotcontrol.on('projects_data', function(type, data) {
            self[type] = data
            self.update({loading: false})
        })

        riotcontrol.on('projects_clear', function(type) {
            self[type] = []
            self.update()
        })
    </script>
</projects>
