var riotcontrol = require('riotcontrol');

module.exports = function() {
    // User Authentication
    var login = require('./stores/login');

    // General
    var main = require('./stores/main');
    var nav = require('./stores/nav');

    // Profile
    var user = require('./stores/profile/user');
    var projectlist = require('./stores/profile/projectlist');
    var pendingcount = require('./stores/profile/pendingcount');

    // Create
    var create = require('./stores/create/_create');
    var map = require('./stores/create/map');

    // Search
    var search = require('./stores/search/_search');
    var join = require('./stores/search/join');

    // Project - overview
    var project = require('./stores/project/_project');
    var memberlist = require('./stores/project/member/memberlist');
    var membership = require('./stores/project/member/membership');
    var memberrole = require('./stores/project/member/memberrole');
    var ringsize = require('./stores/project/ring/ringsize');

    // Project - newring
    var newring = require('./stores/project/newring');


    // Register stores.
    riotcontrol.addStore(new login());

    riotcontrol.addStore(new main());
    riotcontrol.addStore(new nav());

    riotcontrol.addStore(new user());
    riotcontrol.addStore(new projectlist());
    riotcontrol.addStore(new pendingcount());

    riotcontrol.addStore(new create());
    riotcontrol.addStore(new map());

    riotcontrol.addStore(new search());
    riotcontrol.addStore(new join());

    riotcontrol.addStore(new project());
    riotcontrol.addStore(new memberlist());
    riotcontrol.addStore(new membership());
    riotcontrol.addStore(new memberrole());
    riotcontrol.addStore(new ringsize());

    riotcontrol.addStore(new newring());
};
