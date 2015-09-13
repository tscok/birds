<ringsize>
    <a href onclick={ toggleForm }>Toggle Ring Sizes</a>
    <form name="frmRingsize" onsubmit={ saveSize } if={ showForm }>
        <list items={ rings }>
            <span>{ item.size }</span><span>{ item.snid }</span>
            <button type="button" onclick={ parent.parent.removeSize }>X</button>
        </list>
        <input type="number" step="0.5" name="size" placeholder="Ring size" required><br>
        <input type="text" name="snid" placeholder="Serial number" required><br>
        <button type="submit">Save</button>
        <button type="button" onclick={ resetForm }>Cancel</button>
    </form>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        toggleForm() {
            self.showForm = !self.showForm
        }

        saveSize(e) {
            var data = {
                size: self.size.value,
                snid: self.snid.value.toUpperCase()
            }
            riotcontrol.trigger('ringsize_add', data)
            self.frmRingsize.reset()
            self.size.focus()
        }

        removeSize(e) {
            riotcontrol.trigger('ringsize_remove', e.item.item)
        }

        resetForm(e) {
            self.frmRingsize.reset()
            self.toggleForm()
        }

        riotcontrol.on('ringsize_data', function(list) {
            self.update({rings: list})
        })

        riotcontrol.on('ringsize_hide', function() {
            self.update({showForm: false})
        })
    </script>
</ringsize>
