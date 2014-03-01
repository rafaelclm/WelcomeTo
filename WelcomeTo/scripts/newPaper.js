(function (global) {

    var latitude;
    var longitude;
    var location;
    var geocoder = new google.maps.Geocoder();
    var newPaper = {
        content: null,
        checkin: false,
        geopoint: null,
        category: null
    }

    var Paper = Parse.Object.extend('Paper');

    $(document).off('pageshow', '#pageNewPaper');
    $(document).on('pageshow', '#pageNewPaper', function () {

        navigator.geolocation.getCurrentPosition(function (position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
        });

        var opts = {
            forceLang: "br",
            path: "../scripts/lang",
            cache: true
        };

        $("[data-translate]").jqTranslate('newPaper', opts);

        if (sessionStorage.getItem('paper') === null) {
            sessionStorage.setItem('paper', JSON.stringify(newPaper));
        } else {

            newPaper = JSON.parse(sessionStorage.getItem('paper'));

            var imagedata = sessionStorage.getItem('imagedata');
            if (imagedata !== null) {
                $('.imagePaper').attr('src', 'data:image/jpeg;base64,' + imagedata);
                $(".imgLiquidFill").imgLiquid({
                    fill: true
                });
            }

            (newPaper.content === null ? '' : $('#contentPaper').text(newPaper.content));

            setTimeout(function () {
                $("#categoriesPaper option").filter(function () {
                    if ($(this).val() === newPaper.category) {
                        $('#categoriesPaper-button span').html($(this).text());
                    }
                    return $(this).val() === newPaper.category;
                }).prop('selected', true);
            }, 1000);

        }

        location = JSON.parse(sessionStorage.getItem('location'));

        if (location !== null) {
            $('#local').html(location.formatted_address);
            newPaper = JSON.parse(sessionStorage.getItem('paper'));
            newPaper.geopoint = location;
            sessionStorage.setItem('paper', JSON.stringify(newPaper));
            sessionStorage.removeItem('location');
        }

    });

    $("#btnTakePic").on("click", function (e) {
        e.preventDefault();
        navigator.camera.getPicture(gotPic, failHandler, {
            quality: 75,
            allowEdit: true,
            targetWidth: 600,
            targetHeight: 600,
            destinationType: navigator.camera.DestinationType.DATA_URL
        });
    });

    $("#btnChooseImage").on("click", function (e) {
        e.preventDefault();
        navigator.camera.getPicture(gotPic, failHandler, {
            quality: 75,
            allowEdit: true,
            targetWidth: 600,
            targetHeight: 600,
            destinationType: navigator.camera.DestinationType.DATA_URL,
            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
        });
    });

    $('#checkin').change(function () {

        var latLng = new google.maps.LatLng(latitude, longitude);

        if ($('#checkin').prop('checked')) {
            geocoder.geocode({
                'latLng': latLng
            }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        $('#local').html(results[0].formatted_address);
                        newPaper = JSON.parse(sessionStorage.getItem('paper'));
                        newPaper.geopoint = results[0];
                        sessionStorage.setItem('paper', JSON.stringify(newPaper));
                    }
                }
            });
        } else {
            $('#local').html('');
            newPaper = JSON.parse(sessionStorage.getItem('paper'))
            newPaper.location = undefined;
        }

        sessionStorage.setItem('paper', JSON.stringify(newPaper));

    });

    $('#contentPaper').blur(function () {
        newPaper = JSON.parse(sessionStorage.getItem('paper'))
        newPaper.content = $('#contentPaper').val();
        sessionStorage.setItem('paper', JSON.stringify(newPaper));
    });

    $('#categoriesPaper').change(function () {
        newPaper = JSON.parse(sessionStorage.getItem('paper'))
        newPaper.category = $("#categoriesPaper option:selected").val();
        sessionStorage.setItem('paper', JSON.stringify(newPaper));
    });

    $('#btnSavePaper').on('click', function () {

        newPaper = JSON.parse(sessionStorage.getItem('paper'));
        
        if(sessionStorage.getItem('imagedata') === null){
            alert('Você deve inserir uma imagem no seu paper');
            return;
        }
        
         $.mobile.loading('show');

        var parseFile = new Parse.File("imagePaper.jpg", {
            base64: sessionStorage.getItem('imagedata')
        });

        parseFile.save().then(function () {
            //              
            var paper = new Paper();
            paper.set('content', newPaper.content);
            paper.set('image', parseFile);
            paper.set('category', newPaper.category);
		  
            var point = new Parse.GeoPoint({
                latitude: newPaper.geopoint.geometry.location.d,
                longitude: newPaper.geopoint.geometry.location.e
            });
            
            paper.set('location', point);
            
            var city = $.grep(newPaper.geopoint.address_components, function(value, index){

                for(var i = 0; i < value.types.length; i++){
                    if(value.types[i] === 'administrative_area_level_2'){
                        return value;
                    }
                }
               
            });
            
            paper.set('city', city[0].long_name);
            
            var state = $.grep(newPaper.geopoint.address_components, function(value, index){
                for(var i = 0; i < value.types.length; i++){
                    if(value.types[i] === 'administrative_area_level_1'){
                        return value;
                    }
                }
            });
            
            paper.set('state', state[0].long_name);
            
            var country = $.grep(newPaper.geopoint.address_components, function(value, index){
                for(var i = 0; i < value.types.length; i++){
                    if(value.types[i] === 'country'){
                        return value;
                    }
                }
            });
            
            paper.set('country', country[0].long_name);
            
            paper.set('formatted_address', newPaper.geopoint.formatted_address); 
            paper.set('checkin', newPaper.checkin);
            var relation = paper.relation('user');
            relation.add(Parse.User.current());

            paper.save(null, {
                success: function (_paper) {
                    $.mobile.loading('hide');
                    $('#popupOk').popup('open');
                    setTimeout(function () {
                        sessionStorage.removeItem('paper');
                        sessionStorage.removeItem('location');
                        sessionStorage.removeItem('imagedata');
                        $.mobile.changePage('userpage.html');
                    }, 5000);
                },
                error: function (_paper, _error) {
                    alert('Failed to create new object, with error code: ' + _error.description);
                }
            });

        }, function (error) {
            console.log("Error: " + error);
        });

    });

    function gotPic(imagedata) {
        //
        $('#loadPhoto').popup('close');
        $('.imagePaper').attr('src', 'data:image/jpeg;base64,' + imagedata);
        sessionStorage.setItem('imagedata', imagedata);
        $(".imgLiquidFill").imgLiquid({
            fill: true
        });

    }

    function failHandler(e) {
        alert(e.toString());
    }

})(window);