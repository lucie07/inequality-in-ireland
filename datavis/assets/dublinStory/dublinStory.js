//video
let video = document.querySelector('video')
window.addEventListener('scroll', function () {
    let value = 1 + window.scrollY / -600
    video.style.opacity = value
});
//map
var config = {
    style: 'mapbox://styles/zhiweizou/ckd7tkhyd035t1impy6y7827h',
    accessToken: 'pk.eyJ1Ijoiemhpd2Vpem91IiwiYSI6ImNrY2dhcmJwaDBxOHcyeXBiZ3I1bHJhc3gifQ.f3EPTWknNq-nuqNxz33aZw',
    showMarkers: false,
    theme: 'light',
    alignment: 'left',
    title: '',
    subtitle: 'Exploring inequality in the Dublin area, the most affluent county in Ireland',
    byline: '',
    footer: 'END',
    chapters: [
        {
            id: 'page1',
            title: 'The wealthiest county with the highest Deprivation Index of  4.12 is Dublin.',
            image: '',
            legend: '../legendImg_story/c_hp2016.png',
            description: '   ',
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
        },

        {
            id: 'page2',
            title: '    ',
            image: '',
            legend: '../legendImg_story/c_totpop16.png',

            description: 'It is the largest county with a population of 1, 347,359 which accounts for 39.46 % of the country’s total population. It is the largest urban area in Ireland.',
            chart: '<figure class="highcharts-figure"><div id="container"></div></figure><figure class="highcharts-figure"><div id="container2"></div></figure>',
            location: {
                center: [-9.596349, 53.2987839],
                zoom: 6,
                pitch: 0,
                bearing: 0
            },
            onChapterEnter: [
                {
                    layer: 'cmap-TOTPOP16',
                    opacity: 1
                }
            ],
            onChapterExit: [
                {
                    layer: 'cmap-TOTPOP16',
                    opacity: 0
                }
            ]
        },
        {
            id: 'page3',
            title: 'Small Area Within Dublin',
            image: '',
            legend: '../legendImg_story/s_hp2016.png',
            description: 'Despite Dublin County being the wealthiest, when compared to other counties, there is a lot of inequality within this area. About 8.13% of the county’s population live in disadvantaged or very disadvantaged areas and about 27.5% of people live in affluent or very affluent areas. The remaining majority of the population live in areas with Deprivation Index Score marginally above or below the national average. This means that those areas are neither very deprived nor very wealthy.',
            chart: '<figure class="highcharts-figure"><div id="container3"></div></figure>',
            location: {
                center: [-6.46191, 53.34380],
                zoom: 10.05,
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
            id: 'page4',
            title: 'The Wealthiest Area - Mansion House B',
            image: '',
            legend: '../legendImg_story/s_hp2016.png',
            highlightBorder: '268097',
            description: 'The wealthiest area of Dublin County and in Ireland is Mansion House B located within Dublin City Centre. It has a deprivation score of 22.5.',
            chart: '',
            location: {
                center: [-6.30041, 53.34325],
                zoom: 12.27,
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
            id: 'page5',
            title: 'Mansion House B - Unemployment - Male',
            image: '',
            legend: '../legendImg_story/s_unempm16.png',
            description: 'Here, the male and female unemployment rates are one of the lowest in the country. Only 4.5% of men are unemployed.',
            chart: '',
            location: {
                center: [-6.46191, 53.34380],
                zoom: 10.05,
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
            id: 'page6',
            title: 'Mansion House B - Unemployment - Female',
            image: '',
            legend: '../legendImg_story/s_unempf16.png',
            description: 'And only 2.8% of women are unemployed.',
            chart: '',
            location: {
                center: [-6.46191, 53.34380],
                zoom: 10.05,
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
            id: 'page7',
            title: 'Mansion House B - Lone Parent Ratio',
            image: '',
            legend: '../legendImg_story/s_lonepa16.png',
            description: 'The ratio of single parents in this area is also very low. Only 2.3% of the population are single parents and this ratio is one of the lowest in the country. ',
            chart: '',
            location: {
                center: [-6.46191, 53.34380],
                zoom: 10.05,
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
            id: 'page8',
            title: 'Mansion House B - Education',
            image: '',
            legend: '../legendImg_story/s_edhigh16.png',
            description: 'The combination of low unemployment rates and low single parent ratio indicate a good labour market situation.The education levels within this area are high. The map shows that 80.5% of people have higher level education and the pie chart indicates that only 1.2% of people stopped their education at primary level.',
            chart: '<figure class="highcharts-figure"><div id="container4"></div></figure>',
            location: {
                center: [-6.46191, 53.34380],
                zoom: 10.05,
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
            id: 'page9',
            title: 'Mansion House B - Social Status',
            image: '',
            legend: '../legendImg_story/s_hlprof16.png',
            description: 'The social status of this area appears to be higher when compared to other areas within Dublin and the country. It is clear shown in the map that the ratio (44.2%) of highly skilled professional worker is high. Through the pie chart, only 5.1% of the workers are low skilled workers, which is one of the lowest in the country.',
            chart: '<figure class="highcharts-figure"><div id="container5"></div></figure>',
            location: {
                center: [-6.46191, 53.34380],
                zoom: 10.05,
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
            id: 'page10',
            title: 'Mansion House B - Accommodation',
            image: '',
            legend: '../legendImg_story/s_peroom16.png',
            description: 'Another indicator of social class composition is the average number of persons per room which can tell us how densely populated an area is. In Mansion House B this appears to be 1.8 suggesting that on average there are more than one person living per room. This number appears to be greater than in other areas.',
            chart: '<figure class="highcharts-figure"><div id="container6"></div></figure>',
            location: {
                center: [-6.46191, 53.34380],
                zoom: 10.05,
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
            id: 'page11',
            title: 'The Similar Features of Affluent Areas ',
            image: '',
            legend: '../legendImg_story/s_hp2016.png',
            description: 'The demographic profile of an area can tell us more about the population changes in the area. Between 2011 and 2016 the population of the Mansion House B increased by 0.3%. In general, population growth is good for the prosperity of an area.The remaining affluent areas within Dublin County follow similar patterns in terms of unemployment, education levels and housing.',
            chart: '<figure class="highcharts-figure"><div id="container7"></div></figure>',
            location: {
                center: [-6.46191, 53.34380],
                zoom: 10.05,
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
            id: 'page12',
            title: 'The Most Disadvantage Area',
            image: '',
            legend: '../legendImg_story/s_hp2016.png',
            highlightBorder: '268122',
            description: 'The most disadvantaged area in the Dublin area is Priorswood B in the north of Dublin City. It has a Deprivation Index Score of -21.6.',
            chart: '',
            location: {
                center: [-6.23288, 53.39027],
                zoom: 12.00,
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
            id: 'page13',
            title: 'Priorswood B - Unemployment - Male',
            image: '',
            legend: '../legendImg_story/s_unempm16.png',
            description: 'Here, the male and female unemployment rates are significantly high. 38.5% of men  are unemployed.',
            chart: '',
            location: {
                center: [-6.26727, 53.36824],
                zoom: 11.90,
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
            id: 'page14',
            title: 'Priorswood B - Unemployment - Female',
            image: '',
            legend: '../legendImg_story/s_unempf16.png',
            description: '33.8% of women are unemployed.',
            chart: '',
            location: {
                center: [-6.26727, 53.36824],
                zoom: 11.90,
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
            id: 'page15',
            title: 'Priorswood B - Lone Parent Ratio',
            image: '',
            legend: '../legendImg_story/s_lonepa16.png',
            description: 'Single parent ratio in this area is also quite high. About 52.9% of the population in this area are single parents.',
            chart: '',
            location: {
                center: [-6.26727, 53.36824],
                zoom: 11.90,
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
            id: 'page16',
            title: 'Priorswood B - Education',
            image: '',
            legend: '../legendImg_story/s_edhigh16.png',
            description: 'Only 6.1% of the population have higher education and 32.7% of people stopped their education at primary level.',
            chart: '<figure class="highcharts-figure"><div id="container8"></div></figure>',
            location: {
                center: [-6.26727, 53.36824],
                zoom: 11.90,
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
            id: 'page17',
            title: 'Priorswood B - Social Status',
            image: '',
            legend: '../legendImg_story/s_hlprof16.png',
            description: 'The education levels are reflected in the social status and skills of the workers. Only 9% of the workers in this areas are highly skilled professionals and 34.1% of the workers are low skilled.',
            chart: '<figure class="highcharts-figure"><div id="container9"></div></figure>',
            location: {
                center: [-6.26727, 53.36824],
                zoom: 11.90,
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
            id: 'page18',
            title: 'Priorswood B - Accommodation',
            image: '',
            legend: '../legendImg_story/s_peroom16.png',
            description: 'In Priorswood B the average number of persons per room is 0.8. This means that there is more than one room per person in a household. This number is lower than in Mansion House B. Local Authority rented housing is much more common than in the affluent areas. Only 7.4% of the population in this area live in private rented accommodation and45.5% is Local Authority rented housing. This highlights the poverty issues and the need for government support in this area.',
            chart: '<figure class="highcharts-figure"><div id="container10"></div></figure>',
            location: {
                center: [-6.26727, 53.36824],
                zoom: 11.90,
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
            id: 'page19',
            title: 'The Similar Features of Disadvantage Areas ',
            image: '',
            legend: '../legendImg_story/s_hp2016.png',
            description: 'The demographic profile of this area shows no changes in population between 2011 and 2016 and the age dependency ratio is at 36.6% meaning that the majority is the working age population.',
            chart: '<figure class="highcharts-figure"><div id="container11"></div></figure>',
            location: {
                center: [-6.46191, 53.34380],
                zoom: 10.05,
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
            id: 'page20',
            title: 'The Wealth Gap within Dublin',
            image: '',
            legend: '../legendImg_story/s_hp2016.png',
            description: 'As in the case of affluent areas the pattern of high unemployment rates and low education levels repeats in other disadvantaged areas of Dublin County. The examples of the two extremes Mansion House B, very affluent, and Priorswood B, very disadvantaged, show the wealth gaps within Dublin City and the greater Dublin area. ',
            chart: '<figure class="highcharts-figure"><div id="container12"></div></figure>',
            location: {
                center: [-6.46191, 53.34380],
                zoom: 10.05,
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
            'filter': ['in', 'COUNTY', 'DUBLIN']
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
            if (chapter.highlightBorder === '268097') {
                highlightShow1 = true;
            }else{
                highlightShow1 = false;
            }
            if(highlightShow1 === true){
                map.addLayer(
                    {
                        'id': 'smallArea-highlighted',
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
            if (chapter.highlightBorder === '268122') {
              highlightShow2 = true;
            }else{
                highlightShow2 = false;
            }
            if(highlightShow2 === true){
                map.addLayer(
                    {
                        'id': 'smallArea-highlighted2',
                        'type': 'line',
                        'source': 'smallArea',
                        'paint': {
                            "line-color": "rgba(255,0,0,1)",
                            "line-width": 3
                        },
                        'filter': ['in', 'ED_ID', '268122']
                    },
                );
            }
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

//bar highchart page1
Highcharts.chart('container', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'County\'s Total Population in 2016'
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: 0,
            style: {
                fontSize: '11px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Population in 2016: <b>{point.y:.1f}</b>'
    },
    series: [{
        name: 'Population',
        data: [
            ['DUBLIN', 1347359],
            ['CORK', 417211],
            ['KILDARE', 222504],
            ['MEATH', 195044],
            ['GALWAY', 179390],
            ['DONEGAL', 159192],
            ['WEXFORD', 149722],
            ['KERRY', 147707],
            ['WICKLOW', 142425],
            ['LIMERICK', 136640],
            ['MAYO', 130507],
            ['LOUTH', 128884],
            ['CLARE', 118817],
            ['KILKENNY', 99232],
            ['WESTMEATH', 88770],
            ['LAOIS', 84697],
            ['TIPPERARY', 79776],
            ['OFFALY', 77961],
            ['CAVAN', 76176],
            ['WATERFORD', 67960],
            ['SLIGO', 65535],
            ['ROSCOMMON', 64544],
            ['MONAGHAN', 61386],
            ['CARLOW', 56932],
            ['LONGFORD', 40873],
            ['LEITRIM', 32044]
        ],
        dataLabels: {
            enabled: true,
            rotation: 0,
            color: '#FFFFFF',
            align: 'right',
            format: '', // one decimal
            y: 0, // 10 pixels down from the top
            style: {
                fontSize: '11px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
});
//bar highchart page1
//pie page2
Highcharts.chart('container2', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false
    },
    title: {
        text: '',
        align: 'center',
        verticalAlign: 'middle',
        y: 0
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
                distance: 50,
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
        name: 'Population Ratio',
        innerSize: '50%',
        data: [
            ['DUBLIN', 1347359],
            ['CORK', 417211],
            ['KILDARE', 222504],
            ['MEATH', 195044],
            ['GALWAY', 179390],
            ['DONEGAL', 159192],
            ['WEXFORD', 149722],
            ['KERRY', 147707],
            ['WICKLOW', 142425],
            ['LIMERICK', 136640],
            ['MAYO', 130507],
            ['LOUTH', 128884],
            ['CLARE', 118817],
            ['KILKENNY', 99232],
            ['WESTMEATH', 88770],
            ['LAOIS', 84697],
            ['TIPPERARY', 79776],
            ['OFFALY', 77961],
            ['CAVAN', 76176],
            ['WATERFORD', 67960],
            ['SLIGO', 65535],
            ['ROSCOMMON', 64544],
            ['MONAGHAN', 61386],
            ['CARLOW', 56932],
            ['LONGFORD', 40873],
            ['LEITRIM', 32044]

            // {
            //     name: 'Other',
            //
            //     y:'',
            //     dataLabels: {
            //         enabled: false
            //     }
            // }
        ]
    }]
});
//pie page2
//single bar page3
Highcharts.chart('container3', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Co.Dublin Deprevation Index Score Range, 2016'
    },
    xAxis: {
        categories: ['']
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Number of small area'
        }
    },
    legend: {
        reversed: true
    },
    plotOptions: {
        series: {
            stacking: 'normal'
        }
    },
    series: [{
        name: 'very affluent',
        data: [1]
    }, {
        name: 'affluent',
        data: [92]
    }, {
        name: 'marginally above average',
        data: [125]
    }, {
        name: 'marginally below average',
        data: [72]
    }, {
        name: 'disatvantaged',
        data: [30]
    }, {
        name: 'very disatvantaged',
        data: [2]
    }]
});
//single bar page3
//edu pie page8
Highcharts.chart('container4', {
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
            ['higher level education', 80.5],
            ['stopped at ' + '\<br>'+
            'primary level', 1.2],

            {
                name: 'Other',
                y: 18.3,
                dataLabels: {
                    enabled: true
                }
            }
        ]
    }]
});
//edu pie page8
//skill pie page9
Highcharts.chart('container5', {
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
            ['High Skilled Labour', 44.2],
            ['Low Skilled Labour', 5.1],

            {
                name: 'Other',
                y: 50.7,
                dataLabels: {
                    enabled: true
                }
            }
        ]
    }]
});
//skill pie page9
//room pie page10
Highcharts.chart('container6', {
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
            ['Private Rented Accommodation', 73],
            ['Local Authority Rented Accommodation', 4.6],

            {
                name: 'Other',
                y: 22.4,
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
Highcharts.chart('container7', {

    chart: {
        type: 'heatmap',
        marginTop: 60,
        marginBottom: 80,
        plotBorderWidth: 1
    },


    title: {
        text: 'Five Factors Index (%)' +'\<br>' +'- Top 5 Affluent Areas winthin Dublin'
    },

    xAxis: {
        categories: ['MANSION' +'\<br>' +'HOUSE B', 'PEMBROKE' +'\<br>' +'WEST C', 'USHERS A', 'CLONSKEAGH' +'\<br>' +'-MILLTOWN', 'RATHMINES' +'\<br>' +'EAST B']
    },
    yAxis: {
        categories: ['Population' +'\<br>' +'Change', 'Unemployment' +'\<br>' +
        '- Male', 'Unemployment' +'\<br>' +
        ' - Female', 'Education' +'\<br>' +
        '- Primary only', 'Persons' +'\<br>' +'per Room'],
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
        name: 'top5Dublin',
        borderWidth: 1,
        data: [[0, 0, 0.3], [0, 1, 4.5], [0, 2, 2.8], [0, 3, 1.2], [0, 4, 1.8], [1, 0, 0.2], [1, 1, 4.7], [1, 2, 5.7], [1, 3, 1.6], [1, 4, 0.9], [2, 0, 0.7], [2, 1, 10.2], [2, 2, 7.8], [2, 3, 4.8], [2, 4, 0.8], [3, 0, 0], [3, 1, 3.2], [3, 2, 4.5], [3, 3, 0.8], [3, 4, 0.4], [4, 0, 0.1], [4, 1, 4.3], [4, 2, 4.8], [4, 3, 3.6], [4, 4, 0.6]],
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
//edu pie page16
Highcharts.chart('container8', {
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
            ['higher level ' +'\<br>'+
            'education', 6.1],
            ['stopped at ' +'\<br>'+
            'primary level', 32.7],

            {
                name: 'Other',
                y: 61.2,
                dataLabels: {
                    enabled: true
                }
            }
        ]
    }]
});
//edu pie page16
//skill pie page17
Highcharts.chart('container9', {
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
            ['High Skilled ' +'\<br>'+
            'Labour', 9],
            ['Low Skilled Labour', 34.1],

            {
                name: 'Other',
                y:56.9,
                dataLabels: {
                    enabled: true
                }
            }
        ]
    }]
});
//skill pie page17
//room pie page18
Highcharts.chart('container10', {
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
            ['Private Rented Accommodation', 7.4],
            ['Local Authority Rented Accommodation', 45.5],

            {
                name: 'Other',
                y: 47.1,
                dataLabels: {
                    enabled: true
                }
            }
        ]
    }]
});
//room pie page18
//heatmap page19
Highcharts.chart('container11', {

    chart: {
        type: 'heatmap',
        marginTop: 60,
        marginBottom: 80,
        plotBorderWidth: 1
    },


    title: {
        text: 'Five Factors Index (%) ' +'\<br>' +'- Top 5 Disadvantage Areas winthin Dublin'
    },

    xAxis: {
        categories: ['PRIORSWOOD'+'\<br>' +'B', 'FINGLAS' +'\<br>' +'SOUTH C', 'TALLAGHT'+'\<br>' +'-KILLINARDAN', 'KILMORE C', 'TALLAGHT' +'\<br>' +'-AVONBEG']
    },
    yAxis: {
        categories: ['Population' +'\<br>' +'Change', 'Unemployment' +'\<br>' +
        '- Male', 'Unemployment' +'\<br>' +
        ' - Female', 'Education' +'\<br>' +
        '- Primary only', 'Persons' +'\<br>' +'per Room'],
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
        name: 'worst5Dublin',
        borderWidth: 1,
        data: [[0, 0, 0], [0, 1, 38.5], [0, 2, 33.8], [0, 3, 6.1], [0, 4, 0.8], [1, 0, 0.1], [1, 1, 32.3], [1, 2, 25.3], [1, 3, 7.1], [1, 4, 0.6], [2, 0, 0], [2, 1, 35], [2, 2, 30.6], [2, 3, 7.6], [2, 4, 0.7], [3, 0, 0.1], [3, 1, 31.5], [3, 2, 28.5], [3, 3, 7.7], [3, 4, 0.6], [4, 0, 0], [4, 1, 25.7], [4, 2, 18.5], [4, 3, 9.7], [4, 4, 0.6]],
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
//heatmap page19
//heatmap page20
Highcharts.chart('container12', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Five Factors Index (%) - The Best and the Worst'
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: ['Population Change', 'Unemployment - Male', 'Unemployment - Female', 'Education -Primary Only', 'Persons per Room'],
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Ratio (%)',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    tooltip: {
        valueSuffix: ' millions'
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'MANSION HOUSE B',
        data: [0.3, 4.5, 2.8, 80.5, 1.8]
    }, {
        name: 'PRIORSWOOD B',
        data: [0, 38.5, 33.8, 6.1, 0.8]
    }]
});
//heatmap page20
// setup resize event
window.addEventListener('resize', scroller.resize);