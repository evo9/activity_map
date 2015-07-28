(function() {
    $('#alerts_list ul').mCustomScrollbar({
        theme: 'minimal'
    });

    var map = new Datamap({
        element: document.getElementById('map'),
        responsive: true,
        fills: {
            defaultFill: '#929397'
        },
        geographyConfig: {
            highlightFillColor: '#00a4f2',
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
                d3.selectAll('#alerts_list ul li').remove();
                var offenses = data.response.result.rows;
                var pins = [];
                var alerts = [];
                for (var i = 0; i < offenses.length; i ++) {
                    var offense = offenses[i];
                    if (offense.length > 0) {
                        var cls = 'item_' + (i + 1);
                        var title = offense[0];
                        var coordinates = offense[1];
                        if (coordinates.length > 0) {
                            coordinates = coordinates.split(',');
                        }

                        var pin = {
                            id: i,
                            cls: cls,
                            latitude: coordinates[0],
                            longitude: coordinates[1],
                            title: title,
                            device: offense[2]
                        }

                        pins.push(pin);
                    }
                }

                map.pins(pins);
            }
        });
    }
})();
