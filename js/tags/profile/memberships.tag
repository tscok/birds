<memberships>
    <list heading="Project memberships" items={ list } status={ message }>
        <a href="#project/{ pid }">{ title }, { site }</a>
    </list>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        self.list = []
        self.message = 'Loading…'

        riotcontrol.on('memberships', function(memberships) {
            self.update({list: memberships, message: !memberships.length ? 'No memberships found.' : ''})
        })
    </script>
</memberships>
