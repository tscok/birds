var riotcontrol = require('riotcontrol')

<membership>
    <button onclick={ allow }>Allow</button>
    <button onclick={ deny }>Deny</button>
    
    <script>
        var data = {
            pid: this.parent.id,
            uid: opts.uid
        }

        allow() {
            riotcontrol.trigger('membership_allow', data)
        }

        deny() {
            riotcontrol.trigger('membership_deny', data)
        }
    </script>
</membership>
