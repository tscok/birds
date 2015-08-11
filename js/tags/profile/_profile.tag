require('./user.tag');
require('./projectlist.tag');

<profile>
    <user></user>
    <projectlist></projectlist>

    <script>
        /**
         * TODO:
         * Since this doesn't do anything on its own,
         * other than grouping user and projectlist,
         * move these components to main.tag and remove
         * this tag completely.
         */

        // riotcontrol.on('route_profile', function() {
        //     riotcontrol.trigger('user_update')
        //     riotcontrol.trigger('projectlist_init')
        //     console.log('hopp', new Date().getTime());
        // })
    </script>
</profile>
