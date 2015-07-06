<projects>
    <h2>Projects</h2>
    <list each={ type, list in types } heading="{ type }" items={ list }>
        <a href="#project/{ pid }">{ title }, { site }</a>
        <pendingcount if={ own } pid={ pid }></pendingcount>
    </list>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        self.types = {}

        types = {}

        riotcontrol.on('projects', function(type, list) {
            self.types[type] = list
            self.update()
        })
    </script>
</projects>
