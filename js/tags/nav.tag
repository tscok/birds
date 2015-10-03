<app-nav>
    <div class="site-header" if={ uid }>
        <nav if={ uid && !pid } class="site-header__nav site-header__nav--left">
            <a href="#create">Create Project</a>
            <a href="#search">Find Project</a>
        </nav>
        <nav if={ uid && pid } class="site-header__nav site-header__nav--left">
            <a href="#project/{ pid }">Overview</a>
            <a href="#project/{ pid }/newring">New Ring</a>
            <a href="#project/{ pid }/control">Control</a>
        </nav>
        <nav if={ uid } class="site-header__nav site-header__nav--right">
            <a href="#profile">{ name }</a>
            <a href="#logout">Log out</a>
        </nav>
    </div>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        riotcontrol.on('nav', function(uid, pid) {
            self.update({uid: uid, pid: pid})
        })
    </script>
</app-nav>
