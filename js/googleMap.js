(function() {
  "use strict";

  function initialize() {
    var mapCanvas = document.getElementById('map'),
        myCenter = new google.maps.LatLng(28.6069724, 77.2794167),
        zoomIn = document.getElementById('zoomIn'),
        zoomOut = document.getElementById('zoomOut'),
        content = document.getElementById('content');

    var mapOptions = {
      center: new google.maps.LatLng(28.6069724, 77.2794167),
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: false,
      streetViewControl: false,
      mapTypeControl: false,
      zoomControl: false
    };

    var map = new google.maps.Map(mapCanvas, mapOptions);

    // Create the search box and link it to the UI element.
    var pacInput = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(pacInput);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // [START region_getplaces]
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if(places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: map,
          icon: 'images/marker.png',
          title: place.name,
          position: place.geometry.location
        }));

        if(place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });

    var go = document.getElementById('go');
    if(navigator.geolocation) {
      var browserSupportFlag = true;
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        google.maps.event.addDomListener(go, 'click', function() {
          pacInput.value = '';
          map.setCenter(pos);
          map.setZoom(16);
          markers.push(new google.maps.Marker({
            map: map,
            icon: 'images/marker.png',
            position: pos
          }));
        })
      }, function() {
        handleNoGeolocation(browserSupportFlag);
      });
    }
    // Browser doesn't support Geolocation
    else {
      browserSupportFlag = false;
      handleNoGeolocation(browserSupportFlag);
    }

    function createMarker(position) {
      return marker = new google.maps.Marker({
        position: position,
        icon: 'images/marker.png'
      });
    }

    var marker = createMarker(myCenter);

    var contentString = '<div id="content">' +
        '<img src="images/info-image.png" alt="info">' +
        '<h1 id="firstHeading" class="firstHeading">Act Big! Ultimate Music Festival</h1></h1>' +
        '<div id="bodyContent">' +
        '<h3>Pattichion Municipal Amphitheater</h3>' +
        '<p>Nikolaou G. Dimitriou Street , Larnaca, 6031, Cyprus</p>' +
        '</div>' +
        '</div>';


    var infoWindow = new google.maps.InfoWindow({
      content: contentString,
      pixelOffset: new google.maps.Size(-115, 0)
    });


    google.maps.event.addListener(infoWindow, 'domready', function() {
          var iwOuter = document.querySelector('.gm-style-iw');

          iwOuter.firstElementChild.style.overflow = 'visible';
          iwOuter.firstElementChild.firstElementChild.style.overflow = 'visible';
          iwOuter.nextSibling.children[0].src = 'images/info-close.png';
          iwOuter.nextSibling.children[0].style.top = '0';
          iwOuter.nextSibling.children[0].style.left = '0';
          iwOuter.nextSibling.children[0].style.padding = '8px';
          iwOuter.nextSibling.children[0].style.width = '26px';
          iwOuter.nextSibling.children[0].style.height = '26px';
          iwOuter.nextSibling.children[0].style.zIndex = '7777';
          iwOuter.nextSibling.className = 'wrap-close';
          iwOuter.nextSibling.style.right = '47px';
          iwOuter.nextSibling.style.top = '17px';
          iwOuter.nextSibling.style.width = '26px';
          iwOuter.nextSibling.style.height = '26px';
          iwOuter.nextSibling.style.color = '#fff';

          var iwBackground = iwOuter.previousSibling;

          iwOuter.className = 'iwOuter';
          iwBackground.children[2].style.display = 'none';

          // Remove the background shadow DIV
          for(var i = 1; i < iwBackground.children.length; i = i + 2) {
            iwBackground.children[i].style.display = "none";
          }

          // Remove the white background DIV
          for(var j = 0; j < iwBackground.children.length; j = j + 4) {
            iwBackground.children[j].style.display = "none";
          }
        }
    );

    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.open(map, marker);
    });

    google.maps.event.addDomListener(zoomIn, 'click', function() {
      map.setZoom(map.getZoom() + 1);
    });

    google.maps.event.addDomListener(zoomOut, 'click', function() {
      map.setZoom(map.getZoom() - 1);
    });

    marker.setMap(map);
  }

  function handleLocationError(browserHasGeolocation, infoWindowGeo, pos) {
    infoWindowGeo.setPosition(pos);
    infoWindowGeo.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
  }

  google.maps.event.addDomListener(window, 'load', initialize);

})();