<ringlist>
    <a href onclick={ toggleForm }>Toggle Rings</a>

    <div if={ showForm }>
        <h3>Rings</h3>
        <div each={ rings }>
            <span>{ size }, { snid }</span>
            <button type="button" onclick={ parent.removeSize }>X</button>
        </div>

        <form name="frmRinglist" onsubmit={ saveSize }>
            <label>Size</label><br>
            <input type="number" step="0.5" name="size" placeholder="Ring size" autocomplete="off" required><br>
            <label>Serial number</label><br>
            <input type="text" name="snid" placeholder="Serial number" autocomplete="off" required><br>
            <button type="submit">Save</button>
            <button type="button" onclick={ resetForm }>Cancel</button>
        </form>
    </div>

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
            riotcontrol.trigger('ringlist_add', data)
            self.frmRinglist.reset()
            self.size.focus()
        }

        removeSize(e) {
            riotcontrol.trigger('ringlist_remove', e.item)
        }

        resetForm(e) {
            self.frmRinglist.reset()
            self.toggleForm()
        }

        riotcontrol.on('ringlist_data', function(list) {
            self.update({rings: list})
        })

        riotcontrol.on('ringlist_hide', function() {
            self.update({showForm: false})
        })
    </script>
</ringlist>
