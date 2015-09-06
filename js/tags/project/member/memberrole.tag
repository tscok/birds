<memberrole>
    <button type="button" onclick={ toggleForm } style="position:absolute;right:0;top:0;">Edit</button>

    <form name="frmRoles" onsubmit={ editMember } if={ showForm }>
        <label><input type="checkbox" name="ringer" onclick={ toggleTextfield } checked={ isChecked }> Ringer</label><br>
        <input type="text" name="sign" placeholder="Signature" autocomplete="off" disabled={ isDisabled }><br>
        <p if={ signMissing }>Please add a ringer signature unique to this project.</p><br>
        <button type="submit">Update member</button>
        <button type="button" onclick={ revoke }>Cancel membership</button>
    </form>

    <script>
        var riotcontrol = require('riotcontrol')
        var serialize = require('form-serialize')
        var utils = require('../../../utils')
        var self = this

        self.isChecked = opts.data.role == 'ringer'
        self.isDisabled = !self.isChecked
        self.noChanges = true
        self.showForm = false

        toggleForm() {
            self.showForm = self.showForm ? false : true
            self.sign.value = opts.data.sign ? opts.data.sign : ''
            self.update()
        }

        toggleTextfield(e) {
            self.isDisabled = !e.target.checked
            if (!self.isDisabled) {
                setTimeout(function() {
                    self.sign.focus()
                }, 1)
            }
        }

        editMember() {

            var frmData = {
                newRole: self.ringer.checked ? 'ringer' : 'assistant',
                newSign: self.ringer.checked ? self.sign.value.toUpperCase() : '',
                pid: self.parent.id
            }

            var data = utils.extend(opts.data, frmData)
            var currentSign = opts.data.sign ? opts.data.sign : ''
            var roleChanged = opts.data.role != frmData.newRole
            var signChanged = currentSign != frmData.newSign

            // console.log('roleChanged %s, signChanged %s', roleChanged, signChanged);
            // console.dir(data);

            self.signMissing = false

            // Nothing changed.
            if (!roleChanged && (!signChanged || !frmData.newSign)) {
                // console.log('nothing changed', data);
                self.update({showForm: false})
                return
            }

            // Signature missing, show hint.
            if (frmData.newRole == 'ringer' && !frmData.newSign) {
                self.signMissing = true
                self.sign.focus()
                return
            }

            // Update ringer signature.
            if (!roleChanged && signChanged && frmData.newSign) {
                // console.log('update');
                riotcontrol.trigger('memberrole_update', data)
            }

            // Promote to ringer.
            if (roleChanged && frmData.newRole == 'ringer' && frmData.newSign) {
                // console.log('promote');
                riotcontrol.trigger('memberrole_promote', data)
            }

            // Demote to assistant.
            if (roleChanged && frmData.newRole == 'assistant') {
                // console.log('demote');
                riotcontrol.trigger('memberrole_demote', data)
            }
        }

        revoke() {
            var data = {pid: self.parent.id, uid: opts.data.uid}
            riotcontrol.trigger('membership_revoke', data)
        }

        riotcontrol.on('memberrole_hide', function() {
            self.update({showForm: false})
        })
    </script>
</memberrole>
