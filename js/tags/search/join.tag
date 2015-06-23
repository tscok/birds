<join>
    <span if={ typeof isPending === 'boolean' && typeof isMember === 'boolean' }>
        <i if={ !isActive }>[I]</i>
        <i if={ isPending }>[P]</i>
        <i if={ isMember }>[M]</i>
        <button type="button" if={ !isPending && !isMember && isActive } onclick={ join }>Join</button>
        <button type="button" if={ isPending === true } onclick={ undo }>Undo</button>
    </span>
    <span if={ typeof isPending !== 'boolean' && typeof isMember !== 'boolean' }>…</span>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        self.isActive = opts.project.isActive

        join(e) {
            riotcontrol.trigger('join_project', opts.project.pid)
            self.isPending = true
        }

        undo(e) {
            riotcontrol.trigger('join_undo', opts.project.pid)
            self.isPending = false
        }

        riotcontrol.on('join_pending', function(status, project_id) {
            if (project_id === opts.project.pid) {
                self.update({isPending: status})
            }
        })

        riotcontrol.on('join_member', function(status, project_id) {
            if (project_id === opts.project.pid) {
                self.update({isMember: status})
            }
        })

        riotcontrol.trigger('join_status', opts.project.pid)
    </script>
</join>
