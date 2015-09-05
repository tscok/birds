<app-main>
    <div riot-tag="alert"></div>
    
    <section riot-tag="login" if={ route == 'login' }></section>

    <section riot-tag="search" if={ route == 'search' }></section>

    <section riot-tag="create" if={ route == 'create' }></section>

    <section riot-tag="user" if={ route == 'profile' }></section>

    <section riot-tag="projectlist" if={ route == 'profile' }></section>

    <section riot-tag="project" if={ route == 'project' && id && !action }></section>

    <section riot-tag="ringform" if={ route == 'project' && id && action } action={ action }></section>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        riotcontrol.on('main', function(route, id, action) {
            self.update({route: route, id: id, action: action})
        })
    </script>
</app-main>