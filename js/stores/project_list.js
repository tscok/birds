var riot = require('riot');
var utils = require('../utils');
var firebase = require('firebase');

module.exports = function() {
    riot.observable(this);

    var self = this, uid, ownerships, memberships;

    var fbRef = new firebase('https://bluebird.firebaseio.com/');

    // Get projects
    function listProjects() {
        uid = fbRef.getAuth().uid;
        listOwnerships();
        listMemberships();
        pendingMemberships();
    };
    
    function listOwnerships() {
        ownerships = [];
        // Get own projects.
        fbRef.child('user/' + uid + '/project/own').once('value', function(snap) {
            snap.forEach(function(childSnap) {
                var projectId = childSnap.key();

                // listProject(projectId, ownerships);
                // getPendingCount(projectId);

                // ownerships = {
                //     'pid1': {
                //         // data
                //     },
                //     'pid2': {
                //         // data
                //     }
                // }

                // ownerships['pid1'].pending = '...'

                // ownerships = [
                //     {
                //         // data 1
                //     },
                //     {
                //         // data 2
                //     }
                // ]

                // for p in ownerships {
                //     if(p.pid == pid1)
                // }

                // Get project data.
                fbRef.child('project/' + projectId).once('value', function(project) {
                    var data = project.val();
                    var itemNo = ownerships.length;

                    ownerships.push({
                        'pid': projectId,
                        'title': data.title,
                        'site': data.site,
                        'ownerName': 'You',
                        'dateStart': data.dateStart,
                        'dateEnd': data.dateEnd
                    });

                    // Count pending memberships.
                    getPendingCount(projectId, itemNo);
                    self.trigger('project_ownerships', ownerships);
                });
            });
        });
    }

    function getPendingCount(pid, itemNo) {
        console.log('addPendingCount', pid, itemNo);
        fbRef.child('pending/' + pid).on('value', function(pending) {
            ownerships[itemNo]['pending'] = pending.numChildren();
            self.trigger('project_ownerships', ownerships);
        });
    }

    function listMemberships() {
        memberships = [];
        // Get projects I participate in.
        fbRef.child('user/' + uid + '/project/member').on('child_added', function(snap) {
            var pid = snap.key();
            // Get current member status.
            fbRef.child('member/' + pid + '/' + uid).once('value', function(childSnap) {
                if (childSnap.val() !== null) {
                    // Active membership.
                    listProject(pid, memberships);
                }else{
                    // Membership revoked.
                    unlistProjectId('/project/member/', pid);
                }
            });
        });
    }

    // Check for new memberships.
    function pendingMemberships() {
        fbRef.child('user/' + uid + '/project/pending').on('child_added', function(snap) {
            var pid = snap.key();
            fbRef.child('member/' + pid + '/' + uid).once('value', function(childSnap) {
                if (childSnap.val() !== null) {
                    // Yay! I've been granted a new membership.
                    // Add pid to user/uid/project/member.
                    enlistProjectId('/project/member/', pid);
                    // Remove pid from user/uid/project/pending.
                    unlistProjectId('/project/pending/', pid);
                }
            });
        });
    }

    function listProject(pid, list) {
        fbRef.child('project/' + pid).once('value', function(snap) {
            var data = snap.val();

            list.push({
                'pid': pid,
                'title': data.title,
                'site': data.site,
                'ownerName': data.ownerId == uid ? 'You' : data.ownerName,
                'dateStart': data.dateStart,
                'dateEnd': data.dateEnd
            });

            self.trigger('project_memberships', list);
        });
    }

    function unlistProjectId(path, pid) {
        fbRef.child('user/' + uid + path + pid).remove();
    }

    function enlistProjectId(path, pid) {
        fbRef.child('user/' + uid + path + pid).set(true);
    }

    self.on('list_projects', listProjects);
};