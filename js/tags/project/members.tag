<members>
    <h2>Members</h2>
    <list each={ type, list in types } heading={ type } items={ list }>
        <span>{ item.name }</span>
        <memberstatus data={ this }></memberstatus>
    </list>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        riotcontrol.on('route_project', function(pid) {
            self.update({types: {}})
        });

        riotcontrol.on('members', function(type, list) {
            self.types[type] = list
            self.update()
        })
    </script>
</members>
