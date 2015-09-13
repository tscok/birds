<membership>
    <button onclick={ allow }>Allow</button>
    <button onclick={ deny }>Deny</button>
    
    <script>
        var riotcontrol = require('riotcontrol')

        allow() {
            var data = {
                title: this.parent.data.title,
                site: this.parent.data.site,
                date: this.parent.data.date,
                pid: this.parent.id,
                uid: opts.uid
            }
            riotcontrol.trigger('membership_allow', data)
        }

        deny() {
            var data = {
                pid: this.parent.id,
                uid: opts.uid
            }
            riotcontrol.trigger('membership_deny', data)
        }
    </script>
</membership>
