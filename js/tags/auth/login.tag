<login>
    <div if={ show }>
        <h2>Login</h2>
        <form name="frmLogin" onsubmit={ login }>
            <label>Email</label><br>
            <input type="email" name="email"><br>
            <label>Password</label><br>
            <input type="password" name="password"><br>
            <button type="submit" disabled={ isLoading }>Login</button>
            <span if={ isLoading }>…</span>
        </form>
    </div>

    <script>
        var riotcontrol = require('riotcontrol');
        var self = this

        login() {
            var userObj = {
                email: self.email.value,
                password: self.password.value
            }
            riotcontrol.trigger('login', userObj)
            self.isLoading = true
        }

        riotcontrol.on('route_changed', function(route) {
            self.update({route: route, show: route == 'login'})
        })

        riotcontrol.on('alert', function() {
            if (self.route == 'login') {
                self.update({isLoading: false})
            }
        })
    </script>
</login>
