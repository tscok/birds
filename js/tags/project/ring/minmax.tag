<minmax>
    <label>{ label }</label><br>
    <input type="text" name="{ opts.label }" onblur={ checkValue } autocomplete="off">
    <p if={ showHint }><yield/> {opts.min} - {opts.max} {opts.unit}.</p>

    <script>
        var riotcontrol = require('riotcontrol')
        var utils = require('../../../utils');
        var self = this
        
        self.label = utils.capitalize(opts.label)

        checkValue(e) {
            var elm = e.target.name
            var val = e.target.value

            self.showHint = false

            if (val < opts.min || val > opts.max) {
                self.showHint = true
            }

            // if (!opts.min || !opts.max || !val) {
            //     self.showHint = false
            // } else if (val < opts.min || val > opts.max) {
            //     self.showHint = true
            // } else {
            //     self.showHint = false
            // }
        }
    </script>
</minmax>
