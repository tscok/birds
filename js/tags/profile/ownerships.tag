<ownerships>
    <list heading="Project ownerships" items={ list } status={ message }>
        <a href="#project/{ pid }">{ title }, { site }</a>
    </list>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        self.list = []
        self.message = 'Loading…'

        riotcontrol.on('ownerships', function(ownerships) {
            self.update({list: ownerships, message: !ownerships.length ? 'No ownerships found.' : ''})
        })
    </script>
</ownerships>
