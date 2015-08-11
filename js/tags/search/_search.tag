var riotcontrol = require('riotcontrol')
var utils = require('../../utils')
require('./join.tag')

<search>
    <form name="frmSearch" onsubmit={ find }>
        <h2>Find project</h2>
        <input type="text" name="needle" placeholder="Search" autocomplete="off">
        <button type="button" onclick={ find }>OK</button>
        <fieldset>
            <legend>Filter by</legend>
            <label><input type="radio" name="category" onclick={ find } value="all" checked> All</label>
            <label><input type="radio" name="category" onclick={ find } value="title"> Project title</label>
            <label><input type="radio" name="category" onclick={ find } value="site"> Site name</label>
            <label><input type="radio" name="category" onclick={ find } value="ownerName"> Owner name</label>
        </fieldset>
    </form>

    <list heading="Search Results" items={ result } if={ result.length }>
        <span>{ item.title }</span><span>, { item.site }</span><br>
        <span>Owned by: { item.ownerName }</span><br>
        <datetime if={ item.dateStart || item.dateEnd }>{ item.dateStart } &ndash; { item.dateEnd } </datetime>
        <join if={ !item.isOwner && item.isActive } data={ item }></join>
    </list>

    <script>
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

        riotcontrol.on('search_data', function(data) {
            self.update({result: data})
        })
    </script>
</search>
