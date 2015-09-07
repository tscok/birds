<pending>
    <span> ({ count })</span>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        riotcontrol.on('pending_count_' + opts.pid, function(count) {
            console.log(count, opts.pid);
            self.update({count: count})
        })
    </script>
</pending>