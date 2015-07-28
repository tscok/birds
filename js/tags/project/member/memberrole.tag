<memberrole>
    <button onclick={ edit }>…</button>
    <form if={ showForm } name="frmRoles" onsubmit={ updateMember }>
        <label><input type="checkbox" name="ringer" onclick={ toggleTextfield } checked={ isChecked }> Ringer</label><br>
        <input type="text" name="sign" placeholder="Signature" value={ signValue } disabled={ isDisabled }><br><br>
        <button onclick={ updateMember }>Update</button>
        <button onclick={ removeMember }>Remove</button>
    </form>

    <script>
        var riotcontrol = require('riotcontrol')
        var utils = require('../../../utils')
        var self = this

        self.isChecked = opts.data.item.role == 'ringer'
        self.signValue = opts.data.item.sign
        self.isDisabled = !self.isChecked

        edit() {
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

        updateMember() {
            var member = {
                newRole: self.ringer.checked ? 'ringer' : 'assistant',
                newSign: self.ringer.checked ? self.sign.value : ''
            }

            if (member.newRole == 'ringer' && !member.newSign) {
                riotcontrol.trigger('alert', {text:'Please enter a Ringer signature unique to this project.', type:'error'})
                return;
            }
            
            riotcontrol.trigger('alert', null)
            riotcontrol.trigger('role_update', utils.extend(opts.data.item, member))
        }

        removeMember() {
            riotcontrol.trigger('membership_revoke', opts.data.item);
        }
    </script>
</memberrole>
