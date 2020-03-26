state = {
    'sites': null,
    'metric_data': {
        'temperature': null,
        'humidity': null,
        'wind_speed': null,
        'wind_direction': null
    },
    'active_metric': null,
    'current_site': null,
    'chart': null,
    'stats': null
}
metric_words = {
    'temperature'   : 'Temperature',
    'humidity'      : 'Humidity',
    'wind_speed'    : 'Wind Speed',
    'wind_direction': 'Wind Direction'
}
window.addEventListener('DOMContentLoaded', () =>{
    /* fetch('http://localhost:5000/Bens%20House/temperature?start_date=2014-01-01&end_date=2015-01-01') */
    initialSetup();
    // const ch = createChart();
     /* document.querySelector('#theme-toggle').addEventListener('click', (e) => {
         toggleTheme();
    }) */
});

function createToolTipMenus(sites){
    sites_content = `
        <ul class = "dropdown">
          <li class = "dropdown-item"><a onClick = "handleSiteChange(this)" href="#" data-link = "${state['sites'][0]['name']}" class = "site-link dropdown-link">${state['sites'][0]['name']}</a></li>
          <li class = "dropdown-item"><a onClick = "handleSiteChange(this)" href="#" data-link = "${state['sites'][1]['name']}" class = "site-link dropdown-link">${state['sites'][1]['name']}</a></li>
          <li class = "dropdown-item"><a onClick = "handleSiteChange(this)" href="#" data-link = "${state['sites'][2]['name']}" class = "site-link dropdown-link">${state['sites'][2]['name']}</a></li>
          <li class = "dropdown-item"><a onClick = "handleSiteChange(this)" href="#" data-link = "${state['sites'][3]['name']}" class = "site-link dropdown-link">${state['sites'][3]['name']}</a></li>
    `
    tips = []
    tips.push(tippy('#sites', {
        content: sites_content,
        duration: 0,
        placement: 'right',

        interactiveBorder: 20,
        offset: [0, 0],

        interactive: true,
        allowHTML: true
    })[0]);
    tips.push(tippy('#metric-icon', {
        content: `
        <ul class = "dropdown">
        <li class = "dropdown-item"><a href="#" class = "dropdown-link metric-link" data-metric = "temperature" onClick = "handleMetricChange(this)" >Temperature</a></li>
        <li class = "dropdown-item"><a onClick = "handleMetricChange(this)" href="#" class = "dropdown-link metric-link" data-metric = "humidity">Humidity</a></li>
        <li class = "dropdown-item"><a href="#" class = "dropdown-link metric-link" data-metric = "wind_speed" onClick = "handleMetricChange(this)">Wind Speed</a></li>
        <li class = "dropdown-item"><a href="#" class = "metric-link dropdown-link" data-metric="wind_direction" onClick = "handleMetricChange(this)">Wind Direction</a></li>
        </ul>`,
        duration: 0,
        placement: 'right',

        interactiveBorder: 20,
        offset: [0, 0],

        interactive: true,
        allowHTML: true,
      
    })[0]);
    const singleton = tippy.createSingleton(tips, {
        delay: 50,
        allowHTML: true,
        placement: 'right',
        interactive: true,
        interactiveBorder: 35,
        offset: [0, 0]
    });
    const metricLinks = document.querySelectorAll('.metric-link');

}

function toggleTheme(){
    const theme = localStorage.getItem('theme') || 'light';
    if(theme === 'light'){ 
        makeTheme('dark');
        state['chart'].data.datasets[0].borderColor = ['rgb(169, 222, 238)']
        state['chart'].data.datasets[0].backgroundColor = ['rgba(169, 222, 238, 0.5)']
        state['chart'].update();
        localStorage.setItem('theme','dark');
    }else{
        makeTheme('light')
        state['chart'].data.datasets[0].borderColor = ['rgba(50,100,150, .8)']
        state['chart'].data.datasets[0].backgroundColor = ['rgba(124, 178, 233, .2)']
        state['chart'].update();
        localStorage.setItem('theme','light');
    }
}

