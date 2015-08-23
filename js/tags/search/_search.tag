var riotcontrol = require('riotcontrol')
var utils = require('../../utils')
var moment = require('moment')
require('./join.tag')


<search>
    <form name="frmSearch" onsubmit={ find }>
        <h2>Find project</h2>
        <input type="text" name="needle" placeholder="Search" autocomplete="off">
        <button type="button" onclick={ find }>OK</button><br>
        <label>Filter on</label>
        <select name="category" onchange={ find }>
            <option value="all">All</option>
            <option value="title">Title</option>
            <option value="site">Site</option>
            <option value="userName">User</option>
        </select>
    </form>

    <list heading="Search Results" items={ result } if={ result.length }>
        <span>{ item.title }</span><span>, { item.site }</span><br>
        <datetime>{ parent.parent.format(item.date.start) } &ndash; { parent.parent.format(item.date.end) }</datetime><br>
        <span>by { item.userName }</span>
        <join if={ !item.isOwner && item.isActive } data={ item }></join>
    </list>

    <script>
        var self = this

        self.show = false

        find(e) {
            if (self.needle.value.length > 1) {
                var params = {
                    category: self.category.value,
                    needle: self.needle.value
                }
                riotcontrol.trigger('search', params)
            }
        }

        format(int) {
            return moment.unix(int).format('YYYY-MM-DD')
        }

        riotcontrol.on('search_data', function(data) {
            self.update({result: data})
        })

        riotcontrol.on('search_clear', function() {
            self.frmSearch.reset()
            self.update({result: []})
            self.needle.focus()
        })
    </script>
</search>
