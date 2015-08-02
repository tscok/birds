<login>
    <h2>Login</h2>
    <form name="frmLogin" onsubmit={ login }>
        <label>Email</label><br>
        <input type="email" name="email"><br>
        <label>Password</label><br>
        <input type="password" name="password"><br>
        <button type="submit" disabled={ isLoading }>Login</button>
        <span if={ isLoading }>…</span>
    </form>

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

        riotcontrol.on('route_login login_fail', function() {
            self.update({isLoading: false})
        })

        riotcontrol.on('login_success', function() {
            self.update({isLoading: true})
        })
    </script>
</login>
