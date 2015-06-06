/*
        USER REQUEST FOR MEMBERSHIP

        // Users add their uid to pending/pid to show intereset in membership.
        pending
            ".read": "uid !== null"
            pid
            ".write": "uid !== null"
                uid: true

        // Then add the pid to their user/uid/pending.
        user
            uid
                pending
                    pid: true
        
        PROJECT OWNER GRANTING MEMBERSHIP

        // Project owners add members by taking their uid from pending/pid...
        pending
            ".read": "uid !== null"
            pid
            ".write": "uid !== null"
                uid: true

        // ...then adding their uid to member/pid.
        member
            ".read": "uid !== null"
            pid
                ".write": "root.child('project').child(pid).child('ownerId').val() == uid"
                uid: true

        PROJECT OWNER REVOKING MEMBERSHIP

        // Project owner removes member uid from member/pid
        
        USER CHECKING FOR MEMBERSHIPS (2.)
    
        // User gets pids from user/uid/member, then match against member/pid/uid
        // If member/pid/uid not found, membership has been revoked.
            // Remove pid from user/uid/member
        // Else user is still a member
            // get project info from project/pid

        USER CHECKING FOR NEW MEMBERSHIPS (1.)

        // User gets pids from user/uid/pending, then looks for their uid in member/pid(s).
        // If user finds their uid in member/pid (from user/uid/pending) they have been
        // granted membership!
        // User moves pid from user/uid/pending to user/uid/member


        =============================

        Request access (Join Request)
        user adds uid to pending/pid
        then adds pid to user/uid/pending

        Grant access (Add Member)
        pl removes uid from pending/pid
        pl adds uid to member/pid

        Check access (Access Granted == uid moved from pending/pid to member/pid)
        user iterates over user/uid/pending
        then looks for uid in member/pid
        if match
        add pid to user/uid/member
        remove pid from user/uid/pending

        Check access (Access Revoked == uid removed from member/pid)
        user iterates over user/uid/member
        then looks for uid in pending/pid
        if match
        remove pid from user/uid/member
        remove uid from pending/pid

        Revoke access (remove member)
        pl removes uid from member/pid
        pl adds uid to pending/pid

        ==============================

        1. Create project
        2. Find project
        3. Request membership
        4. Grant membership
        5. List membership

*/