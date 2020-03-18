var map;
let lat = -25.8094;
let long = 28.2564;
// Get the data from Django view

function initMap() {

    var site_name = `Ben's House`;

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
         
        },
        animation: google.maps.Animation.DROP
    });

}

