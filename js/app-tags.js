var riot = require('riot');

module.exports = function() {
    // Main
    var main = require('./tags/main.tag');
    var nav = require('./tags/nav.tag');

    // General
    var list = require('./tags/list.tag');
    var alert = require('./tags/alert.tag');
    var dropdown = require('./tags/dropdown.tag')

    // Auth
    var login = require('./tags/login.tag')

    // Profile
    var profile = require('./tags/profile/_profile.tag');
    var user = require('./tags/profile/user.tag');
    var projectlist = require('./tags/profile/projectlist.tag');

    // Create
    var create = require('./tags/create/_create.tag');

    // Search
    var search = require('./tags/search/_search.tag');
    var join = require('./tags/search/join.tag');

    // Project
    var project = require('./tags/project/_project.tag');
    var memberlist = require('./tags/project/member/memberlist.tag');
    var memberrole = require('./tags/project/member/memberrole.tag');
    var membership = require('./tags/project/member/membership.tag');
    var ringsize = require('./tags/project/ring/ringsize.tag');

    // Project Ring
    var ringform = require('./tags/project/ring/ringform.tag')

    // Mount only root elements.
    riot.mount('app-main, app-nav');
};