function makeTheme(theme){
    const body = document.querySelector('.main-flex-container')
    if(theme === 'light'){
        body.classList.remove('dark-theme', 'dark-bg');
        body.classList.add('light-theme', 'light-bg');
    }else{
        body.classList.add('dark-theme', 'dark-bg');
        body.classList.remove('light-theme', 'light-bg');  

    }
    
}

function createChart(metric){
        const ctx = document.querySelector('#chart-area').getContext('2d');
        data = state['metric_data'][metric]

        const ch = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data['date_time'].map(x => convertToDateString(x)),
                datasets: [
                    {
                        label: metric_words[metric],
                        data: data[metric],
                        backgroundColor: [
                            'rgba(124, 178, 233, 0.2)' //Adjust last two digits to adjust opacity of chart background.
                        ],
                        borderColor: [
                            'rgba(50,100,150, .8)'
                        ],
                        borderWidth: 3 //adjust to change thickness of line.
                    }
                ]
            },
            options: {
                elements: {
                    point: {
                        radius: 2,
                        backgroundColor: '#0275d8',
                        pointStyle: 'circle' //Options: 'circle', 'line', 'dash'
                    }
                },
                fill: true,
                title: {
                    display: false,
                    text: 'Metrics'
                },
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    ],
                    xAxes: [{
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 10 //adjust this to change the amount of labels shown on x.
                        }
                    }]
                },
                animation: {
                    duration: 700// general animation time
                },
                hover: {
                    animationDuration: 0 // duration of animations when hovering an item
                },
                responsiveAnimationDuration: 0 // animation duration after a resize
        
            }
        })
        return ch;

}
function initialSetup() {
    
    // fetching list of sites.
    startDateControl = document.querySelector('#start_date');
    endDateControl = document.querySelector('#end_date');
    siteTitle = document.querySelector('.site-title');
    state['start_date'] = '2015-12-24'
    state['end_date'] = '2015-12-31'

    state['current_site'] = 'BENS HOUSE'
    state['active_metric'] = 'temperature'
    siteTitle.textContent = state['current_site'];
    startDateControl.value = state['start_date'];
    endDateControl.value = state['end_date']

    startDateControl.addEventListener('input', (e) => {
        state['start_date'] = startDateControl.value;
        updateChartDateRange();
        updateCardStats();
    })
    endDateControl.addEventListener('input', (e) => {
        state['end_date'] = endDateControl.value;
        updateChartDateRange();
        updateCardStats();
    })
    fetch('http://localhost:5000/sites').then(resp => {
        return resp.json();
    }).then(data => {
        state['sites'] = data;
   
        createToolTipMenus();
        makeMAP('BENS HOUSE', -25.8094, 28.2564); 
    })

    updateCardStats();
    //theme toggle on side nav.
    document.querySelector('#theme-toggle').addEventListener('click', (e) => {
        toggleTheme();
    });

    //fetching metric data for default range( 7 days )


    fetch(`http://localhost:5000/${state['current_site']}/${state['active_metric']}?start_date=${state['start_date']}&end_date=${state['end_date']}`)
    .then(resp => {
        return resp.json();
    }).then(data => {
        state['metric_data'][state['active_metric']] = data;
        state['chart'] = createChart(state['active_metric'])
    })

    //setting up date dropdown.
    document.querySelector('.dropdown-content').addEventListener('click', (e) => {
        if(e.target.classList.contains('date-option')){
            const target = e.target;
            if(target.classList.contains('date-option')){
                if(target.dataset.date === 'custom'){
                    const modalBG = document.querySelector('.bg-modal');
                    modalBG.style.display = 'flex';
                    document.querySelector('.close').addEventListener('click', () => {
                        modalBG.style.display = 'none';
                    })
                }else{
                    const d = new Date(state['end_date'])
                    
                    d.setDate(d.getDate() - Number.parseInt(target.dataset.date))
                    
                    state['start_date'] = `${d.getFullYear()}-${(d.getMonth()+1 > 9 ? '' : '0') + (d.getMonth()+1)}-${(d.getDate()>9?'':'0') + d.getDate()}` ;
                    
                    startDateControl.value = state['start_date']
                    updateCardStats();
                    updateChartDateRange();
                    
                }
            }
        }
    })

}

