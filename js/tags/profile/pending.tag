<pending>
    <span if={ count }> ({ count })</span>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        riotcontrol.on('pending_count_' + opts.pid, function(count) {
            self.update({count: count})
        })
    </script>
</pending>