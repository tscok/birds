<projects>
    <list heading="Project { opts.type }" items={ list } status={ message }>
        <a href="#project/{ pid }">{ title }, { site }</a>
        <pendingcount pid={ pid }></pendingcount>
    </list>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        self.list = []
        self.message = 'Loading…'

        riotcontrol.on('projects', function(type, list) {
            if (opts.type == type) {
                self.update({list: list, message: !list.length ? "No projects found." : ""})
            }
        })
    </script>
</projects>
