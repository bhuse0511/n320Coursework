

var app = new Vue({
    el: "#app",
    mounted: function() {
        axios.get('data/boat.json')
        .then(( response ) => {
            this.boat = response.data.boat;
         });
    },
    data: {
        boat: [ ]
    },
    methods: {

    }
})