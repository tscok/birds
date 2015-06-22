var riot = require('riot');
var riotcontrol = require('riotcontrol');

var firebase = require('firebase');
var ref = new firebase('https://bluebird.firebaseio.com/');

// == STORES ==

var auth = require('./stores/auth');
var navigation = require('./stores/navigation');

var ownerships = require('./stores/profile/ownerships');
var memberships = require('./stores/profile/memberships');
var user = require('./stores/profile/user');

var create = require('./stores/create/_create');
var map = require('./stores/create/map');

var search = require('./stores/search/_search');
var join = require('./stores/search/join');

// Register stores.
riotcontrol.addStore(new auth());
riotcontrol.addStore(new navigation());
riotcontrol.addStore(new ownerships());
riotcontrol.addStore(new memberships());
riotcontrol.addStore(new user());
riotcontrol.addStore(new create());
riotcontrol.addStore(new map());
riotcontrol.addStore(new search());
riotcontrol.addStore(new join());


// == RIOT TAGS ==

require('./tags/navigation.tag');
require('./tags/list.tag');
require('./tags/alert.tag');

require('./tags/auth/_auth.tag');
require('./tags/auth/login.tag');
require('./tags/auth/register.tag');

require('./tags/create/_create.tag');
require('./tags/create/map.tag');

require('./tags/profile/_profile.tag');
require('./tags/profile/user.tag');
require('./tags/profile/verify.tag');
require('./tags/profile/projects.tag');

require('./tags/project/_project.tag');
require('./tags/project/new_ring.tag');
require('./tags/project/old_ring.tag');
require('./tags/project/rings.tag');
require('./tags/project/members/active.tag');
require('./tags/project/members/passive.tag');
require('./tags/project/members/pending.tag');

require('./tags/search/_search.tag');
require('./tags/search/join.tag');

riot.mount('*');


// == ROUTER ==

function validateRoute(route, id, action) {

    // All valid routes with authentication requirement.
    var routes = {
        'login':    {authRequired: false},
        'register': {authRequired: false},
        'profile':  {authRequired: true},
        'search':     {authRequired: true},
        'create':   {authRequired: true},
        'project':  {authRequired: true}
    };

    // Authentication.
    var auth = ref.getAuth() || null;

    if(!route || (routes[route] && routes[route].authRequired && !auth)) {
        // If no route or not authenticated for route.
        riotcontrol.trigger('logout');
    }
    else if(routes[route]) {
        // Route to requested route.
        riotcontrol.trigger('route', route, id, action);
        
        if(!routes[route].authRequired && auth) {
            // Logout if logged in and route does not require authentication.
            riotcontrol.trigger('logout', route);
        }
    }
    else{
        // Alert, invalid route.
        riotcontrol.trigger('alert', {text:'404 - Route not found.', type:'warning'});
        riotcontrol.trigger('route', null);
    }
}

// Runs when URL changes.
riot.route(function(route, id, action) {
    validateRoute(route, id, action);
});

// Runs on reload/refresh, etc.
riot.route.exec(function(route, id, action) {
    validateRoute(route, id, action);
});
