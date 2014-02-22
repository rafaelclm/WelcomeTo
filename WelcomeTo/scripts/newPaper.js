(function (global) {

    $(document).ready(function () {
        $('.imgLiquidFill').imgLiquid({
            fill: false
        });
    });

    $("#btnTakePic").on("click", function (e) {
        e.preventDefault();
        navigator.camera.getPicture(gotPic, failHandler, {
            quality: 75,
            allowEdit: true,
            targetWidth: 750,
            targetHeight: 750,
            destinationType: navigator.camera.DestinationType.DATA_URL
        });
    });

    $("#btnChooseImage").on("click", function (e) {
        e.preventDefault();
        navigator.camera.getPicture(gotPic, failHandler, {
            quality: 75,
            allowEdit: true,
            targetWidth: 750,
            targetHeight: 750,
            destinationType: navigator.camera.DestinationType.DATA_URL,
            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
        });
    });
    
    function gotPic(imagedata) {
        //
        $('#loadPhoto').popup('close');
        console.log(imagedata);
        $('.imagePaper').attr('src', 'data:image/jpeg;base64,' + imagedata);
        $(".imgLiquidFill").imgLiquid({
            fill: true
        });
    }

    function failHandler(e) {
        alert(e.toString());
    }

})(window);