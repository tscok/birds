var riotcontrol = require('riotcontrol')

<ringsize>
    <a href onclick={ toggleForm }>Toggle Ring Sizes</a>
    <form name="frmRingsize" onsubmit={ add } if={ showForm }>
        <list items={ rings }>
            <span>{ item.size }</span><span>{ item.snid }</span>
            <button type="button" onclick={ parent.parent.remove }>X</button>
        </list>
        <input type="number" step="0.5" name="size" placeholder="Ring size" required>
        <input type="text" name="snid" placeholder="Serial number" required>
        <button type="submit">Add</button>
    </form>

    <script>
        var self = this

        toggleForm() {
            self.showForm = !self.showForm
        }

        add(e) {
            var data = {
                size: self.size.value,
                snid: self.snid.value.toUpperCase()
            }
            riotcontrol.trigger('ringsize_add', data)
            self.frmRingsize.reset()
            self.size.focus()
        }

        remove(e) {
            riotcontrol.trigger('ringsize_remove', e.item.item)
        }

        riotcontrol.on('ringsize_data', function(list) {
            self.update({rings: list})
        })

        riotcontrol.on('ringsize_init', function(list) {
            self.update({showForm: false})
        })
    </script>
</ringsize>
