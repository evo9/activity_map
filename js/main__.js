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

    map.load();

    /*map.svg.call(d3.behavior.zoom()
        .on("zoom", redraw));*/

    window.addEventListener('resize', function(event){
        map.resize();
    });
})();
