<members>
    <h2>Members</h2>
    <p if={ !Object.keys(members).length }>No members found.</p>

    <list if={ members['pending'] } heading="Pending" items={ members['pending'] }>
        <span>{ item.name }</span>
        <membership data={ this }></membership>
    </list>

    <list if={ members['member'] } heading="Member" items={ members['member'] }>
        <span>{ item.name }</span>
        <span>({ item.role }<span if={ item.sign }>, { item.sign }</span>)</span>
        <role data={ this }></role>
    </list>

    <!-- <list each={ type, list in members } heading={ type } items={ list }>
        <span>{ item.name } { item.role ? '('+item.role+', '+item.sign+')' : '' }</span>
        <membership data={ this }></membership>
        <role if={ parent.type == 'member' } data={ this }></role>
    </list>
    <p if={ !Object.keys(members).length }>No members found.</p> -->

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        // On route, clear members.
        riotcontrol.on('route_project', function(pid) {
            self.update({members: {}})
        })

        // Per event type, populate members.
        riotcontrol.on('members_listed', function(type, list) {
            self.members[type] = list
            self.update()
        })

        // On empty result, clear members.
        riotcontrol.on('members_empty', function() {
            self.update({members: {}})
        })
    </script>
</members>
