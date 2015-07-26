<alert>
    <div class="alert alert--{ alert.type }" if={ alert.text }>
        <p class="alert__text">{ alert.text } <button class="alert__close" onclick={ close }>Close</button></p>
    </div>

    <script>
        var riotcontrol = require('riotcontrol');

        var self = this

        self.alert = {}

        close(e) {
            self.alert = {}
        }

        riotcontrol.on('alert', function(obj) {
            self.update({alert: obj})

            // if (obj.type == 'success') {
            //     setTimeout(function() {
            //         self.update({alert: null})
            //     }, 4000)
            // }
        })
    </script>
</alert>
