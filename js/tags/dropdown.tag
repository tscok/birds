<dropdown>
    <label>{ capitalize(opts.label) }</label><br>
    <select id="select" name="{ opts.label }" required="{ opts.require }"></select>
    <div id="options" style="display:none;">
        <option value="">Select…</option>
        <yield/>
    </div>
    var riotcontrol = require('riotcontrol')

    capitalize(s) {
        return s[0].toUpperCase() + s.substr(1)
    }
    /**
     * This is an ugly workaround due to the fact
     * that Riot lacks support for yield in select.
     * https://github.com/riot/riot/issues/691
     */
    this.select.innerHTML = this.options.innerHTML
</dropdown>
