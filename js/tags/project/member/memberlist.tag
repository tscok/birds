<memberlist>
    <h3>Members</h3>
    <p if={ loading }>Loading…</p>

    <list items={ pending }>
        <span>{ item.name }</span>
        <span riot-tag="membership" uid={ item.uid }></span>
    </list>

    <list items={ member }>
        <span>{ item.name } ({ item.role }<span if={ item.sign }>, { item.sign }</span>)</span>
        <div riot-tag="memberrole" data={ item }></div>
    </list>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        self.loading = true

        riotcontrol.on('memberlist_data', function(type, data) {
            self[type] = data
            self.update({loading: false})
        })
    </script>
</memberlist>
