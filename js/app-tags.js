var riot = require('riot');

module.exports = function() {
    // Main
    var main = require('./tags/main.tag');
    var nav = require('./tags/nav.tag');

    // General
    var list = require('./tags/list.tag');
    var alert = require('./tags/alert.tag');
    var dropdown = require('./tags/dropdown.tag');
    var dropdown = require('./tags/button-input.tag');

    // Auth
    var login = require('./tags/login.tag')

    // Profile
    var profile = require('./tags/profile/profile.tag');
    var projects = require('./tags/profile/projects.tag');
    var pending = require('./tags/profile/pending.tag');

    // Create
    var create = require('./tags/create/create.tag');

    // Search
    var search = require('./tags/search/search.tag');
    var join = require('./tags/search/join.tag');

    // Project - overview
    var project = require('./tags/project/project.tag');
    var memberlist = require('./tags/project/member/memberlist.tag');
    var memberrole = require('./tags/project/member/memberrole.tag');
    var membership = require('./tags/project/member/membership.tag');
    var ringlist = require('./tags/project/ringlist.tag');

    // Project - ring
    var ringform = require('./tags/project/ring/ringform.tag');
    var ringsize = require('./tags/project/ring/ringsize.tag');
    var species = require('./tags/project/ring/species.tag');
    var ringid = require('./tags/project/ring/ringid.tag');
    var minmax = require('./tags/project/ring/minmax.tag');

    // Mount only root elements.
    riot.mount('app-main, app-nav');
};
