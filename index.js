
let sites = null;
window.addEventListener('DOMContentLoaded', () =>{
    createToolTipMenus();
    createChart();
    document.querySelector('#theme-toggle').addEventListener('click', (e) => {
        toggleTheme();
    })
});

function createToolTipMenus(){
    tips = []
    tips.push(tippy('#sites', {
        content: `<ul class = "dropdown"><li class = "dropdown-item"><a href="#" class = "dropdown-link">Ben's House</a></li><li class = "dropdown-item"><a href="#" class = "dropdown-link">Jen's House</a></li><li class = "dropdown-item"><a href="#" class = "dropdown-link">Luke's House</a></li></ul>`,
        duration: 0,
        placement: 'right',

        interactiveBorder: 20,
        offset: [0, 0],

        interactive: true,
        allowHTML: true
    })[0]);
    tips.push(tippy('#metric-icon', {
        content: `<ul class = "dropdown"><li class = "dropdown-item"><a href="#" class = "dropdown-link">Temperature</a></li><li class = "dropdown-item"><a href="#" class = "dropdown-link">Humidity</a></li><li class = "dropdown-item"><a href="#" class = "dropdown-link">Wind Speed</a></li><li class = "dropdown-item"><a href="#" class = "dropdown-link">Wind Direction</a></li></ul>`,
        duration: 0,
        placement: 'right',

        interactiveBorder: 20,
        offset: [0, 0],

        interactive: true,
        allowHTML: true
    })[0]);
    const singleton = tippy.createSingleton(tips, {
        delay: 50,
        allowHTML: true,
        placement: 'right',
        interactive: true,
        interactiveBorder: 35,
        offset: [0, 0]
    });
}

function toggleTheme(){
    const theme = localStorage.getItem('theme') || 'light';
    if(theme === 'light'){ 
        makeTheme('dark');
        localStorage.setItem('theme','dark');
    }else{
        makeTheme('light')
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

function createChart(chartArea){
        const ctx = document.querySelector('#chart-area').getContext('2d');

        const ch = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [`14 Mar '20`, `15 Mar '20`, `16 Mar '20`, `17 Mar '20`,`18 Mar '20`],
                datasets: [
                    {
                        label: 'Temperature',
                        data: [20,23,18,21,26],
                        backgroundColor: [
                            '#0275d809' //Adjust last two digits to adjust opacity of chart background.
                        ],
                        borderColor: [
                            '#0275d8'
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
                        pointStyle: 'rectRot' //Options: 'circle', 'line', 'dash'
                    }
                },
                fill: true,
                title: {
                    display: true,
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
                            maxTicksLimit: 30 //adjust this to change the amount of labels shown on x.
                        }
                    }]
                }
            }
        })
        return ch;
 
}