<create>
    <form name="frmCreate" if={ show }>
        <h2>Create Project</h2>
        <label>Project title</label><br>
        <input type="text" name="title" placeholder="Project name"><br>
        <label>Site name</label><br>
        <input type="text" name="site" placeholder="Site name"><br>

        <label>Use the map to mark the site's location. Adds lat/lng to ringing data.</label><br>
        <map></map>

        <label>Latitude / Longitude</label><br>
        <input type="text" name="latlng" placeholder="Click map to set..." disabled><br>
        <label>Country</label><br>
        <input type="hidden" name="countryIso">
        <input type="hidden" name="countryName">
        <input type="text" name="country" placeholder="Click map to set..." disabled><br>

        <label>Start date</label><br>
        <input type="date" name="dateStart" onblur={ checkDate }><br>
        <label>End date</label><br>
        <input type="date" name="dateEnd" onblur={ checkDate }><br>
        <p if={ dateError }>Your project cannot end before it starts!</p>

        <label>Privacy</label><br>
        <input type="radio" name="status" value="public" checked> Public
        <input type="radio" name="status" value="private"> Private<br>

        <button type="reset">Cancel</button>
        <button type="button" onclick={ create } disabled={ dateError }>Create</button>
    </form>

    <script>
        var riotcontrol = require('riotcontrol');
        var utils = require('../../utils')
        var self = this

        self.dateError = false

        checkDate() {
            self.dateError = (self.dateStart.valueAsNumber > self.dateEnd.valueAsNumber)
        }

        create(e) {
            var project = {
                title: self.title.value,
                site: self.site.value,
                countryIso: self.countryIso.value,
                countryName: self.countryName.value,
                latlng: self.latlng.value,
                dateStart: self.dateStart.value,
                dateEnd: self.dateEnd.value,
                status: utils.radioBtnVal('status')
            };
            riotcontrol.trigger('project_create', project);
            self.frmCreate.reset();
        }

        riotcontrol.on('map_data', function(data) {
            self.countryIso.value = data.countryIso
            self.countryName.value = data.countryName
            self.country.value = data.countryName +', '+ data.countryIso
            self.latlng.value = data.latLng
        })

        riotcontrol.on('route_changed', function(route) {
            self.update({show: route === 'create'})
        })
    </script>
</create>
