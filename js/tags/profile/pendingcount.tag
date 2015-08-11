var riotcontrol = require('riotcontrol')

<pendingcount>
    <span if={ count }>({ count })</span>

    <script>
        var self = this
        
        riotcontrol.on('pendingcount_' + opts.pid, function(count) {
            self.update({count: count})
        })

        self.on('mount', function() {
            riotcontrol.trigger('pendingcount_init', opts.pid)
        })
    </script>
</pendingcount>
