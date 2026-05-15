//video
let video = document.querySelector('video')
window.addEventListener('scroll', function () {
    let value = 1 + window.scrollY / -600
    video.style.opacity = value
});
//map
var config = {
    style: 'mapbox://styles/zhiweizou/ckdiznjbz12uy1io9nexykmxm',
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
            title: '   ',
            image: '',
            legend: '../legendImg_story/c_hp2016.png',
            description: 'The HP Pobal Deprivation Index Score helps to identify underprivileged areas based on several demographic factors, social class composition and labour market situation.',
            chart: '',
            location: {
                center: [-9.596349, 53.2987839],
                zoom: 6,
                pitch: 0,
                bearing: 0
            },
            onChapterEnter: [
                {
                    layer: 'cmap-HP2016rel',
                    opacity: 1
                }
            ],
            onChapterExit: [
                {
                    layer: 'cmap-HP2016rel',
                    opacity: 0
                }
            ]
        },{
            id: 'page2',
            title: '   ',
            image: '',
            legend: '../legendImg_story/c_vbbtotal.png',
            description: 'With the additional data from the 2016 census we can examine the relationship between the deprivation levels and general health.Overall, there is a tendency for disadvantaged areas to have a higher population with very bad or bad general health.',
            chart: '',
            location: {
                center: [-9.596349, 53.2987839],
                zoom: 6,
                pitch: 0,
                bearing: 0
            },
            onChapterEnter: [
                {
                    layer: 'cmap-VBBTOTAL',
                    opacity: 1
                }
            ],
            onChapterExit: [
                {
                    layer: 'cmap-VBBTOTAL',
                    opacity: 0
                }
            ]
        },
        {
            id: 'page3',
            title: '     ',
            image: '',
            legend: '../legendImg_story/s_vbbtotal.png',
            highlightBorder: 'page3',
            description: 'Shortcourse is a disadvantaged area in Waterford City that has the highest percentage of people (6.98%), who consider their general health to be bad or very bad. Other areas with a percentage of population above 6%, who rate their health as bad or very bad live in disadvantaged or extremely disadvantaged areas.\n',
            chart: '',
            location: {
                center: [-7.13881, 52.25685],
                zoom: 13.29,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [
                {
                    layer: 'smap-VBBTOTAL',
                    opacity: 1
                }
            ],
            onChapterExit: [
                {
                    layer: 'smap-VBBTOTAL',
                    opacity: 0
                }
            ]
        },
        {
            id: 'page4',
            title: '     ',
            image: '',
            legend: '../legendImg_story/s_vbbtotal.png',
            highlightBorder: 'page4',
            description: 'However, there is an exception. Tramore C in Cork City is on the affluent side of the index but 6.18% of its population consider their health as being bad or very bad.\n',
            chart: '',
            location: {
                center: [-8.50439, 51.89712],
                zoom: 12.00,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [
                {
                    layer: 'smap-VBBTOTAL',
                    opacity: 1
                }
            ],
            onChapterExit: [
                {
                    layer: 'smap-VBBTOTAL',
                    opacity: 0
                }
            ]
        },
        {
            id: 'page5',
            title: '     ',
            image: '',
            legend: '../legendImg_story/c_vbbtotal.png',
            highlightBorder: 'page5',
            description: 'There are also underprivileged areas, like Kilshenane in Kerry and Doonloughan in County Galway, where there are no people or there is significantly low number of people who consider their health as being bad or very bad.',
            chart: '',
            location: {
                center: [-9.91049, 52.34548],
                zoom: 8.84,
                pitch: 0,
                bearing: 0.00
            },
            onChapterEnter: [
                {
                    layer: 'cmap-VBBTOTAL',
                    opacity: 1
                }
            ],
            onChapterExit: [
                {
                    layer: 'cmap-VBBTOTAL',
                    opacity: 0
                }
            ]
        },
        {
            id: 'page6',
            title: '     ',
            image: '',
            legend: '../legendImg_story/c_vbbtotal.png',
            highlightBorder: 'page6',
            description: 'The numbers are even lower than in the most affluent area in the country which is Mansion House B in Dublin City Centre, where only 0.31% of the population state their general health as being bad or very bad.',
            chart: '',
            location: {
                center: [-6.30041, 53.34325],
                zoom: 12.27,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [
                {
                    layer: 'smap-VBBTOTAL',
                    opacity: 1
                }
            ],
            onChapterExit: [
                {
                    layer: 'smap-VBBTOTAL',
                    opacity: 0
                }
            ]
        },
        {
            id: 'page7',
            title: '     ',
            image: '',
            legend: '../legendImg_story/c_vbbtotal.png',
            description: 'Therefore, we can see that despite the general trend of underprivileged areas having greater number of people with bad health there are outliers, which break this rule.',
            chart: '<figure class="highcharts-figure"><div id="container"></div></figure>',
            location: {
                center: [-9.596349, 53.2987839],
                zoom: 6,
                pitch: 0,
                bearing: 0
            },
            onChapterEnter: [
                {
                    layer: 'cmap-VBBTOTAL',
                    opacity: 1
                }
            ],
            onChapterExit: [
                {
                    layer: 'cmap-VBBTOTAL',
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
var highlightShow3 = false;
var highlightShow4 = false;
var highlightShow5 = false;
var highlightShow6 = false;

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
            if (chapter.highlightBorder === 'page3') {
                highlightShow3 = true;
            }else{
                highlightShow3 = false;
            }if (chapter.highlightBorder === 'page4') {
                highlightShow4 = true;
            }else{
                highlightShow4 = false;
            }if (chapter.highlightBorder === 'page5') {
                highlightShow5 = true;
            }else{
                highlightShow5 = false;
            }if (chapter.highlightBorder === 'page6') {
                highlightShow6 = true;
            }else{
                highlightShow6 = false;
            }

            if(highlightShow3 === true){
                map.addLayer(
                    {
                        'id': 'smallArea-highlighted',
                        'type': 'line',
                        'source': 'smallArea',
                        'paint': {
                            "line-color": "rgba(255,0,0,1)",
                            "line-width": 3
                        },
                        'filter': ['in', 'ED_ID', '228033']
                    },
                );
            }
            if(highlightShow4 === true){
                map.addLayer(
                    {
                        'id': 'smallArea-highlighted2',
                        'type': 'line',
                        'source': 'smallArea',
                        'paint': {
                            "line-color": "rgba(255,0,0,1)",
                            "line-width": 3
                        },
                        'filter': ['in', 'ED_ID', '48070']
                    },
                );
            }
            if(highlightShow5 === true){
                map.addLayer(
                    {
                        'id': 'smallArea-highlighted3',
                        'type': 'line',
                        'source': 'smallArea',
                        'paint': {
                            "line-color": "rgba(255,0,0,1)",
                            "line-width": 3
                        },
                        'filter': ['in', 'ED_ID', '77113']
                    },
                );
                map.addLayer(
                    {
                        'id': 'smallArea-highlighted4',
                        'type': 'line',
                        'source': 'smallArea',
                        'paint': {
                            "line-color": "rgba(255,0,0,1)",
                            "line-width": 3
                        },
                        'filter': ['in', 'ED_ID', '67087']
                    },
                );
            }
            if(highlightShow6 === true){
                map.addLayer(
                    {
                        'id': 'smallArea-highlighted5',
                        'type': 'line',
                        'source': 'smallArea',
                        'paint': {
                            "line-color": "rgba(0,0,255,1)",
                            "line-width": 3
                        },
                        'filter': ['in', 'ED_ID', '268097']
                    },
                );
            }
            //console.log(chapter.highlightBorder);
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
Highcharts.chart('container', {
    chart: {
        type: 'line'
    },
    title: {
        text: 'Top 5 Worst & Top 5 Best'
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: ['JOHN\'S A', 'ABBEY D', 'SHORTCOURSE', 'DRUMDOO', 'TRAMORE A', 'CASTLEBANNY', 'GLENCAR', 'LOUGH EASK', 'BRAMBLESTOWN', 'GALWAY RURAL(PT.)']
    },
    yAxis: {
        title: {
            text: ''
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    series: [{
        name: 'HP Score',
        data: [-31.9, -15.9, -14.3, -5.6, 7.8, 8, 11.7, 12.2, 12.6, 18.1]
    }, {
        name: 'Population with Bad or Very Bad General Health(%)',
        data: [6.85, 6.46, 6.98, 6.6, 6.18, 0, 0, 0, 0, 0]
    }]
});

// setup resize event
window.addEventListener('resize', scroller.resize);