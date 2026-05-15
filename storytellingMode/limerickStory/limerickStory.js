//video
let video = document.querySelector('video')
window.addEventListener('scroll', function () {
    let value = 1 + window.scrollY / -600
    video.style.opacity = value
});
//map
var config = {
    style: 'mapbox://styles/zhiweizou/ckdhlcw3d038z1ip9x26cm14s',
    accessToken: 'pk.eyJ1Ijoiemhpd2Vpem91IiwiYSI6ImNrY2dhcmJwaDBxOHcyeXBiZ3I1bHJhc3gifQ.f3EPTWknNq-nuqNxz33aZw',
    showMarkers: false,
    theme: 'light',
    alignment: 'left',
    title: '',
    subtitle: '',
    byline: '',
    footer: 'END',
    chapters: [
        {
            id: 'page1',
            title: 'Small Area Within Limerick',
            image: '',
            legend: '../legendImg/s_hp2016.png',

            description: 'About 35% of Limerick’s population live in disadvantaged areas. The data suggests issues with high unemployment, low levels of education and low social status. ',
            chart: '',
            location: {
                center: [-8.84483, 52.61316],
                zoom: 10.01,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [
                {
                    layer: 'smap-HP2016rel',
                    opacity: 1
                }
            ],
            onChapterExit: [
                {
                    layer: 'smap-HP2016rel',
                    opacity: 0
                }
            ]
        },
        {
            id: 'page2',
            title: 'The Worst Area - JOHN’S A',
            image: '',
            legend: '../legendImg/s_hp2016.png',
            // highlightBorder: '128024',
            description: 'Part of the central area of Limerick city, JOHN’S A (King’s Island), is considered to be an extremely disadvantaged area in the country with a Deprivation Index Score of -31.9.',
            chart: '',
            location: {
                center: [-8.67064, 52.66298],
                zoom: 12.50,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [
                {
                    layer: 'smap-HP2016rel',
                    opacity: 1
                }
            ],
            onChapterExit: [
                {
                    layer: 'smap-HP2016rel',
                    opacity: 0
                }
            ]
        },
        {
            id: 'page3',
            title: 'JOHN’S A - Unemployment - Male',
            image: '',
            legend: '../legendImg/s_unempm16.png',
            description: 'Here the unemployment rates are extremely high. 69.9% of men.The male unemployment rates are the highest in the country when compared to other areas.',
            chart: '',
            location: {
                center: [-8.67064, 52.66298],
                zoom: 12.50,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [
                {
                    layer: 'smap-UNEMPM16',
                    opacity: 1
                }
            ],
            onChapterExit: [
                {
                    layer: 'smap-UNEMPM16',
                    opacity: 0
                }
            ]
        },
        {
            id: 'page4',
            title: 'JOHN’S A - Unemployment - Female',
            image: '',
            legend: '../legendImg/s_unempf16.png',
            description: '39.7% of women are unemployed.',
            chart: '',
            location: {
                center: [-8.67064, 52.66298],
                zoom: 12.50,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [
                {
                    layer: 'smap-UNEMPF16',
                    opacity: 1
                }
            ],
            onChapterExit: [
                {
                    layer: 'smap-UNEMPF16',
                    opacity: 0
                }
            ]
        },
        {
            id: 'page5',
            title: 'JOHN’S A - Lone Parent Ratio',
            image: '',
            legend: '../legendImg/s_lonepa16.png',
            description: 'The ratio of single parents is also significantly high. Here 74% of people are single parents which is the highest in Ireland when compared to other areas.',
            chart: '',
            location: {
                center: [-8.67064, 52.66298],
                zoom: 12.50,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [
                {
                    layer: 'smap-LONEPA16',
                    opacity: 1
                }
            ],
            onChapterExit: [
                {
                    layer: 'smap-LONEPA16',
                    opacity: 0
                }
            ]
        },
        {
            id: 'page6',
            title: 'JOHN’S A  - Education',
            image: '',
            legend: '../legendImg/s_edhigh16.png',
            description: 'Low percentage of people with higher education (2.4%) and high percentage of people with primary education only (47%) indicate potential issues with access to education.',
            chart: '<figure class="highcharts-figure"><div id="container1"></div></figure>',
            location: {
                center: [-8.67064, 52.66298],
                zoom: 12.50,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [
                {
                    layer: 'smap-EDHIGH16',
                    opacity: 1
                }
            ],
            onChapterExit: [
                {
                    layer: 'smap-EDHIGH16',
                    opacity: 0
                }
            ]
        },
        {
            id: 'page7',
            title: 'JOHN’S A - Social Status',
            image: '',
            legend: '../legendImg/s_hlprof16.png',
            description: 'High number of low skilled workers and low numbers of highly skilled workers indicate low social status of this area’s population. When compared to other areas in the country, the percentage of low skilled workers (55.4%)  is the highest in the country and the percentage of high skilled workers is the lowest (4%).',
            chart: '<figure class="highcharts-figure"><div id="container2"></div></figure>',
            location: {
                center: [-8.67064, 52.66298],
                zoom: 12.50,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [
                {
                    layer: 'smap-HLPROF16',
                    opacity: 1
                }
            ],
            onChapterExit: [
                {
                    layer: 'smap-HLPROF16',
                    opacity: 0
                }
            ]
        },
        {
            id: 'page8',
            title: 'JOHN’S A - Accommodation',
            image: '',
            legend: '../legendImg/s_peroom16.png',
            description: 'The average number of persons per room can tell us a little bit more about the housing situation in the area. In JOHN’s A on average there is less than one person per room. This means there are more rooms in accommodation than people living in it.\n' +
                'The percentage of Local Authority rented housing is high at 40.3% suggesting poverty and need for social housing.',
            chart: '<figure class="highcharts-figure"><div id="container3"></div></figure>',
            location: {
                center: [-8.67064, 52.66298],
                zoom: 12.50,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [
                {
                    layer: 'smap-PEROOM16',
                    opacity: 1
                }
            ],
            onChapterExit: [
                {
                    layer: 'smap-PEROOM16',
                    opacity: 0
                }
            ]
        },
        {
            id: 'page9',
            title: 'The Similar Features of Disadvantage Areas ',
            image: '',
            legend: '../legendImg/s_HP2016.png',
            description: 'Between 2011 and 2016 the population decreased by only 0.1 and the age dependency ratio is at 36.6%. Since this is an urban area the changes in the demographic profile should not have a significant impact on the deprivation levels. Lack of population growth and higher number of age dependant population may have negative impact on the remaining disadvantaged areas in Limerick City show similar trends in terms of high unemployment rates, low education levels and low social status.',
            chart: '<figure class="highcharts-figure"><div id="container4"></div></figure>',
            location: {
                center: [-8.67064, 52.66298],
                zoom: 12.50,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [
                {
                    layer: 'smap-HP2016rel',
                    opacity: 1
                }
            ],
            onChapterExit: [
                {
                    layer: 'smap-HP2016rel',
                    opacity: 0
                }
            ]
        }
    ]
};
//html js
//load map
mapboxgl.accessToken = config.accessToken;

const transformRequest = (url) => {
    const hasQuery = url.indexOf("?") !== -1;
    const suffix = hasQuery ? "&pluginName=journalismScrollytelling" : "?pluginName=journalismScrollytelling";
    return {
        url: url + suffix
    }
};

var map = new mapboxgl.Map({
    container: 'map',
    style: config.style,
    center: config.chapters[0].location.center,
    zoom: config.chapters[0].location.zoom,
    bearing: config.chapters[0].location.bearing,
    pitch: config.chapters[0].location.pitch,
    scrollZoom: false,
    transformRequest: transformRequest
});

var marker = new mapboxgl.Marker();
if (config.showMarkers) {
    marker.setLngLat(config.chapters[0].location.center).addTo(map);
}

// instantiate the scrollama
var scroller = scrollama();
var highlightShow1 = false;
var highlightShow2 = false;
map.on("load", function () {
    //highlight
    map.addSource("counties", {
        "type": "geojson",
        "data": "../dataGeo/cMap.geojson",
        'generateId': true // This ensures that all features have unique IDs
    });
    map.addSource("smallArea", {
        "type": "geojson",
        "data": "../dataGeo/sMap.geojson",
        'generateId': true // This ensures that all features have unique IDs
    });
    map.addLayer(
        {
            'id': 'counties-highlighted',
            'type': 'line',
            'source': 'counties',
            'paint': {
                "line-color": "rgba(0,0,0,1)",
                "line-width": 3
            },
            'filter': ['in', 'COUNTY', 'LIMERICK']
        },
    );
    map.addLayer(
        {
            'id': 'smallArea-highlighted',
            'type': 'line',
            'source': 'smallArea',
            'paint': {
                "line-color": "rgba(255,0,0,1)",
                "line-width": 3
            },
            'filter': ['in', 'ED_ID', '128024']
        },
    );


    //highlight

    // setup the instance, pass callback functions
    scroller
        .setup({
            step: '.step',
            offset: 0.5,
            progress: true
        })
        .onStepEnter(response => {
            var chapter = config.chapters.find(chap => chap.id === response.element.id);
            response.element.classList.add('active');
            map.flyTo(chapter.location);
            if (config.showMarkers) {
                marker.setLngLat(chapter.location.center);
            }
            if (chapter.onChapterEnter.length > 0) {
                chapter.onChapterEnter.forEach(setLayerOpacity);
            }
            if (chapter.legend) {
                setLegend(chapter.legend);
            } else {
                var legend = document.getElementById('legend');
                if (legend.hasChildNodes()) {
                    legend.removeChild(legend.childNodes[0]);
                }
            }

            // else{
            //         var filter = features.reduce(
            //             function (memo, feature) {
            //                 memo.push(feature.properties.ED_ID);
            //                 return memo;
            //             },
            //             ['in', 'null']
            //         );
            //         map.setFilter('smallArea-highlighted', filter);
            //     }

            //
            //console.log(chapter.id);
        })
        .onStepExit(response => {
            var chapter = config.chapters.find(chap => chap.id === response.element.id);
            response.element.classList.remove('active');
            if (chapter.onChapterExit.length > 0) {
                chapter.onChapterExit.forEach(setLayerOpacity);
            }
        });


});

//load map


var layerTypes = {
    'fill': ['fill-opacity'],
    'line': ['line-opacity'],
    'circle': ['circle-opacity', 'circle-stroke-opacity'],
    'symbol': ['icon-opacity', 'text-opacity'],
    'raster': ['raster-opacity'],
    'fill-extrusion': ['fill-extrusion-opacity']
};

var alignments = {
    'left': 'lefty',
    'center': 'centered',
    'right': 'righty'
};

function getLayerPaintType(layer) {
    var layerType = map.getLayer(layer).type;
    return layerTypes[layerType];
}

function setLayerOpacity(layer) {
    var paintProps = getLayerPaintType(layer.layer);
    paintProps.forEach(function (prop) {
        map.setPaintProperty(layer.layer, prop, layer.opacity);
    });
}

function setLegend(src) {
    var image = new Image();
    image.src = src;
    var legend = document.getElementById("legend");
    if (legend.hasChildNodes()) {
        legend.removeChild(legend.childNodes[0]);
    }
    legend.appendChild(image);
}


var story = document.getElementById('story');
var features = document.createElement('div');
features.classList.add(alignments[config.alignment]);
features.setAttribute('id', 'features');

var header = document.createElement('div');

if (config.title) {
    var titleText = document.createElement('h1');
    titleText.innerText = config.title;
    header.appendChild(titleText);
}

if (config.subtitle) {
    var subtitleText = document.createElement('h2');
    subtitleText.innerText = config.subtitle;
    header.appendChild(subtitleText);
}

if (config.byline) {
    var bylineText = document.createElement('p');
    bylineText.innerText = config.byline;
    header.appendChild(bylineText);
}

if (header.innerText.length > 0) {
    header.classList.add(config.theme);
    header.setAttribute('id', 'header');
    story.appendChild(header);
}

config.chapters.forEach((record, idx) => {
    var container = document.createElement('div');
    var chapter = document.createElement('div');

    if (record.title) {
        var title = document.createElement('h3');
        title.innerText = record.title;
        chapter.appendChild(title);
    }

    if (record.image) {
        var image = new Image();
        image.src = record.image;
        chapter.appendChild(image);
    }

    if (record.description) {
        var story = document.createElement('p');
        story.innerHTML = record.description;
        chapter.appendChild(story);
    }
    if (record.chart) {
        var chart = document.createElement('div');
        chart.innerHTML = record.chart;
        chapter.appendChild(chart);
    }
    container.setAttribute('id', record.id);
    container.classList.add('step');
    if (idx === 0) {
        container.classList.add('active');
    }

    chapter.classList.add(config.theme);
    container.appendChild(chapter);
    features.appendChild(container);
});

story.appendChild(features);

var footer = document.createElement('div');

if (config.footer) {
    var footerText = document.createElement('p');
    footerText.innerHTML = config.footer;
    footer.appendChild(footerText);
}

if (footer.innerText.length > 0) {
    footer.classList.add(config.theme);
    footer.setAttribute('id', 'footer');
    story.appendChild(footer);
}

//move map

//edu pie page8
Highcharts.chart('container1', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false
    },
    title: {
        text: 'Education Situation',
        align: 'center',
        verticalAlign: 'middle',
        y: -100
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            dataLabels: {
                enabled: true,
                distance: -50,
                style: {
                    fontWeight: 'lighter',
                    color: 'black'
                }
            },
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '80%'],
            size: '110%'
        }
    },
    series: [{
        type: 'pie',
        name: 'Ratio',
        innerSize: '50%',
        data: [
            ['higher level education', 2.4],
            ['stopped at primary level', 47],

            {
                name: 'Other',
                y: 50.6,
                dataLabels: {
                    enabled: true
                }
            }
        ]
    }]
});
//edu pie page8
//skill pie page9
Highcharts.chart('container2', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false
    },
    title: {
        text: 'High Skilled Labour and Low Skilled Labour',
        align: 'center',
        verticalAlign: 'middle',
        y: -100
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            dataLabels: {
                enabled: true,
                distance: -50,
                style: {
                    fontWeight: 'lighter',
                    color: 'black'
                }
            },
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '80%'],
            size: '110%'
        }
    },
    series: [{
        type: 'pie',
        name: 'Ratio',
        innerSize: '50%',
        data: [
            ['High Skilled Labour', 4],
            ['Low Skilled Labour', 55.4],

            {
                name: 'Other',
                y: 40.6,
                dataLabels: {
                    enabled: true
                }
            }
        ]
    }]
});
//skill pie page9
//room pie page10
Highcharts.chart('container3', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false
    },
    title: {
        text: 'Type of Rented Accommodation',
        align: 'center',
        verticalAlign: 'middle',
        y: -100
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            dataLabels: {
                enabled: true,
                distance: -50,
                style: {
                    fontWeight: 'lighter',
                    color: 'black'
                }
            },
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '80%'],
            size: '110%'
        }
    },
    series: [{
        type: 'pie',
        name: 'Ratio',
        innerSize: '50%',
        data: [
            ['Private Rented Accommodation', 5.9],
            ['Local Authority Rented Accommodation', 40.3],

            {
                name: 'Other',
                y: 53.8,
                dataLabels: {
                    enabled: true
                }
            }
        ]
    }]
});
//room pie page10
//heatmap page11
function getPointCategoryName(point, dimension) {
    var series = point.series,
        isY = dimension === 'y',
        axis = series[isY ? 'yAxis' : 'xAxis'];
    return axis.categories[point[isY ? 'y' : 'x']];
}

