(function() {
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
                var offenses = data.response.result.rows;
                //d3.select('#alerts_counter span').text(offenses.length);
                var i = 0;
                drawPin(offenses, i);
            }
        });
    }

    function redraw() {
        map.svg.selectAll("g").attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    }

    function drawPin(offenses, i) {
        if (i < offenses.length) {
            var offense = offenses[i];
            if (offense.length > 0) {
                var title = offense[0];
                var coordinates = offense[1];
                if (coordinates.length > 0) {
                    coordinates = coordinates.split(',');
                }
                map.pins({
                    latitude: coordinates[0],
                    longitude: coordinates[1],
                    radius: 5,
                    borderWidth: 0,
                    title: title,
                    device: offense[2]
                }, {
                    popupTemplate: function (geo, data) {
                    var html = '<p>' + data.title + '</p><p><strong>Device model:</strong> ' + data.device + '</p>';
                        return html;
                    }
                });

                setTimeout(function() {
                    if ($('.datamaps-tooltip').is(':hover')) {
                        drawPin(offenses, i);
                    }
                    else {
                        i ++;
                        drawPin(offenses, i);
                    }
                }, 2000);
            }
        }
        else {
            load();
        }
    }
})();
