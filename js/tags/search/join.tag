<join>
    <span if={ loading }>…</span>

    <span if={ !loading }>
        <span if={ pending }>[Pending]</span>
        <span if={ member }>[Member]</span>
        <button type="button" onclick={ join } if={ !pending && !member }>Join</button>
        <button type="button" onclick={ undo } if={ pending }>Undo</button>
    </span>

    <script>
        var riotcontrol = require('riotcontrol')
        var moment = require('moment')
        var self = this

        self.loading = true

        join() {
            var info = {
                pid: opts.data.pid,
                title: opts.data.title,
                site: opts.data.site,
                date: moment().unix()
            }
            riotcontrol.trigger('membership_request', info)
            self.pending = true
        }

        undo() {
            riotcontrol.trigger('membership_deny', {pid: opts.data.pid})
            self.pending = false
        }

        riotcontrol.on('join_' + opts.data.pid, function(type, val) {
            self[type] = val
            self.update({loading: false})
        })

        riotcontrol.trigger('join_get_status', opts.data.pid)
    </script>
</join>
