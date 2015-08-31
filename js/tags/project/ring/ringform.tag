<ringform>
    <h2>{ opts.action == 'newring' ? 'New Ring' : 'Control' }</h2>
    <form name="frmRing" onsubmit={ save }>
        <div if={ opts.action == 'control' }>
            <label>Ring ID</label><br>
            <input type="text" name="ringid" placeholder="Ring ID" oninput={ idLookup }>
        </div>
        
        <label>Species</label><br>
        <input type="text" name="species" placeholder="Species" oninput={ speciesLookup } autocomplete="off"><br>
        <div each={ specieslist } onclick={ setSpecies }>
            <span>{ Artkod } - { VetNamn }<br><small>{ SVnamn }/{ ENnamn }</small></span>
        </div><br>

        <div if={ opts.action == 'newring' }>
            <label>Ring #</label><br>
            <input type="number" step="1" min="0" max="99" name="ring" placeholder="Ring #"><br>
            <dropdown select="size" items={ size } objects={ true }></dropdown><br>
        </div>

        <label>Net</label><br>
        <input type="text" name="net" placeholder="Net"><br>

        <dropdown select="age" items={ age }></dropdown><br>
        <dropdown select="sex" items={ sex }></dropdown><br>

        <label>PJM</label><br>
        <input type="number" step="1" min="0" max="9" name="pjm"><br>
        <label>Fat</label><br>
        <input type="number" step="1" min="0" max="9" name="fat"><br>

        <dropdown select="sign" items={ sign }></dropdown><br>

        <label>Weight</label><br>
        <input type="text" name="weight" placeholder="Weight"><br>
        <label>Wing length</label><br>
        <input type="text" name="wingl" placeholder="Wing Length"><br>

        <label>Primaries</label><br>
        <input type="text" name="primaries" placeholder="Primaries"><br>
        <label>Secondaries</label><br>
        <input type="text" name="secondaries" placeholder="Secondaries"><br>
        <label>Comment</label><br>
        <textarea name="comment"></textarea><br>

        <button type="submit">Save</button>
        <button type="reset">Reset</button>
    </form>

    <script>
        var riotcontrol = require('riotcontrol')
        var serialize = require('form-serialize')
        var self = this

        self.sex = ['F','M']
        self.age = ['1.0','2.0','2+','3+']
        self.size = [{key:'abc123', val:'0,5'},{key:'wer456', val:'1'}]

        speciesLookup() {
            if (self.species.value.length > 2) {
               riotcontrol.trigger('ringform_species', self.species.value)
            } else {
                self.update({specieslist: []})
            }
        }

        setSpecies(e) {
            console.log(e.item);
            // self.species.value = e.item.Code
            // self.setRingsize(e.item.Type1.replace(',','.'))
            // self.update({specieslist: []})
            // self.species.blur()
        }

        save() {
            var data = serialize(self.frmRing, {hash: true})
            data.ring = parseInt(data.ring) < 10 ? '0' + data.ring : data.ring;
            data.ring = data.size + data.ring;
            delete data.size;
            console.log('save', opts.action, 'data', data);
            self.frmRing.reset()
        }

        riotcontrol.on('ringform_clear', function() {
            self.frmRing.reset()
        })

        riotcontrol.on('ringform_species_data', function(data) {
            self.update({specieslist: data})
        })
    </script>
</ringform>
