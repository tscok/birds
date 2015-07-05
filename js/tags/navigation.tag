<navigation>
    <nav if={ !uid } class="left">
        <a href="#login">Login</a>
        <a href="#register">Register</a>
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
        <a href="#profile">Profile</a>
        <a href class="button" onclick={ logout }>Logout</a>
    </nav>

    <script>
        var riotcontrol = require('riotcontrol');
        var utils = require('../utils');
        var self = this

        self.uid = null
        self.pid = null

        logout(e) {
            riotcontrol.trigger('logout');
        }

        riotcontrol.on('auth_update', function(uid) {
            self.update({uid: uid})
        })
        
        riotcontrol.on('route_changed', function(route, pid, action) {
            riotcontrol.trigger('auth')
            self.update({pid: pid ? pid : false})
        })
    </script>
</navigation>
