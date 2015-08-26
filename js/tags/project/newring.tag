<newring>
    <h1>New Ring</h1>
    <form name="frmNewring" onsubmit={ save }>
        <label>Ring ID</label><br>
        <input type="text" name="id" placeholder="Ring ID" required><br>
    
        <label>Species</label><br>
        <input type="text" name="species" placeholder="Species" oninput={ getSpecies } required><br>
        <div each={ specieslist } onclick={ setSpecies }>
            <span>{ Code } - { Scientific }<br><small>{ Swedish }/{ English }</small></span>
        </div>
    
        <label>Ring no.</label><br>
        <select name="ring" required>
            <option value="" selected>Select…</option>
            <option each={ val, i in largeNum } value={ i }>{ val }</option>
        </select><br>
        
        <label>Ring size</label><br>
        <input type="hidden" name="snid" value="">
        <select name="size" onchange={ setSnid } disabled={ !ringsize }>
            <option value="0" selected>Select…</option>
            <option each={ ringsize } value={ size } data-snid={ snid }>{ size }</option>
        </select><br>
    
        <label>Net</label><br>
        <input type="text" name="net" placeholder="Net"><br>

        <label>Age</label><br>
        <select name="age">
            <option value="" selected>Select…</option>
            <option each={ val, i in brood } value={ val }>{ val }</option>
        </select><br>

        <label>Sex</label><br>
        <select name="sex">
            <option value="" selected>Select…</option>
            <option each={ val, i in gender } value={ val }>{ val }</option>
        </select><br>

        <label>PJM</label><br>
        <select name="pjm">
            <option value="" selected>Select…</option>
            <option each={ val, i in smallNum } value={ i }>{ val }</option>
        </select><br>

        <label>Fat</label><br>
        <select name="fat">
            <option value="" selected>Select…</option>
            <option each={ val, i in smallNum } value={ i }>{ val }</option>
        </select><br>

        <label>Sign</label><br>
        <select name="sign">
            <option value="" selected>Select…</option>
            <option each={ val, i in signs } value={ val }>{ val }</option>
        </select><br>

        <label>Weight</label><br>
        <input type="text" name="weight" placeholder="Weight"><br>
        <label>Wing length</label><br>
        <input type="text" name="wingl" placeholder="Wing Length"><br>
        <label>Primaries</label><br>
        <input type="text" name="hand" placeholder="Primaries"><br>
        <label>Secondaries</label><br>
        <input type="text" name="arm" placeholder="Secondaries"><br>
        <label>Comment</label><br>
        <textarea name="comment"></textarea><br>
        
        <button type="submit">Save record</button>
        <button type="reset">Reset</button>
    </form>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        self.brood = ['1.0','2.0','2+','3+']
        self.gender = ['male','female']
        self.smallNum = []
        self.largeNum = []

        // Create an array of 0-9.
        for (var i = 0; i < 10; i++) {
            self.smallNum[i] = i;
        };

        // Create an array of 0-99.
        for (var i = 0; i < 100; i++) {
            self.largeNum[i] = i;
        };

        getSpecies() {
            if (self.species.value.length) {
               riotcontrol.trigger('newring_species', self.species.value)
            } else {
                self.update({specieslist: []})
            }
        }

        setSpecies(e) {
            console.log(e.item);
            self.species.value = e.item.Code
            self.setRingsize(e.item.Type1.replace(',','.'))
            self.update({specieslist: []})
            self.species.blur()
        }

        setRingsize(size) {
            if (!self.size) {
                return;
            }
            self.size.value = size
            var index = self.size.selectedIndex
            if (index == -1) {
                var msg = 'Suggested ring size (' + size + ') not listed in Ring Sizes.'
                riotcontrol.trigger('alert', msg, 'warning')
                return;
            }
            var item = self.size.options[index]
            self.snid.value = item.getAttribute('data-snid')
        }

        save() {
            var data = {
                species: self.species.value,
                ring: {
                    id: self.ring.value,
                    snid: self.snid.value
                },
                net: self.net.value,
                age: self.age.value,
                sex: self.sex.value,
                pjm: self.pjm.value,
                fat: self.fat.value,
                sign: self.sign.value,
                weight: self.weight.value,
                wing: {
                    length: self.wingl.value,
                    primaries: self.hand.value,
                    secondaries: self.arm.value
                },
                comment: self.comment.value
            }
            console.log('data',data);
        }

        riotcontrol.on('newring_ringsize', function(data) {
            self.update({ringsize: data})
        })

        riotcontrol.on('newring_signature', function(data) {
            self.update({signs: data})
        })

        riotcontrol.on('newring_species_data', function(data) {
            self.update({specieslist: data})
        })
    </script>
</newring>
