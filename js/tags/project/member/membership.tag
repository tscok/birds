<membership>
    <button onclick={ allow }>Allow</button>
    <button onclick={ deny }>Deny</button>
    
    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        self.item = opts.data.item
        
        removeItem(item) {
            var list = self.parent.list
            var index = list.indexOf(item)
            if (index != -1) {
                list.splice(index, 1)
                self.parent.update()
            }
        }

        allow() {
            riotcontrol.trigger('membership_allow', self.item)
        }

        deny() {
            riotcontrol.trigger('membership_deny', self.item)
        }

    </script>
</membership>
