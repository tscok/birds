<membership>
    <button onclick={ allow }>Allow</button>
    <button onclick={ deny }>Deny</button>
    
    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        self.item = opts.data.item

        allow() {
            riotcontrol.trigger('membership_allow', self.item)
        }

        deny() {
            riotcontrol.trigger('membership_deny', self.item)
        }
    </script>
</membership>
