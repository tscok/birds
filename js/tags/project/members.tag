<members>
    <h2>Members</h2>
    <list each={ type, list in types } heading="{ type }" items={ list }>
        <span>{ name } [accept] [ignore]</span>
    </list>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        self.types = {}

        riotcontrol.on('members', function(type, list) {
            self.types[type] = list
            self.update()
        })
    </script>
</members>
