var riot = require('riot');
var riotcontrol = require('riotcontrol');
var firebase = require('firebase');

var appRouter = require('./app-router');
var appStores = require('./app-stores');
var appTags = require('./app-tags');

(function() {

    var fbRef = new firebase('https://bluebird.firebaseio.com/');

    // Register stores.
    appStores(riotcontrol);

    // Mount tags.
    appTags(riot);

    // Start router.
    appRouter(riot, riotcontrol, fbRef);

}());
