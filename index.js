window.addEventListener('DOMContentLoaded', () =>{
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
        allowHTML:true, 
        placement:'right', 
        interactive: true,
        interactiveBorder: 35,
        offset: [0,0]
    });
});
