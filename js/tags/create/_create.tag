var riotcontrol = require('riotcontrol')
var utils = require('../../utils')

<create>
    <form name="frmCreate" onsubmit={ create }>
        <h2>Create Project</h2>
        <label>Project title</label><br>
        <input type="text" name="title" placeholder="Project name" required><br>
        <label>Site name</label><br>
        <input type="text" name="site" placeholder="Site name"><br>

        <label>Site location</label><br>
        <div id="mapCanvas"></div>
        <button type="button" onclick={ resetMap }>Reset map</button><br>

        <label>Latitude / Longitude</label><br>
        <input type="text" name="latlng" placeholder="Click map to set…" disabled><br>
        <label>Country</label><br>
        <input type="hidden" name="countryIso">
        <input type="hidden" name="countryName">
        <input type="text" name="country" placeholder="Click map to set…" disabled><br>

        <label>Start date</label><br>
        <input type="date" name="dateStart" required><br>
        <label>End date</label><br>
        <input type="date" name="dateEnd" required><br>

        <label>Privacy</label><br>
        <input type="radio" name="status" value="public" checked> Public
        <input type="radio" name="status" value="private"> Private<br>

        <button type="submit">Create project</button>
        <button type="reset">Reset</button>
    </form>

    <script>
        var self = this

        okDates() {
            return self.dateStart.valueAsNumber < self.dateEnd.valueAsNumber
        }

        create() {
            if (!self.okDates()) {
                riotcontrol.trigger('alert', 'Oops… Looks like a date error.', 'danger')
                return;
            }

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

            riotcontrol.trigger('alert_clear')
            riotcontrol.trigger('project_create', project);
            self.frmCreate.reset();
        }

        resetMap() {
            riotcontrol.trigger('map_reset')
            self.setMapData({})
        }

        setMapData(data) {
            var iso = data.countryIso || ''
            var name = data.countryName || ''
            var latlng = data.latLng || ''
            var country = name && iso ? name + ',' + iso : ''

            self.countryIso.value = iso
            self.countryName.value = name
            self.country.value = country
            self.latlng.value = latlng
            self.update()
        }

        riotcontrol.on('map_data', self.setMapData)

        self.on('mount', function() {
            riotcontrol.trigger('map_init')
        })
    </script>
</create>
