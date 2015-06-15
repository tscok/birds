<ownerships>
    <li each={ list }><a href="#project/{ pid }">{ title }, { site }</a></li>
    <li if={ !list.length }>{ loadText }</li>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        self.list = []
        self.loadText = 'Loading…'

        riotcontrol.on('ownerships', function(list) {
            self.update({list: list, loadText: !list.length ? 'No ownerships found.' : ''})
        })
    </script>
</ownerships>