<members>
    <div if={ pending || members }>
        <h2>Members</h2>
        <ul class="pending" if={ pending } style="background-color:papayawhip">
            <li each={ pending }>{ name }
                <span><button type="button" onclick={ parent.grant }>Grant</button></span></li>
        </ul>
        <ul class="member" if={ members } style="background-color:palegreen;">
            <li each={ members }>{ name }
                <span><button type="button" onclick={ parent.revoke }>Revoke</button></span></li>
        </ul>
    </div>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        self.count = 0

        grant(e) {
            var user = e.item
            riotcontrol.trigger('member_grant', user.uid, self.opts.pid)
        }

        revoke(e) {
            var user = e.item
            riotcontrol.trigger('member_revoke', user.uid, self.opts.pid)
        }

        riotcontrol.on('members_listed', function(list) {
            self.update({members: list.members, pending: list.pending})
        })

        self.on('update', function() {
            if (!self.pid && self.opts.pid) {
                self.pid = self.opts.pid
                console.log('current pid',self.pid);
                riotcontrol.trigger('list_members', self.pid)
            }
        })
    </script>
</members>