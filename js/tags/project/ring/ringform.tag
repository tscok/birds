<ringform>
    <h2>{ opts.action == 'newring' ? 'New Ring' : 'Control' }</h2>

    <form name="frmRing" onsubmit={ saveRing }>
        <div riot-tag="ringid" if={ opts.action == 'control' }></div>

        <div riot-tag="species"></div>

        <div if={ opts.action == 'newring' }>
            <div>
                <label>Ring #</label><br>
                <input type="number" name="ringNumber" step="1" min="0" max="99" required>
            </div>
            
            <input type="hidden" name="snid">
            <div riot-tag="dropdown" label="ringSize" require="required">
                <option each={ ringsize } value={ size }>{ size }</option>
            </div>
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

        <div riot-tag="dropdown" label="sign" require="required">
            <option each={ parent.ringers } value="{ sign }">{ sign }</option>
        </div>

        <div riot-tag="minmax" label="weight" min="{data.MinVikt}" max="{data.MaxVikt}" unit="g">
            <span>Avg. weight is</span>
        </div>

        <div riot-tag="minmax" label="wing" min="{data.MinVinge}" max="{data.MaxVinge}" unit="mm">
            <span>Avg. wing length is</span>
        </div>

        <div>
            <label>Primaries</label><br>
            <input type="text" name="primaries" autocomplete="off">
        </div>

        <div>
            <label>Secondaries</label><br>
            <input type="text" name="secondaries" autocomplete="off">
        </div>

        <div>
            <label>Comment</label><br>
            <textarea name="comment" autocomplete="off"></textarea>
        </div>

        <div>
            <button type="submit">Save</button>
            <button type="button" onclick={ resetForm }>Reset</button>
        </div>
    </form>

    <script>
        var riotcontrol = require('riotcontrol')
        var serialize = require('form-serialize')
        var self = this

        self.sex = ['F','M']
        self.age = ['1.0','2.0','2+','3+']

        setSpeciesData(data) {
            self.update({data: data})
            self.setRingsize(data.Rtyp1.replace(',','.'))
        }

        setRingsize(size) {
            if (opts.action == 'control') {
                return
            }
            self.frmRing.ringSize.value = size
            var index = self.frmRing.ringSize.selectedIndex
            if (index == -1) {
                var msg = 'Suggested ring size (' + size + ') not listed in Ring Sizes.'
                riotcontrol.trigger('alert', msg, 'warning')
                return
            }
            self.setSnid(size)
        }

        setSnid(size) {
            self.ringsize.forEach(function(item) {
                if (item.size == size) {
                    self.snid.value = item.snid
                }
            })
        }

        saveRing() {
            var frmData = serialize(self.frmRing, {hash: true})
            if (opts.action == 'newring') {
                if (!frmData.ringSize) {
                    riotcontrol.trigger('alert', 'Ring size missing. Unable to create unique ring id.', 'error')
                    return
                }
                frmData.ringNumber = parseInt(frmData.ringNumber) < 10 ? '0' + frmData.ringNumber : frmData.ringNumber
                frmData.id = frmData.snid ? frmData.snid + frmData.ringNumber : frmData.ringNumber
            }
            frmData.species = frmData.species.toUpperCase()
            delete frmData.ringNumber
            delete frmData.ringSize
            delete frmData.snid
            riotcontrol.trigger('ringform_save', opts.action, frmData)
        }

        resetForm() {
            self.frmRing.reset()
        }

        riotcontrol.on('ringers_data', function(data) {
            self.update({ringers: data})
        })

        riotcontrol.on('ringsize_data', function(data) {
            self.update({ringsize: data})
        })
        
        riotcontrol.on('ringform_reset', self.resetForm)
    </script>
</ringform>
