<pendingcount>
    <span if={ count }>({ count })</span>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        riotcontrol.on('pending_count_' + opts.data, function(num) {
            self.update({count: num})
        })

        riotcontrol.trigger('count_pending', opts.data)
    </script>
</pendingcount>
