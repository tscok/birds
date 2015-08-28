/*
TODO:

Gulp
    - Use gulp instead of command line tasks.
    - Use gulp-less instead of stylus.
    - Use gulp-riotify (browserify).
    - Use gulp-livereload + browser plugin.
    - Use gulp to minify js/less/json

Git
    - Add .gitignore 'node_modules'
    - Run 'rm --cache node_modules' to remove node_modules from git.

JSON
    - Add Fagel3 json data for ringform module.

NewRing / Control
    - Create modules for "species lookup", "ring ID lookup", etc.
    - Create ringform module to house both newring and control inputs.
    - Make "species lookup" suggest ring size in newring, but not in control.
    - Make JSON of Fagel3 document.
    - Set data-min/data-max attributes on winglength and weight inputs upon selecting a species.
    - Compare winglength and weight input to min/max values. Give feedback on lows/highs.
    - List only "active" ringers in signature list. Rewrite firebase ringer list?
    - Create select-list module to display an array of data.

Profile
    - onAuth with social media, save authData to firebase (id, profileImageURL, displayName, email)
    - user module; Display info gathered from Social media
    - create module to display profileImage / userName (usage; profile, navigation, project members, etc.)

Styling
    - Add some basic styling to make the project more fun to work with :)

Facebook subscription
    - Profile: Display member status ('Subscriber', Contributor')
    - Display subscription info if not subscriber (profile, create project, etc.)