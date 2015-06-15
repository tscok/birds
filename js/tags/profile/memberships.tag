<memberships>
    <li each={ list }>Project { name }</li>
    <li if={ !list.length }>No memberships found.</li>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        self.list = []

        riotcontrol.on('memberships', function(list) {
            self.update({list: list})
        })
    </script>
</memberships>