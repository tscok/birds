var moment = require('moment')

<list>
    <h3 if={ opts.heading && opts.items.length }>{ opts.heading }</h3>
    <ul if={ opts.items.length }>
        <li each={ item, i in opts.items }>
            <yield/>
        </li>
    </ul>
    <p if={ opts.status && !opts.items.length }>{ opts.status }</p>

    <script>
        var self = this

        removeItem(e) {
            var item = e.item.item
            var list = opts.items
            var index = list.indexOf(item)
            list.splice(index, 1)
        }
    </script>
</list>
