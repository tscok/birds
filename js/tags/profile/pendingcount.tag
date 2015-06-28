<pendingcount>
    <span if={ count }>({ count })</span>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        riotcontrol.trigger('count_pending', opts.pid)

        riotcontrol.on('pending_count_' + opts.pid, function(num) {
            self.update({count: num})
        })
    </script>
</pendingcount>