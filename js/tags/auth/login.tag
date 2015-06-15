<login>
	<h2>Login</h2>
	<form name="frmLogin" onsubmit={ login }>
		<label>Email</label><br>
		<input type="email" name="email"><br>
		<label>Password</label><br>
		<input type="password" name="password"><br>
		<button type="submit">Login</button>
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
		}
	</script>
</login>