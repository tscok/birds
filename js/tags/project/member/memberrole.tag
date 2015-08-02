<memberrole>
    <button onclick={ toggleForm }>…</button>
    <form if={ showForm } name="frmRoles" onsubmit={ editMember }>
        <label><input type="checkbox" name="ringer" onclick={ toggleTextfield } checked={ isChecked }> Ringer</label><br>
        <input type="text" name="sign" placeholder="Signature" value={ signValue } disabled={ isDisabled }><br><br>
        <button onclick={ editMember }>Update</button>
        <button onclick={ removeMember }>Remove</button>
    </form>

    <script>
        var riotcontrol = require('riotcontrol')
        var utils = require('../../../utils')
        var self = this

        self.isChecked = opts.data.item.role == 'ringer'
        self.signValue = opts.data.item.sign
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

        editMember() {
            var member = {
                newRole: self.ringer.checked ? 'ringer' : 'assistant',
                newSign: self.ringer.checked ? self.sign.value : ''
            }

            if (member.newRole == 'ringer' && !member.newSign) {
                riotcontrol.trigger('alert', 'Please enter a Ringer signature unique to this project.', 'error')
                return;
            }
            
            riotcontrol.trigger('alert_clear')
            riotcontrol.trigger('memberrole_edit', utils.extend(opts.data.item, member))
        }

        removeMember() {
            riotcontrol.trigger('membership_revoke', opts.data.item);
        }
    </script>
</memberrole>
