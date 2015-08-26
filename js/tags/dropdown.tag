<dropdown>
    <label>{ capitalize(opts.select) }</label><br>
    <select name="{ opts.select }" onchange={ setParentValue } if={ opts.objects }>
        <option value="" selected>Select…</option>
        <option each={ opts.items } value={ snid }>{ size }</option>
    </select>
    <select name="{ opts.select }" onchange={ setParentValue } if={ !opts.objects }>
        <option value="" selected>Select…</option>
        <option each={ val, i in opts.items } value={ val }>{ val }</option>
    </select>

    capitalize(s) {
        return s[0].toUpperCase() + s.substr(1);
    }
</dropdown>
