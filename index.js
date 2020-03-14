window.addEventListener('DOMContentLoaded', () =>{
    tippy('#sites', {
        content: 'THIS WILL BE A MENU',
        duration: 0,
        placement: 'right',
        intertia: true,
        interactiveBorder: 20,
        offset: [0, 0],
        
        interactive: true,
        allowHTML: true
    });
});
