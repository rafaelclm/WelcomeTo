(function (global) {
   
    var geocoder;
    var map;
    var marker;
    var latitude;
    var longitude;
    var location;
    
    $(document).off('pageshow', '#pageLocation');
    
    $(document).on('pageshow', '#pageLocation', function(){
       
        navigator.geolocation.getCurrentPosition(initialize);
        
        $("#mapAddress").keyup(function() {
            if($(this).val() !== ""){
                loadToMap($(this).val());
            }
        });
        
        $('#btnConfirm').on('click', function(){
            sessionStorage.setItem('location', JSON.stringify(location));
        });
       
        
    });
    
    function initialize(position) {
        
        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var options = {
        zoom: 5,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
        };
    
        map = new google.maps.Map(document.getElementById("map-canvas"), options);
        geocoder = new google.maps.Geocoder();
        marker = new google.maps.Marker({
            map: map,
            draggable: true,
            icon: '../images/marker.png'
        });
        
        loadToMap(undefined, latlng);
        
         google.maps.event.addListener(marker, 'drag', function () {
            geocoder.geocode({ 'latLng': marker.getPosition() }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        location = results[0];
                        $('#mapAddress').val(location.formatted_address);
                    }
                }
            });
        });
    }
    
    function loadToMap(address, latlng) {

            if(address !== undefined){
                geocoder.geocode({ 'address': address}, function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            
                            location = results[0];
                            latitude = location.geometry.location.lat();
                            longitude = location.geometry.location.lng();
                            
                            marker.setPosition(new google.maps.LatLng(latitude, longitude));
                            map.setCenter(new google.maps.LatLng(latitude, longitude));
                            map.setZoom(16);
                            
                        }
                    }
                });
            }
        else if(latlng !== undefined){
            geocoder.geocode({ 'location': latlng}, function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            
                            location = results[0];
                            latitude = location.geometry.location.lat();
                            longitude = location.geometry.location.lng();
                            
                            marker.setPosition(new google.maps.LatLng(latitude, longitude));
                            map.setCenter(new google.maps.LatLng(latitude, longitude));
                            map.setZoom(16);
                            
                        }
                    }
                });
        }
        }


})(window);
