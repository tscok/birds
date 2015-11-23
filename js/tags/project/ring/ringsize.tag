<ringsize>
    <input type="hidden" name="snid">
    <div riot-tag="dropdown" label="ringSize" require="required">
        <option each={ ringsize } value={ size }>{ size }</option>
    </div>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        setRingsize(size) {
            parent.frmRing.ringSize.value = size
            var index = parent.frmRing.ringSize.selectedIndex
            if (index == -1) {
                var msg = 'Suggested ring size (' + size + ') not listed in Rings.'
                riotcontrol.trigger('alert', msg, 'warning')
                return
            }
            self.setSnid(size)
        }

        setSnid(size) {
            self.ringsize.forEach(function(item) {
                if (item.size == size) {
                    self.snid.value = item.snid
                }
            })
        }

        riotcontrol.on('ringlist_data', function(data) {
            console.log('got ringlist data', data);
            self.update({ringsize: data})
        })
    </script>
</ringsize>
