(function (global) {
	var geocoder;
	var map;
	var marker;
	var latitude;
	var longitude;
	var location;
    
	$(document).off('pageshow', '#pageLocation');
    
	$(document).on('pageshow', '#pageLocation', function() {
		navigator.geolocation.getCurrentPosition(initialize);
		
		var sugList = $("#suggestions");
        
		$("#mapAddress").on("input", function() {
			var text = $(this).val();
			if (text === "") {
				sugList.html("");
				sugList.listview("refresh");
			}
			else {
				loadToMap(text);
				
				$.get('https://maps.googleapis.com/maps/api/place/autocomplete/json',
					{
						input:text,
						types: 'geocode',
						location: latitude + ',' + longitude,
						radius: 500,
						sensor: true,
						key: 'AIzaSyD-GtRI3yYF0WIV14Z1ax4AhYgVTy97Ah4'
					}, 
					function(res, code) {
						var str = "";
						for (var i = 0, len = res.predictions.length; i < len; i++) {
							str += '<li><a class="prediction">' + res.predictions[i].description + '</a></li>';
						}
						sugList.html(str);
						sugList.listview("refresh");
						
						$('.prediction').off('click');
						
						$('.prediction').on('click', function() {
							loadToMap($(this).text());
							$("#mapAddress").val($(this).text());
							sugList.html("");
							sugList.listview("refresh");
						});
					}, "json");
			}
		});
        
		$('#btnConfirm').on('click', function() {
			sessionStorage.setItem('location', JSON.stringify(location));
		});
	});
    
	function initialize(position) {
		$.mobile.loading('show');
		var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		var options = {
			zoom: 5,
			center: latlng,
			panControl: false,
			zoomControl: false,
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			animation: google.maps.Animation.DROP
		};
    
		map = new google.maps.Map(document.getElementById("map-canvas"), options);
		geocoder = new google.maps.Geocoder();
		marker = new google.maps.Marker(
			{
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
		
		google.maps.event.addListenerOnce(map, 'idle', function() {
			setTimeout(
				function() {
					$.mobile.loading('hide');	
				}, 5000
				)
		});
	}
    
	function loadToMap(address, latlng) {
		if (address !== undefined) {
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
		else if (latlng !== undefined) {
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