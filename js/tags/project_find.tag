<find>
	<div if={ show }>
		<form name="frmSearch" onsubmit={ find }>
			<h2>Find project</h2>
			<input type="text" name="needle" placeholder="Search" autocomplete="off">
			<button type="button" onclick={ find }>OK</button>
			<fieldset>
				<label><input type="radio" name="attr" onclick={ find } value="title" checked> Project title</label>
				<label><input type="radio" name="attr" onclick={ find } value="site"> Site name</label>
				<label><input type="radio" name="attr" onclick={ find } value="ownerName"> Owner name</label>
			</fieldset>
			<p>Tip: Searches are case <em>sensitive</em>.</p>
		</form>
		<ul>
			<li each={ items }>{ title } at { site }<br>
				<datetime if={ dateStart || dateEnd }>{ dateStart } &ndash; { dateEnd } </datetime>by { ownerName }
				<join project={ this } />
			</li>
		</ul>
	</div>

	<script>
		var riotcontrol = require('riotcontrol')
		var utils = require('../utils')
		var self = this

		self.show = false
		self.items = []

		find(e) {
			if (self.needle.value.length > 1) {
				var params = {
					attr: utils.radioBtnVal('attr'),
					needle: self.needle.value
				}
				riotcontrol.trigger('project_search', params)
			}
		}

		riotcontrol.on('project_search_result', function(list) {
			console.log(list);
			self.update({items: list})
		})

		riotcontrol.on('route_changed', function(route) {
			self.update({show: (route == 'find')})
		})
	</script>
</find>