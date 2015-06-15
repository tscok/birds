<register>
	<h2>Register</h2>
	<form name="frmRegister" onsubmit={ register }>
		<label>Your Name</label><br>
		<input type="text" name="username"><br>
		<label>Email</label><br>
		<input type="email" name="email"><br>
		<label>Password</label><br>
		<input type="password" name="password"><br>
		<button type="submit">Register</button>
	</form>

	<script>
		var riotcontrol = require('riotcontrol');
		var self = this

		self.show = false

		register(e) {
			var userObj = {
				email: self.email.value,
				password: self.password.value
			}
			riotcontrol.trigger('register', userObj, self.username.value)
		}
	</script>
</register>