<register>
    <div if={ show }>
        <h2>Register</h2>
        <form name="frmRegister" onsubmit={ register }>
            <label>Your Name</label><br>
            <input type="text" name="username"><br>
            <label>Email</label><br>
            <input type="email" name="email"><br>
            <label>Password</label><br>
            <input type="password" name="password"><br>
            <button type="submit" disabled={ isLoading }>Register</button>
            <span if={ isLoading }>…</span>
        </form>
    </div>

    <script>
        var riotcontrol = require('riotcontrol');
        var self = this

        register(e) {
            var userObj = {
                username: self.username.value,
                email: self.email.value,
                password: self.password.value
            }
            riotcontrol.trigger('register', userObj)
        }

        riotcontrol.on('route_changed', function(route) {
            self.update({route: route, show: route == 'register'})
        })

        riotcontrol.on('alert', function() {
            if (self.route == 'register') {
                self.update({isLoading: false})
            }
        })
    </script>
</register>
