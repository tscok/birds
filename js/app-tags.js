var riot = require('riot');

module.exports = function() {
    // Main
    require('./tags/app.tag');

    // General
    require('./tags/navigation.tag');
    require('./tags/list.tag');
    require('./tags/alert.tag');

    // Auth
    require('./tags/auth/login.tag');
    require('./tags/auth/register.tag');

    // Profile
    require('./tags/profile/_profile.tag');
    require('./tags/profile/user.tag');
    require('./tags/profile/verify.tag');
    require('./tags/profile/projectlist.tag');
    require('./tags/profile/pendingcount.tag');

    // Create
    require('./tags/create/_create.tag');
    require('./tags/create/map.tag');

    // Search
    require('./tags/search/_search.tag');
    require('./tags/search/join.tag');

    // Project
    require('./tags/project/_project.tag');
    require('./tags/project/newring.tag');
    require('./tags/project/control.tag');
    require('./tags/project/member/memberlist.tag');
    require('./tags/project/member/membership.tag');
    require('./tags/project/member/memberrole.tag');
    require('./tags/project/ring/ringsize.tag');

    riot.mount('*');
}
