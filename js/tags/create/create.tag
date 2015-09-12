<create>
    <form name="frmCreate" onsubmit={ create }>
        <h2>Create Project</h2>
        <label>Project title</label><br>
        <input type="text" name="title" placeholder="Project name" required><br>

        <label>Start date</label><br>
        <input type="date" name="dateStart" required><br>

        <label>End date</label><br>
        <input type="date" name="dateEnd" required><br>

        <label>Site name</label><br>
        <input type="text" name="site" placeholder="Site name" required><br>

        <label>Site location</label><br>
        <div id="mapCanvas"></div>
        <button type="button" onclick={ resetMap }>Reset map</button><br>

        <label>Lat / Lng</label><br>
        <input type="text" name="latlng" placeholder="Click map to set…" disabled><br>
        
        <label>Country</label><br>
        <input type="hidden" name="countryIso">
        <input type="hidden" name="countryName">
        <input type="text" name="countryDisplay" placeholder="Click map to set…" disabled><br>

        <label>Timezone</label><br>
        <input type="text" name="tzId" placeholder="Click map to set…" disabled><br>

        <label>UTC Offset (minutes)</label><br>
        <input type="hidden" name="tzAbbr">
        <input type="hidden" name="tzOffset">
        <input type="text" name="tzDisplay" placeholder="Click map to set…" disabled><br>

        <label>Privacy</label><br>
        <input type="radio" name="privacy" value="public" checked> Public
        <input type="radio" name="privacy" value="private"> Private<br>

        <button type="submit">Create project</button>
        <button type="button" onclick={ resetForm }>Reset</button>
    </form>

    <script>
        var riotcontrol = require('riotcontrol')
        var moment = require('moment')
        var utils = require('../../utils')
        
        var self = this
        self.date = {}

        checkDates() {
            self.date.created = moment().unix()
            self.date.start = moment(self.dateStart.value).unix()
            self.date.end = moment(self.dateEnd.value).unix()
            return self.date.start >= self.date.end
        }

        create() {
            if (self.checkDates()) {
                var msg = 'Start date cannot be later than, or equal to, End date.'
                riotcontrol.trigger('alert', msg, 'warning')
                return
            }

            var projectData = {
                title: self.title.value,
                site: self.site.value,
                latlng: self.latlng.value,
                country: {
                    iso: self.countryIso.value,
                    name: self.countryName.value
                },
                timezone: {
                    id: self.tzId.value,
                    abbr: self.tzAbbr.value,
                    offset: self.tzOffset.value
                },
                date: self.date,
                privacy: utils.radioBtnVal('privacy')
            }

            riotcontrol.trigger('alert_clear')
            riotcontrol.trigger('project_create', projectData)
            self.frmCreate.reset()
        }

        resetForm() {
            self.frmCreate.reset()
            self.resetMap()
        }

        resetMap() {
            riotcontrol.trigger('map_reset')
        }

        setMapData(data) {
            // var iso = data.countryIso || ''
            // var name = data.countryName || ''
            // var latlng = data.latLng || ''
            var display = data.countryName && data.countryIso ? data.countryName + ',' + data.countryIso : ''

            self.countryIso.value = data.countryIso || null
            self.countryName.value = data.countryName || null
            self.latlng.value = data.latLng || null
            self.countryDisplay.value = display
            self.update()
        }

        setTzData(data) {
            // var tz = data.tz || ''
            // var abbr = data.abbr || ''
            // var offset = data.offset || ''
            var display = data.offset && data.abbr ? data.offset + ', ' + data.abbr : ''

            self.tzId.value = data.tz || null
            self.tzAbbr.value = data.abbr || null
            self.tzOffset.value = data.offset || null
            self.tzDisplay.value = display
            self.update()
        }

        riotcontrol.on('map_data', self.setMapData)
        riotcontrol.on('map_tzData', self.setTzData)

        self.on('mount', function() {
            riotcontrol.trigger('map_init')
        })
    </script>
</create>
