<list>
    <h3 if={ opts.heading }>{ opts.heading }</h3>
    <ul if={ opts.items.length }>
        <li each={ opts.items }>
            <yield/>
        </li>
    </ul>
    <p if={ !opts.items.length }>{ opts.status }</p>
</list>
