<join>
    <span if={ 'isMember' in opts.project && 'isPending' in opts.project }>
        <span if={ isMember }>[M]</span>
        <span if={ isPending }>[P]</span>
        <button type="button" if={ !isOwner && !isEnded && !isPending && !isMember } onclick={ join }>Join</button>
    </span>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        self.isOwner = opts.project.isOwner
        self.isEnded = opts.project.isEnded
        self.isMember = opts.project.isMember
        self.isPending = opts.project.isPending

        join(e) {
            riotcontrol.trigger('project_join', opts.project.pid)
            self.isPending = true;
        }
    </script>
</join>