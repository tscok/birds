<projectlist>
    <div if={ show }>
        <div if={ ownerships.length }>
            <h2>Ownerships</h2>
            <ul>
                <li each={ ownerships }>
                    <a href="#project/{ pid }">{ title } at { site }</a><span if={ pending }>({ pending } pending)</span>
                </li>
                <li if={ !ownerships.length }>
                    { noItemsText }
                </li>
            </ul>
        </div>

        <div if={ memberships.length }>
            <h2>Memberships</h2>
            <ul>
                <li each={ memberships }>
                    <a href="#project/{ pid }">{ title } at { site }</a>
                </li>
                <li if={ !memberships.length }>
                    { noItemsText }
                </li>
            </ul>
        </div>
    </div>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        self.noItemsText = 'Loading projects …'
        self.ownerships = []
        self.memberships = []

        riotcontrol.on('project_ownerships', function(list) {
            self.update({ownerships: list})
        })

        riotcontrol.on('project_memberships', function(list) {
            self.update({memberships: list})
        })

        riotcontrol.on('route_changed', function(route) {
            if(route == 'profile') {
                riotcontrol.trigger('list_projects')
            }
            self.update({show: (route == 'profile')})
        })
    </script>
</projectlist>