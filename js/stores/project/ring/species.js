var riot = require('riot');
var xhr = require('xhr');
var fbRef = require('../../../firebase');

module.exports = function() {
    riot.observable(this);

    var self = this, species;
    var headers = ['Artkod','ENnamn','SVnamn','VetNamn'];

    fbRef.onAuth(function(authData) {
        if (authData) {
            speciesLoad();
        }
    });

    function speciesLoad() {
        var xhrOptions = {
            uri: './artlista.min.json',
            headers: {'Content-Type':'application/json'},
            json: {}
        };
        xhr(xhrOptions, function(err, resp, body) {
            if (!err && resp.statusCode == 200 && body) {
                species = body;
                console.log('species loaded');
            }
        });
    }

    function speciesMatch(fragment) {
        var matches = [];
        var pattern = new RegExp(fragment, 'i');
        for (var i = 0; i < species.length; i++) {
            for (var x = 0; x < headers.length; x++) {
                if (pattern.test(species[i][headers[x]])) {
                    matches.push(species[i]);
                    continue;
                }
            };
        };
        self.trigger('species_data', matches.slice(0,6));
    }

    self.on('species_match', speciesMatch);
};
