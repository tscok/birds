<leave>
    <button onclick={ leave }>X</button>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        leave() {
            var item = self.item
            var index = self.parent.list.indexOf(item)
            self.parent.list.splice(index, 1)
            self.parent.update()

            riotcontrol.trigger('leave_project', self.item.pid)
        }

    </script>
</leave>
