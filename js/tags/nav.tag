<app-nav>
    <nav if={ !uid } class="left">
        <a href="#login">Log in</a>
    </nav>
    <nav if={ uid && !pid } class="left">
        <a href="#create">Create Project</a>
        <a href="#search">Find Project</a>
    </nav>
    <nav if={ uid && pid } class="left">
        <a href="#project/{ pid }">Overview</a>
        <a href="#project/{ pid }/new">New Ring</a>
        <a href="#project/{ pid }/old">Old Ring</a>
    </nav>
    <nav if={ uid } class="right">
        <a href="#profile">{ name }</a>
        <a href class="button" onclick={ logout }>Log out</a>
    </nav>

    <script>
        var riotcontrol = require('riotcontrol');
        var self = this

        logout() {
            riotcontrol.trigger('logout');
        }

        riotcontrol.on('nav', function(pid, user) {
            self.update({pid: pid, uid: user.uid, name: user.name || 'Profile'})
        })
    </script>
</app-nav>
