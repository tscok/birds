<dropdown>
    <label>{ label }</label><br>
    <select id="select" name="{ opts.label }" required="{ opts.require }"></select>
    <div id="options" style="display:none;">
        <option value="">Select…</option>
        <yield/>
    </div>

    <script>
        var riotcontrol = require('riotcontrol')
        var utils = require('../utils')

        this.label = utils.capitalize(opts.label)
        
        /**
         * This is an ugly workaround due to the fact
         * that Riot lacks support for yield in select.
         * https://github.com/riot/riot/issues/691
         */
        this.select.innerHTML = this.options.innerHTML
    </script>
</dropdown>
