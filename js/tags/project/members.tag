<members>
    <h2>Members</h2>
    <list each={ type, list in members } heading={ type } items={ list }>
        <span>{ item.name }</span>
        <membership data={ this }></membership>
    </list>
    <p if={ !Object.keys(members).length }>No members found.</p>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        self.members = {}
        self.message = 'No members found.'

        // On route, clear members.
        riotcontrol.on('route_project', function(pid) {
            self.update({members: {}})
        });

        // Per event type, populate members.
        riotcontrol.on('members_listed', function(type, list) {
            self.members[type] = list
            self.update()
        })
    </script>
</members>
