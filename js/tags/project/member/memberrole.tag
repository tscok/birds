var riotcontrol = require('riotcontrol')
var utils = require('../../../utils')

<memberrole>
    <button onclick={ toggleForm }>…</button>
    <form name="frmRoles" onsubmit={ edit } if={ showForm }>
        <label><input type="checkbox" name="ringer" onclick={ toggleTextfield } checked={ isChecked }> Ringer</label><br>
        <input type="text" name="sign" placeholder="Signature" value={ signValue } disabled={ isDisabled }><br><br>
        <button type="submit">Update</button>
        <button type="button" onclick={ revoke }>Revoke</button>
    </form>

    <script>
        var self = this

        self.isChecked = opts.data.role == 'ringer'
        self.signValue = opts.data.sign
        self.isDisabled = !self.isChecked

        toggleForm() {
            self.showForm = !self.showForm
        }

        toggleTextfield(e) {
            self.isDisabled = !e.target.checked

            if (!self.isDisabled) {
                setTimeout(function(args) {
                    self.sign.focus()
                }, 1)
            }
        }

        edit() {
            var data = {
                newRole: self.ringer.checked ? 'ringer' : 'assistant',
                newSign: self.ringer.checked ? self.sign.value : '',
                pid: self.parent.id
            }

            var msg = 'Looks like you forgot to enter a signature.'
            if (data.newRole == 'ringer' && !data.newSign.length) {
                riotcontrol.trigger('alert', msg, 'warning')
                self.sign.focus()
                return;
            }
            
            riotcontrol.trigger('memberrole_edit', utils.extend(opts.data, data))
            riotcontrol.trigger('alert_clear')
        }

        revoke() {
            var data = {pid: self.parent.id, uid: opts.data.uid}
            riotcontrol.trigger('membership_revoke', data)
        }
    </script>
</memberrole>
