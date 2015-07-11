<search>
    <div if={ show }>
        <form name="frmSearch" onsubmit={ find }>
            <h2>Find project</h2>
            <input type="text" name="needle" placeholder="Search" autocomplete="off" onkeyup={ find }>
            <button type="button" onclick={ find }>OK</button>
            <fieldset>
                <legend>Filter by</legend>
                <label><input type="radio" name="category" onclick={ find } value="title" checked> Project title</label>
                <label><input type="radio" name="category" onclick={ find } value="site"> Site name</label>
                <label><input type="radio" name="category" onclick={ find } value="ownerName"> Owner name</label>
            </fieldset>
        </form>

        <list heading="Search Results" items={ items } if={ items.length }>
            <span>{ item.title }, { item.site }<br>Owned by: { item.ownerName }</span><br>
            <datetime if={ item.dateStart || item.dateEnd }>{ item.dateStart } &ndash; { item.dateEnd } </datetime>
            <join if={ !item.isOwner } project={ item } />
        </list>
    </div>

    <script>
        var riotcontrol = require('riotcontrol')
        var utils = require('../../utils')
        var self = this

        self.show = false

        find(e) {
            if (self.needle.value.length > 1) {
                var params = {
                    category: utils.radioBtnVal('category'),
                    needle: self.needle.value
                }
                riotcontrol.trigger('search', params)
            }
        }

        riotcontrol.on('search_result', function(list) {
            self.update({items: list})
        })

        riotcontrol.on('route_changed', function(route) {
            self.update({show: (route == 'search')})
            if (route == 'search') {
                self.update({items: []})
                self.frmSearch.reset()
            }
        })
    </script>
</search>