Highcharts.chart('container4', {

    chart: {
        type: 'heatmap',
        marginTop: 60,
        marginBottom: 80,
        plotBorderWidth: 1
    },


    title: {
        text: 'Five Factors Index (%)' + '\<br>' + '- Top 5 Disadvantage Areas winthin Limerick County'
    },

    xAxis: {
        categories: ['JOHN\'S A', 'GALVONE B',  'GLENTWORTH C', 'BALLYNANTY', 'KILLEELY A']
    },
    yAxis: {
        categories: ['Population' + '\<br>' + 'Change', 'Unemployment' + '\<br>' +
        '- Male', 'Unemployment' + '\<br>' +
        ' - Female', 'Education' + '\<br>' +
        '- Primary only', 'Persons' + '\<br>' + 'per Room'],
        title: null,
        reversed: true

    },

    accessibility: {
        point: {
            descriptionFormatter: function (point) {
                var ix = point.index + 1,
                    xName = getPointCategoryName(point, 'x'),
                    yName = getPointCategoryName(point, 'y'),
                    val = point.value;
                return ix + '. ' + xName + ' sales ' + yName + ', ' + val + '.';
            }
        }
    },

    colorAxis: {
        min: 0,
        minColor: '#FFFFFF',
        maxColor: Highcharts.getOptions().colors[0]
    },

    legend: {
        align: 'right',
        layout: 'vertical',
        margin: 0,
        verticalAlign: 'top',
        y: 43,
        symbolHeight: 260
    },

    tooltip: {
        formatter: function () {
            return '<b>' + getPointCategoryName(this.point, 'x') + '</b><br><b>' + getPointCategoryName(this.point, 'y') + '</b> Ratio <br><b>' + this.point.value + '</b>';
        }
    },

    series: [{
        name: 'worst5Limerick',
        borderWidth: 1,
        data: [[0, 0, -0.1], [0, 1, 69.9], [0, 2, 39.7], [0, 3, 2.4], [0, 4, 0.6], [1, 0, 0], [1, 1, 47.8], [1, 2, 40.4], [1, 3, 4.6], [1, 4, 0.7], [2, 0, 0], [2, 1, 45.8], [2, 2, 33.1], [2, 3, 4.4], [2, 4, 0.5], [3, 0, 0], [3, 1, 42], [3, 2, 45.8], [3, 3, 7], [3, 4, 0.6], [4, 0, 0], [4, 1, 41.3], [4, 2, 37], [4, 3, 7.8], [4, 4, 0.6]],
        dataLabels: {
            enabled: true,
            color: '#000000'
        }
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                yAxis: {
                    labels: {
                        formatter: function () {
                            return this.value.charAt(0);
                        }
                    }
                }
            }
        }]
    }

});
//heatmap page11
// setup resize event
window.addEventListener('resize', scroller.resize);