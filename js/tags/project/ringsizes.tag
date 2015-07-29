<ringsizes>
    <button onclick={ toggleForm }>Ring Sizes</button>
    <form if={ showForm } name="frmRingsizes" onsubmit={ add }>
        <list items={ ringsizes }>
            <span>{ item.size }</span><span>{ item.id }</span>
        </list>
        <input type="number" step="0.5" name="size" placeholder="Ring Size" required>
        <input type="text" name="id" placeholder="Serial Number" required>
        <button onclick={ add }>Add</button>
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
                ringSize: self.size.value,
                ringId: self.id.value.toUpperCase(),
                pid: opts.data
            }
            riotcontrol.trigger('ringsizes_add', data)
            self.frmRingsizes.reset()
        }

        riotcontrol.on('ringsizes_listed', function(list) {
            self.update({ringsizes: list})
        })
    </script>
</ringsizes>