<memberstatus>
    <button if={ type == 'pending' || type == 'standby' } onclick={ granted }>Grant</button>
    <button if={ type == 'pending' || type == 'granted' } onclick={ standby }>Standby</button>
    <button onclick={ revoke }>Revoke</button>

    <script>
        var self = this

        self.type = opts.data.parent.type
        self.item = opts.data.item

        /**
         * Pending - Grant, Standby, Revoke
         * Granted -        Standby, Revoke
         * Standby - Grant,          Revoke
         */
        
        granted() {
            self.trigger('membership_granted', self.item)
        }

        standby() {
            self.trigger('membership_standy', self.item)
        }

        revoke() {
            self.trigger('membership_revoke', self.item)
        }

        self.on('membership_update', function() {
            self.parent.update()
        })
        
    </script>
</memberstatus>
