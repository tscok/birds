var riotcontrol = require('riotcontrol');

<login>
	<form name="frmLogin" if={ show }>
		<h2>Login</h2>
		<label>Email</label><br>
		<input type="email" name="email"><br>
		<label>Password</label><br>
		<input type="password" name="password"><br>
		<button type="submit" onclick={ login }>Login</button>
	</form>

	<script>
		var self = this

		self.show = false

		login() {
			var userObj = {
				email: self.email.value,
				password: self.password.value
			}
			riotcontrol.trigger('login', userObj)
		}

		riotcontrol.on('route_changed', function(route) {
			self.show = (route == 'login')
			self.update()
		})
	</script>
</login>