function updateChartDateRange(){
    fetch(`http://localhost:5000/${state['current_site']}/${state['active_metric']}?start_date=${state['start_date']}&end_date=${state['end_date']}`)
    .then(resp => {
        return resp.json();
    }).then(data => {
        state['metric_data'][state['active_metric']] = data;
        updateChart(data);

    })
}

function handleMetricChange(el){
    state['active_metric'] = el.dataset.metric;
    fetch(`http://localhost:5000/${state['current_site']}/${state['active_metric']}?start_date=${state['start_date']}&end_date=${state['end_date']}`).then(resp => {
        return resp.json();
    }).then(data => {
        updateChart(data);
    })
}

function handleSiteChange(el){
    state['current_site'] = el.dataset.link;
    document.querySelector('.site-title').textContent = state['current_site']
    const s = state['sites'].filter(x => x['name'] === state['current_site'])[0]
  
    makeMAP(state['current_site'], s['latitude'], s['longitude']); 
    fetch(`http://localhost:5000/${state['current_site']}/${state['active_metric']}?start_date=${state['start_date']}&end_date=${state['end_date']}`).then(resp => {
        return resp.json();
    }).then(data => {
        updateChart(data);
    })
}

function updateChart(data){
    const diff = diffBetweenDates(state['end_date'], state['start_date'], true);
    let labels = data['date_time']
    let newData = data[state['active_metric']]
    if(diff > 10){
        const step = Math.floor(diff/4);
        labels = copyArrWithStep(labels, step)
        newData = copyArrWithStep(newData, step)
    }
    state['chart'].data.labels = labels.map(x => convertToDateString(x));
    state['chart'].data.datasets[0].label = metric_words[state['active_metric']];
    state['chart'].data.datasets[0].data = newData;
    state['chart'].update();
}

function makeMAP(site, latitude, longitude) {

    const site_name = site;
    const lat = latitude;
    const long = longitude;
    
    map = new google.maps.Map(document.querySelector('#map'), {
        center: { lat: parseFloat(lat), lng: parseFloat(long) },
        zoom: 10,
        disableDefaultUI: true, //change this to false to bring back UI controls.
        zoomControl: true
    });

    var lat_lng = new google.maps.LatLng(lat, long)
    var marker = new google.maps.Marker({
        position: lat_lng,
        map: map,
        url: 'site/' + site_name,
        title: site_name,
        label: {
            text: site_name,
            color: 'blue',
            fontSize: "20px",
            fontWeight: 'bold'

        }
    });

}

function updateCardStats(){
    fetch(`http://localhost:5000/${state['current_site']}/stats?start_date=${state['start_date']}&end_date=${state['end_date']}`)
    .then(resp => {return resp.json()})
    .then(data => {
        state['stats'] = data;
    
        const metrics = Object.keys(metric_words)
        for(i = 0; i < metrics.length; i++){
            let m = metrics[i]
     
            document.querySelector(`.min-${m}`).innerHTML = `Min: ${data[m]['min']}`
            document.querySelector(`.max-${m}`).innerHTML = `Max: ${data[m]['max']}`;
            document.querySelector(`.avg-${m}`).innerHTML = `Average: ${data[m]['avg']}`
        }
    })
}

function copyArrWithStep(arr, step) {
    newArr = [];
    for (i = 0; i < arr.length; i += step) {
        newArr.push(arr[i])
    }
    return newArr;
} 

function diffBetweenDates(d1, d2, inDays = false) {
    const date1 = new Date(d1)
    const date2 = new Date(d2)
    const diff = date1.getTime() - date2.getTime();
    if (inDays) {
        return diff / (1000 * 3600 * 24);
    }
    return diff;
}
function convertToDateString(x) {
    const d = new Date(x);
    return `${d.getDate()}/${d.getMonth()}/${d.getFullYear().toString().substr(-2)}`;
}