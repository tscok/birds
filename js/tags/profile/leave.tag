<leave>
    <button onclick={ leave }>X</button>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        leave() {
            var item = self.item
            var list = self.parent.opts.items
            var index = list.indexOf(item)
            
            if (index != -1) {
                list.splice(index, 1)
                self.parent.update()

                riotcontrol.trigger('leave_project', self.item.pid)
            }
        }

    </script>
</leave>
