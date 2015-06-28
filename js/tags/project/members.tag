<members>
    <list heading="Members { opts.type }" items={ list } status={ message }>
        <span>{ uid }, { name }</span>
    </list>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        self.list = []
        self.message = 'Loading…'

        riotcontrol.on('members', function(list, type) {
            if (opts.type == type) {
                self.update({list: list, message: !list.length ? 'No result' : ''})
            }
        })
    </script>
</members>
