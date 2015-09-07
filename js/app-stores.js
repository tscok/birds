var riotcontrol = require('riotcontrol');

module.exports = function() {
    // User Authentication
    var login = require('./stores/login');

    // General
    var main = require('./stores/main');
    var nav = require('./stores/nav');

    // Profile
    var profile = require('./stores/profile/profile');
    var projects = require('./stores/profile/projects');
    var pending = require('./stores/profile/pending');

    // Create
    var create = require('./stores/create/create');
    var map = require('./stores/create/map');

    // Search
    var search = require('./stores/search/search');
    var join = require('./stores/search/join');

    // Project - overview
    var project = require('./stores/project/project');
    var memberlist = require('./stores/project/member/memberlist');
    var membership = require('./stores/project/member/membership');
    var memberrole = require('./stores/project/member/memberrole');
    var ringsize = require('./stores/project/ring/ringsize');

    // Project - ringform
    var ringform = require('./stores/project/ring/ringform');


    // Register stores.
    riotcontrol.addStore(new login());

    riotcontrol.addStore(new main());
    riotcontrol.addStore(new nav());

    riotcontrol.addStore(new profile());
    riotcontrol.addStore(new projects());
    riotcontrol.addStore(new pending());

    riotcontrol.addStore(new create());
    riotcontrol.addStore(new map());

    riotcontrol.addStore(new search());
    riotcontrol.addStore(new join());

    riotcontrol.addStore(new project());
    riotcontrol.addStore(new memberlist());
    riotcontrol.addStore(new membership());
    riotcontrol.addStore(new memberrole());
    riotcontrol.addStore(new ringsize());

    riotcontrol.addStore(new ringform());
};
