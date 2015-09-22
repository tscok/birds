<species>
    <label>Species</label><br>
    <input type="text" name="species" oninput={ lookup } onblur={ delayClear } autocomplete="off" required>
    <div each={ result } onclick={ specify } class="autocomplete">
        <span>{ Artkod } - { VetNamn }</span><br><small>{ SVnamn } / { ENnamn }</small>
    </div>
    
    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        specify(e) {
            var item = e.item
            console.log(item);
            self.species.value = item.Artkod
            this.parent.setRingformData(item)
        }
        
        lookup(e) {
            if (self.species.value.length > 1) {
               riotcontrol.trigger('species_match', self.species.value)
            } else {
                self.clearResult()
            }
        }

        clearResult() {
            self.update({result: []})
        }

        delayClear(e) {
            if (!self.species.value.length || !self.result.length) {
                return;
            }
            setTimeout(function() {
                self.clearResult()
            }, 250)
        }

        riotcontrol.on('species_data', function(data) {
            self.update({result: data})
        })
    </script>
</species>
