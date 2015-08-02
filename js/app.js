(function() {
    
    var appRouter = require('./app-router');
    var appStores = require('./app-stores');
    var appTags = require('./app-tags');

    // Register stores.
    appStores();

    // Mount tags.
    appTags();

    // Start router.
    appRouter();

})();
