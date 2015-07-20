(function() {
    var map = new Datamap({
        element: document.getElementById('map'),
        responsive: true,
        fills: {
            defaultFill: '#78a7b9'
        },
        geographyConfig: {
            highlightFillColor: '#0f3b47',
            highlightBorderColor: '#fff'
        }
    });

    /*map.svg.call(d3.behavior.zoom()
        .on("zoom", redraw));*/

    window.addEventListener('resize', function(event){
        map.resize();
    });
    load();

    function load() {
        d3.json('http://50.116.39.186/get_api_data.php', function(error, data) {
            if (data && data !== 'undefined') {
                var offenses = data.response.result.rows;

                var pins = [];
                for(var i = 0; i < offenses.length; i ++) {
                    var offense = offenses[i];
                    if (offense.length > 0) {
                        var title = offense[0];
                        var coordinates = offense[1];
                        if (coordinates.length > 0) {
                            coordinates = coordinates.split(',');
                            var pin = {
                                latitude: coordinates[0],
                                longitude: coordinates[1],
                                radius: 5,
                                borderWidth: 0,
                                title: title
                            }
                            pins.push(pin);
                        }
                    }
                }
                map.pins(pins, {
                    popupTemplate: function (geo, data) {
                        return data.title;
                    }
                });
            }
        });
    }

    function redraw() {
        map.svg.selectAll("g").attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    }
})();
