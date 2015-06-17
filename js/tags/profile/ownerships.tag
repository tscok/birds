<ownerships>
    <li each={ list }><a href="#project/{ pid }">{ title }, { site }</a></li>
    <li if={ !list.length }>{ loadText }</li>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        self.list = []
        self.loadText = 'Loading…'

        // riotcontrol.on('route_changed', function(route) {
        //     if (route == 'profile') {
        //         self.update({list: []})
        //     }
        // })

        riotcontrol.on('ownerships', function(list) {
            self.update({list: list, loadText: !list.length ? 'No ownerships found.' : ''})
        })
    </script>
</ownerships>
