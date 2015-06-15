<user>
	<h2>Profile</h2>
	<form name="frmProfileName" onsubmit={ updateName }>
		<label>Username</label><br>
		<input type="text" name="user" placeholder="Your name" autocomplete="off">
		<button type="button" onclick={ updateName }>Update</button>
	</form>

	<form name="frmProfileEmail" onsubmit={ updateEmail }>
		<label>Email</label><br>
		<input type="hidden" name="email">
		<input type="email" name="newemail" placeholder="Your email" autocomplete="off">
		<verify name="verifyEmail"></verify>
	</form>
	
	<form name="frmProfilePwd" onsubmit={ updatePassword }>
		<label>Password</label><br>
		<input type="password" name="newpassword" placeholder="New password">
		<verify name="verifyPassword"></verify>
	</form>

	<script>
		var riotcontrol = require('riotcontrol');
		var self = this

		updateName(e) {
			riotcontrol.trigger('user_update_name', {name: self.user.value})
		}

		updateEmail(e) {
			var data = {}
			data['oldEmail'] = self.email.value
			data['newEmail'] = self.newemail.value
			data['password'] = self.frmProfileEmail.oldpassword.value
			riotcontrol.trigger('user_update_email', data)
			self.tags.verifyEmail.toggle()
		}

		updatePassword(e) {
			var data = {}
			data['email'] = self.email.value
			data['newPassword'] = self.newpassword.value
			data['oldPassword'] = self.frmProfilePwd.oldpassword.value
			riotcontrol.trigger('user_update_password', data)
			self.tags.verifyPassword.toggle()
		}

		riotcontrol.on('user_updated', function(profile) {
			self.user.value = profile.name
			self.email.value = self.newemail.value = profile.email
			self.newpassword.value = ''
			self.update()
		})
		
		riotcontrol.on('route_changed', function(route) {
			if(route == 'profile') {
				riotcontrol.trigger('user_update')
			}
		})
	</script>
</user>