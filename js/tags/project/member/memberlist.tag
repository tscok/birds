<memberlist>
    <h3>Members</h3>
    <p if={ loading }>Loading…</p>

    <table>
        <tr each={ item, i in pending }>
            <td>
                <span>{ item.name }</span>
                <span riot-tag="membership" uid={ item.uid }></span>
            </td>
        </tr>
    </table>

    <table style="width:100%;">
        <tr each={ item, i in member }>
            <td style="position:relative;">
                <span>{ item.name } ({ item.role }<span if={ item.sign }>, { item.sign }</span>)</span>
                <!-- <button type="button" onclick={ parent.toggleMemberroleForm }>…</button> -->
                <div riot-tag="memberrole" data={ item }></div>
            </td>
        </tr>
    </table>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        self.loading = true

        // toggleMemberroleForm(e) {
        //     console.log('item', e.item.i, 'type', self.tags.memberrole);
        //     if (self.tags.memberrole instanceof Array) {
        //         self.tags.memberrole[e.item.i].toggleForm()
        //     } else {
        //         self.tags.memberrole.toggleForm()
        //     }
        // }

        riotcontrol.on('memberlist_data', function(type, data) {
            self[type] = data
            self.update({loading: false})
        })

        // riotcontrol.on('memberlist_clear', function() {
        //     self.update({pending: [], member: []})
        // })
    </script>
</memberlist>
