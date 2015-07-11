<projects>
    <h2>Projects</h2>
    <list each={ type, list in types } heading={ type } items={ list }>
        <a href="#project/{ item.pid }" if={ parent.type !== 'pending' }>{ item.title }, { item.site }</a>
        <span if={ parent.type === 'pending' }>{ item.title }, { item.site } 
            <leave data={ this }></leave>
        </span>
        <pendingcount if={ own } pid={ pid }></pendingcount>
    </list>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this
        
        riotcontrol.on('route_profile', function() {
            self.update({types:{}})
        });

        riotcontrol.on('projects', function(type, list) {
            self.types[type] = list
            self.update()
        })
    </script>
</projects>
