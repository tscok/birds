<projects>
    <h2>Projects</h2>
    <list each={ type, list in types } heading={ type } items={ list }>
        <a if={ parent.type != 'pending' } href="#project/{ item.pid }">{ item.title }, { item.site }</a>
        <pendingcount if={ parent.type == 'own' } pid={ item.pid }></pendingcount>

        <a if={ parent.type == 'pending' }>{ item.title }, { item.site }</a>

        <leave if={ parent.type != 'own' } data={ this }></leave>
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
