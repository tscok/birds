<membership>
    <button if={ type == 'pending' } onclick={ allow }>Allow</button>
    <button if={ type == 'pending' } onclick={ deny }>Deny</button>
    
    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        self.type = self.parent.type
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
            this.removeItem(self.item)
        }

        deny() {
            riotcontrol.trigger('membership_deny', self.item)
            this.removeItem(self.item)
        }

    </script>
</membership>
