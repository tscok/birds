<main>
    <section riot-tag="alert"></section>
    <section riot-tag="login" if={ route == 'login' }></section>
    <section riot-tag="search" if={ route == 'search' }></section>
    <section riot-tag="create" if={ route == 'create' }></section>
    <section riot-tag="profile" if={ route == 'profile' }></section>
    <section riot-tag="projects" if={ route == 'profile' }></section>
    <section riot-tag="project" if={ route == 'project' && id && !action }></section>
    <section riot-tag="ringform" if={ route == 'project' && id && action } action={ action }></section>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        riotcontrol.on('main', function(route, id, action) {
            self.update({route: route, id: id, action: action})
        })
    </script>
</main>