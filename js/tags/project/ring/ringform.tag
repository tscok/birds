<ringform>
    <h2>{ opts.action == 'newring' ? 'New Ring' : 'Control' }</h2>
    <form name="frmRing">
        <div riot-tag="ringid" if={ opts.action == 'control' }></div>

        <div riot-tag="species"></div>

        <div if={ opts.action == 'newring' }>
            <label>Ring #</label><br>
            <input type="number" name="ringNumber" step="1" min="0" max="99">
        </div>

        <input type="hidden" name="snid">
        <div riot-tag="dropdown" label="ringSize" if={ opts.action == 'newring' }>
            <option each={ ringsize } value={ size }>{ size }</option>
        </div>

        <div>
            <label>Net</label><br>
            <input type="text" name="net">
        </div>

        <div riot-tag="dropdown" label="age">
            <option each={ val in parent.age } value={ val }>{ val }</option>
        </div>

        <div riot-tag="dropdown" label="sex">
            <option each={ val in parent.sex } value={ val }>{ val }</option>
        </div>

        <div>
            <label>PJM</label><br>
            <input type="number" step="1" min="0" max="9" name="pjm">
        </div>

        <div>
            <label>Fat</label><br>
            <input type="number" step="1" min="0" max="9" name="fat">
        </div>

        <div riot-tag="dropdown" label="sign">
            <option each={ parent.ringers } value="{ sign }">{ sign }</option>
        </div>

        <div>
            <label>Weight</label><br>
            <input type="text" name="weight" onblur={ checkMinMax }>
            <p if={ minMax.weight.hint }>Average weight of this species is { minMax.weight.min }&ndash;{ minMax.weight.max } g.</p>
        </div>

        <div>
            <label>Wing length</label><br>
            <input type="text" name="wing" onblur={ checkMinMax }>
            <p if={ minMax.wing.hint }>Average winglength of this species is { minMax.wing.min }&ndash;{ minMax.wing.max } mm.</p>
        </div>

        <div>
            <label>Primaries</label><br>
            <input type="text" name="primaries">
        </div>

        <div>
            <label>Secondaries</label><br>
            <input type="text" name="secondaries">
        </div>

        <div>
            <label>Comment</label><br>
            <textarea name="comment"></textarea>
        </div>

        <div>
            <button type="button" onclick={ save }>Save</button>
            <button type="reset">Reset</button>
        </div>
    </form>

    <script>
        var riotcontrol = require('riotcontrol')
        var serialize = require('form-serialize')
        var self = this

        self.sex = ['F','M']
        self.age = ['1.0','2.0','2+','3+']

        checkMinMax(e) {
            var elm = e.target.name
            var val = e.target.value
            if (!val) {
                return
            }
            if (val < self.minMax[elm].min || val > self.minMax[elm].max) {
                self.minMax[elm].hint = true
            }
        }

        setSpeciesData(data) {
            self.minMax = {
                weight: {
                    min: data.MinVikt,
                    max: data.MaxVikt,
                    hint: false
                },
                wing: {
                    min: data.MinVinge,
                    max: data.MaxVinge,
                    hint: false
                }
            }
            self.setRingsize(data.Rtyp1.replace(',','.'))
        }

        setRingsize(size) {
            if (opts.action == 'control') {
                return
            }
            self.frmRing.ringSize.value = size

            // Warn when suggested size is not listed.
            var index = self.frmRing.ringSize.selectedIndex
            if (index == -1) {
                var msg = 'Suggested ring size (' + size + ') not listed in Ring Sizes.'
                riotcontrol.trigger('alert', msg, 'warning')
                return
            }

            // Set hidden 'snid' value.
            self.setSnid(size)
        }

        setSnid(size) {
            self.ringsize.forEach(function(item) {
                if (item.size == size) {
                    self.snid.value = item.snid
                }
            })
        }

        save() {
            var data = serialize(self.frmRing, {hash: true})
            if (opts.action == 'newring' && !data.ringSize) {
                riotcontrol.trigger('alert', 'Ring size missing. Unable to create unique ring id.', 'error')
                return
            }
            data.species = data.species.toUpperCase()
            data.ringNumber = parseInt(data.ringNumber) < 10 ? '0' + data.ringNumber : data.ringNumber
            data.id = data.snid ? data.snid + data.ringNumber : data.ringNumber
            delete data.ringNumber
            delete data.ringSize
            delete data.snid
            console.log('save', opts.action, 'data', data);
            // self.frmRing.reset()
        }

        riotcontrol.on('ringform_clear', function() {
            self.frmRing.reset()
        })

        riotcontrol.on('ringers_data', function(data) {
            self.update({ringers: data})
        })

        riotcontrol.on('ringsize_data', function(data) {
            self.update({ringsize: data})
        })
    </script>
</ringform>
