<button-input>
    <label>{ label }</label><br>
    <button type="button" each={ buttons } onclick={ parent.select } value="{ value }" class={selected: selected }>{ label }</button>
    <input type="hidden" name="{ label }">

    <style>
        .selected {
            color: red;
        }
    </style>

    <script>
        var riotcontrol = require('riotcontrol')
        var self = this

        self.buttons = opts.options
        self.label = opts.label.toLowerCase()

        deselectAll() {
            self.buttons.forEach(function(btn){
                if (btn.selected) btn.selected = false
            })
        }

        select(e) {
            // get button state
            var isSelected = e.item.selected
            // reset button states
            self.deselectAll()
            // set button state
            e.item.selected = isSelected ? false : true
            // get input element
            var input = self[self.label]
            // get input element value
            var oldVal = input.value
            // get button value
            var newVal = e.item.value
            // set input element value
            input.value = oldVal != newVal ? newVal : ''
        }

        riotcontrol.on('route', function(route) {
            if (route == 'project' && self[self.label].value) {
                self[self.label].value = null
                self.deselectAll()
            }
        })
    </script>
</button-input>
