var riotcontrol = require('riotcontrol')

<ringsize>
    <a href onclick={ toggleForm }>Toggle Ring Sizes</a>
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
        var self = this

        toggleForm() {
            self.showForm = !self.showForm
        }

        // self.ringsizes = []
        // self.showForm = false

        // add() {
        //     var data = {
        //         ringSize: self.ringSize.value,
        //         serialNumber: self.serialNumber.value.toUpperCase()
        //     }
        //     riotcontrol.trigger('ringsizes_add', data)
        //     self.frmRingsizes.reset()
        // }

        // remove(e) {
        //     riotcontrol.trigger('ringsizes_remove', e.item.item)
        // }

        // riotcontrol.on('ringsizes_data', function(list) {
        //     self.update({ringsizes: list})
        // })

        // riotcontrol.on('route', function(route, id, action) {
        //     if (!action) {
        //         self.update({showForm: false})
        //     }
        // })
    </script>
</ringsize>
