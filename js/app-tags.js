var riot = require('riot');

module.exports = function() {
    /* Main */
    require('./tags/main.tag');
    require('./tags/nav.tag');

    /* General */
    require('./tags/list.tag');
    require('./tags/alert.tag');

    /* Auth */
    require('./tags/login.tag')
    // require('./tags/auth/login.tag');
    // require('./tags/auth/register.tag');

    /* Profile - mount only root element */
    require('./tags/profile/_profile.tag');
    // require('./tags/profile/user.tag');
    // require('./tags/profile/verify.tag');
    // require('./tags/profile/projectlist.tag');
    // require('./tags/profile/pendingcount.tag');

    /* Create - mount only root element */
    require('./tags/create/_create.tag');

    /* Search - mount only root element */
    require('./tags/search/_search.tag');

    /* Project - mount only root element */
    require('./tags/project/_project.tag');
    // require('./tags/project/newring.tag');
    // require('./tags/project/control.tag');
    // require('./tags/project/member/memberlist.tag');
    // require('./tags/project/member/membership.tag');
    // require('./tags/project/member/memberrole.tag');
    // require('./tags/project/ring/ringsize.tag');

    riot.mount('*');
};
