<memberrole>
    <button type="button" onclick={ toggleForm }>Edit</button>

    <form name="frmRoles" onsubmit={ editMember } if={ showForm }>
        <label><input type="checkbox" name="ringer" onclick={ toggleTextfield } checked={ isChecked }> Ringer</label> 
        <input type="text" name="sign" placeholder="Signature" autocomplete="off" oninput={ clearHint } disabled={ isDisabled }><br>
        <p if={ showHint }>Please add a signature for this ringer. Letters only, A-Z.</p><br>
        <button type="submit">Update member</button>
        <button type="button" onclick={ revoke } if={ !isOwner }>Cancel membership</button>
    </form>

    <script>
        var riotcontrol = require('riotcontrol')
        var utils = require('../../../utils')
        var self = this

        self.isChecked = opts.data.role == 'ringer'
        self.isDisabled = !self.isChecked
        self.showForm = false

        toggleForm() {
            self.showForm = self.showForm ? false : true
            self.sign.value = opts.data.sign ? opts.data.sign : ''
            self.isOwner = self.parent.data.isOwner
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

        clearHint() {
            self.showHint = false
        }

        editMember(e) {
            var frmData = {
                newRole: self.isOwner ? 'owner' : (self.ringer.checked ? 'ringer' : 'assistant'),
                newSign: self.ringer.checked ? self.sign.value.trim().toUpperCase() : '',
                pid: self.parent.id
            }

            var lettersOnly = /^[A-Z]+$/.test(frmData.newSign);

            if (frmData.newRole == 'ringer' && !lettersOnly) {
                self.sign.value = frmData.newSign
                self.showHint = true
                self.sign.focus()
                return
            }

            var data = utils.extend(opts.data, frmData)
            riotcontrol.trigger('memberrole_edit', data)
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
