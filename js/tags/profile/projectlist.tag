var riotcontrol = require('riotcontrol')
require('./projectlist.tag')
require('./pendingcount.tag')

<projectlist>
    <h2>Projects</h2>
    <p if={ loading }>Loading…</p>

    <list heading="Own" items={ own }>
        <a href="#project/{ item.pid }">{ item.title }<span if={ item.site }>, { item.site }</span></a>
        <pendingcount pid={ item.pid }></pendingcount>
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

        riotcontrol.on('projectlist_data', function(type, data) {
            self[type] = data
            self.update({loading: false})
        })

        riotcontrol.on('projectlist_clear', function(type) {
            self[type] = []
            self.update()
        })

        // self.loading = true

        // leaveProject(e) {
        //     var data = e.item.item
        //     riotcontrol.trigger('membership_revoke', data)
        // }

        // undoPending(e) {
        //     var data = e.item.item
        //     riotcontrol.trigger('membership_deny', data)
        // }

        // riotcontrol.on('projectlist_data', function(type, data) {
        //     self[type] = data
        //     self.loading = false
        //     self.update()
        //     console.log(type, 'updated', data);
        // })

        // riotcontrol.on('projectlist_clear', function(type) {
        //     self[type] = []
        //     self.update()
        //     console.log(type, 'cleared');
        // })
    </script>
</projectlist>