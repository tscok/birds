<verify>
    <button type="button" onclick={ toggle } if={ !edit }>Change…</button>
    <button type="button" onclick={ toggle } if={ edit }>Cancel</button>
    <div if={ edit }>
        <input type="password" name="oldpassword" placeholder="Current password"><br>
        <button type="submit">Update</button>
    </div>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        self.edit = false
        self.oldpassword.value = ''

        toggle(e) {
            self.edit = !self.edit
            self.oldpassword.value = ''
        }
    </script>
</verify>
