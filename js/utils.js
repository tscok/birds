var utils = {};

// Objects
utils.extend = function(o1, o2) {
    if (o1 == null || o2 == null) {
        return o1;
    }
    for (key in o2) {
        if (o2.hasOwnProperty(key)) {
            o1[key] = o2[key];
        }
    }
    return o1;
}

// Strings
utils.capitalize = function(str) {
    return str[0].toUpperCase() + str.substr(1);
}

// Form data
utils.radioBtnVal = function(name) {
    return document.querySelector('[name='+name+']:checked').value;
}

// User data
utils.setLocalUser = function(data) {
    if (typeof Storage !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(data));
    }
}

utils.getLocalUser = function(attr) {
    var data = JSON.parse(localStorage.getItem('user'));
    return attr ? data[attr] : data;
}

utils.updateLocalUser = function(key, val) {
    var data = utils.getLocalUser();
    data[key] = val;
    utils.setLocalUser(data);
}

module.exports = utils;
