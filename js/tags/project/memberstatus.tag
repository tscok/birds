<memberstatus>
    <button if={ type == 'pending' || type == 'standby' } onclick={ granted }>Grant</button>
    <button if={ type == 'pending' || type == 'granted' } onclick={ standby }>Standby</button>
    <button if={ type == 'granted' || type == 'standby' } onclick={ revoked }>Revoke</button>
    <button if={ type == 'pending' } onclick={ refused }>Refuse</button>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        self.type = self.parent.type
        self.item = opts.data.item

        /**
         * Pending - Grant, Standby, Refuse
         * Granted -        Standby, Revoke
         * Standby - Grant,          Revoke
         */
        
        removeItem(item) {
            var list = self.parent.list
            var index = list.indexOf(item)
            list.splice(index, 1)
            self.parent.update()
        }
        
        refused() {
            riotcontrol.trigger('membership_refused', self.item)
            this.removeItem(self.item)
        }

        granted() {
            riotcontrol.trigger('membership_granted', self.item, self.type)
            this.removeItem(self.item)
        }

        standby() {
            riotcontrol.trigger('membership_standby', self.item, self.type)
            this.removeItem(self.item)
        }

        revoked() {
            riotcontrol.trigger('membership_revoked', self.item, self.type)
            this.removeItem(self.item)
        }
        
    </script>
</memberstatus>
