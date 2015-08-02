var riotcontrol = require('riotcontrol');

module.exports = function() {
    // User Authentication
    var auth = require('./stores/auth');
    var proxy = require('./stores/proxy');

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

    // Project
    var project = require('./stores/project/_project');
    var memberlist = require('./stores/project/member/memberlist');
    var membership = require('./stores/project/member/membership');
    var memberrole = require('./stores/project/member/memberrole');
    var ringsize = require('./stores/project/ring/ringsize');


    // Register stores.
    riotcontrol.addStore(new auth());
    riotcontrol.addStore(new proxy());

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
};
