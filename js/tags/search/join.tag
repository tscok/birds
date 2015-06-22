<join>
    <span if={ typeof isPending === 'boolean' && typeof isMember === 'boolean' }>
        <i if={ isPending }>[P]</i>
        <i if={ isMember }>[M]</i>
        <button type="button" if={ !isPending && !isMember && opts.project.isActive } onclick={ join }>Join</button>
    </span>
    <span if={ typeof isPending !== 'boolean' && typeof isMember !== 'boolean' }>…</span>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        join(e) {
            riotcontrol.trigger('project_join', opts.project.pid)
            self.isPending = true;
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
