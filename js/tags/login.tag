<login>
    <h2>Log in</h2>
    <form name="frmLogin" onsubmit={ login }>
        <label>Email</label><br>
        <input type="email" name="email"><br>
        <label>Password</label><br>
        <input type="password" name="password"><br>
        <button type="submit" disabled={ isLoading }>Log in</button>
        <span if={ isLoading }>…</span>
    </form>

    <h3>Log in with</h3>
    <button type="button" onclick={ socialLogin } data-provider="facebook">Facebook</button>

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

        socialLogin(e) {
            var provider = e.target.getAttribute('data-provider');
            riotcontrol.trigger('social_login', provider);
        }

        riotcontrol.on('main_login login_fail', function() {
            self.update({isLoading: false})
        })

        riotcontrol.on('login_success', function() {
            self.update({isLoading: true})
        })
    </script>
</login>
