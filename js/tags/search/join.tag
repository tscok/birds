<join>
    <span if={ typeof isPending == 'boolean' && typeof isMember == 'boolean' }>
        <i if={ !isActive }>[I]</i>
        <i if={ isPending }>[P]</i>
        <i if={ isMember }>[M]</i>
        <button type="button" if={ !isPending && !isMember && isActive } onclick={ request }>Join</button>
        <button type="button" if={ isPending == true } onclick={ undo }>Undo</button>
    </span>
    <span if={ typeof isPending != 'boolean' && typeof isMember != 'boolean' }>…</span>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        self.isActive = opts.data.isActive

        request(e) {
            riotcontrol.trigger('membership_request', {pid: opts.data.pid})
            self.isPending = true
        }

        undo(e) {
            riotcontrol.trigger('membership_deny', {pid: opts.data.pid})
            self.isPending = false
        }

        riotcontrol.on('join_pending', function(status, projectId) {
            if (projectId === opts.data.pid) {
                self.update({isPending: status})
            }
        })

        riotcontrol.on('join_member', function(status, projectId) {
            if (projectId === opts.data.pid) {
                self.update({isMember: status})
            }
        })

        riotcontrol.trigger('join_status', opts.data.pid)
    </script>
</join>
