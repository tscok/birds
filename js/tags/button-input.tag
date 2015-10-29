<button-input>
    <label>{ label }</label><br>
    <button type="button" each={ buttons } onclick={ parent.select } value="{ value }" class={selected: selected }>{ label }</button>
    <input type="hidden" name="{ label }" value="hepp">

    <style>
        .selected {
            color: red;
        }
    </style>

    <script>
        this.buttons = this.opts.options
        this.label = opts.label

        select(e) {
            // get button state
            var isSelected = e.item.selected
            // reset button states
            this.buttons.forEach(function(btn){
                if (btn.selected) btn.selected = false
            })
            // set button state
            e.item.selected = isSelected ? false : true
            // get input element
            var input = this[this.label]
            // get input element value
            var oldVal = input.value
            // get button value
            var newVal = e.item.value
            // set input element value
            input.value = oldVal != newVal ? newVal : ''
        }
    </script>
</button-input>
