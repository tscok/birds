var riot = require('riot');
var riotcontrol = require('riotcontrol');

// Firebase
var firebase = require('firebase');
var ref = new firebase('https://bluebird.firebaseio.com/');

// Stores.
var map = require('./stores/map');
var auth = require('./stores/auth');
var navbar = require('./stores/navbar');
var profile = require('./stores/profile');
var project_list = require('./stores/project_list');
var project_find = require('./stores/project_find');
var project_join = require('./stores/project_join');
var project_create = require('./stores/project_create');
var project_dashboard = require('./stores/project_dashboard');
var list_members = require('./stores/list_members');

// Register stores.
riotcontrol.addStore(new auth());
riotcontrol.addStore(new navbar());
riotcontrol.addStore(new map());
riotcontrol.addStore(new profile());
riotcontrol.addStore(new project_list());
riotcontrol.addStore(new project_find());
riotcontrol.addStore(new project_join());
riotcontrol.addStore(new project_create());
riotcontrol.addStore(new project_dashboard());
riotcontrol.addStore(new list_members());

// Tags.
require('./tags/map.tag');
require('./tags/alert.tag');
require('./tags/login.tag');
require('./tags/navbar.tag');
require('./tags/verify.tag');
require('./tags/profile.tag');
require('./tags/register.tag');
require('./tags/project_list.tag');
require('./tags/project_find.tag');
require('./tags/project_join.tag');
require('./tags/project_create.tag');
require('./tags/project_dashboard.tag');
require('./tags/list_members.tag');

// Mount tags.
riot.mount('*');

// Router
function validateRoute(route, id, action) {

    // All valid routes with authentication requirement.
    var routes = {
        'login':    {authRequired: false},
        'register': {authRequired: false},
        'profile':  {authRequired: true},
        'find':     {authRequired: true},
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