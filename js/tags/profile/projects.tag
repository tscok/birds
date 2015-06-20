<projects>
    <list heading="Project { opts.type }" items={ list } status={ message }>
        <a href="#project/{ pid }">{ title }, { site }</a>
    </list>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        self.list = []
        self.message = 'Loading…'

        riotcontrol.on('projects', function(list, type) {
            if (opts.type == type) {
                self.update({list: list, message: !list.length ? "No projects found." : ""})
            }
        })
    </script>
</projects>
