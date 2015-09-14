<species>
    <label>Species</label><br>
    <input type="text" name="species" oninput={ lookup } onblur={ delayClear } autocomplete="off">
    <div each={ result } onclick={ specify }>
        <span>{ Artkod } - { VetNamn }</span><br>
        <small>{ SVnamn } / { ENnamn }</small>
    </div>
    
    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        specify(e) {
            var item = e.item
            self.species.value = item.Artkod
            this.parent.setData(item)
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
            if (self.result.length) {
                setTimeout(function() {
                    self.clearResult()
                }, 100)
            }
        }

        riotcontrol.on('species_data', function(data) {
            self.update({result: data})
        })
    </script>
</species>
