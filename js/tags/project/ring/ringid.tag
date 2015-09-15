<ringid>
    <label>Ring ID</label><br>
    <input type="text" name="ringid" onblur={ lookup } autocomplete="off" required>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this
        
        lookup(e) {
            if (self.ringid.value.length) {
               riotcontrol.trigger('ringid_match', self.ringid.value)
            }
        }

        riotcontrol.on('ringid_data', function(data) {
            console.log('ringid', data);
        })
    </script>
</ringid>
