<ringsizes>
    <a href onclick={ toggleForm }>{ showForm ? 'Hide' : 'Show' } Ring Sizes</a>

    <form if={ showForm } name="frmRingsizes" onsubmit={ add }>
        <list items={ ringsizes }>
            <span>{ item.ringSize }</span><span>{ item.serialNumber }</span>
            <button type="button" onclick={ parent.parent.remove }>X</button>
        </list>
        <input type="number" step="0.5" name="ringSize" placeholder="Ring Size" required>
        <input type="text" name="serialNumber" placeholder="Serial Number" required>
        <button type="submit">Add</button>
    </form>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        self.ringsizes = []

        toggleForm() {
            self.showForm = !self.showForm
        }

        add() {
            var data = {
                ringSize: self.ringSize.value,
                serialNumber: self.serialNumber.value.toUpperCase()
            }
            riotcontrol.trigger('ringsizes_add', data)
            self.frmRingsizes.reset()
        }

        remove(e) {
            var data = e.item.item
            riotcontrol.trigger('ringsizes_remove', data)
        }

        riotcontrol.on('ringsizes_listed', function(list) {
            self.update({ringsizes: list})
        })

        riotcontrol.on('route_changed', function() {
            self.update({showForm: false})
        })
    </script>
</ringsizes>
