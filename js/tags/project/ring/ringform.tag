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
            
            <div riot-tag="ringsize"></div>
        </div>

        <div>
            <label>Net</label><br>
            <input type="text" name="net">
        </div>

        <div riot-tag="button-input" label="Age" options={ age }></div>

        <div riot-tag="button-input" label="Sex" options={ sex }></div>

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

        // self.sex = ['F','M']
        self.sex = [
            {label:'F', value:'F'},
            {label:'M', value:'M'}
        ]
        // self.age = ['1.0','2.0','2+','3+']
        self.age = [
            {label:'1.0', value:'1.0'},
            {label:'2.0', value:'2.0'},
            {label:'2+', value:'2+'},
            {label:'3+', value:'3+'}
        ]

        setRingformData(data) {
            self.update({data: data})
            if (opts.action == 'newring') {
                self.tags.ringsize.setRingsize(data.Rtyp1.replace(',','.'))
            }
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
        
        riotcontrol.on('ringform_reset', self.resetForm)
    </script>
</ringform>
