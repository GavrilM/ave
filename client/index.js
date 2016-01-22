$(window).load(function() {
  var myLatLng = {
    lat: 32.689810,
    lng: -117.202159
  };
  var map = new google.maps.Map(document.getElementById('googleMap'), {
    zoom: 12,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Here we are!'
  });
});


