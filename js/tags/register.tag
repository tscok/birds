var riotcontrol = require('riotcontrol');

<register>
	<form name="frmRegister" if={ show }>
		<h2>Register</h2>
		<label>Your Name</label><br>
		<input type="text" name="username"><br>
		<label>Email</label><br>
		<input type="email" name="email"><br>
		<label>Password</label><br>
		<input type="password" name="password"><br>
		<button type="submit" onclick={ register }>Register</button>
	</form>

	<script>
		var self = this

		self.show = false

		register(e) {
			var userObj = {
				email: self.email.value,
				password: self.password.value
			}
			riotcontrol.trigger('register', userObj, self.username.value)
		}

		riotcontrol.on('route_changed', function(route) {
			self.show = (route == 'register')
			self.update()
		})
	</script>
</register>