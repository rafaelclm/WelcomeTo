(function (global) {
	/*----------*/
	var currentUser = Parse.User.current();

	$(document).off('pageshow', '#pageProfile');

	loadEvents();

	$(document).on('pageshow', '#pageProfile', function () {
		/*-----------*/
		var relation = currentUser.relation('profile');

		relation.query().find({
								  success: function (object) {
									  loadProfile(object[0]);
								  }
			});
	});

	function gotPic(imagedata) {
		//
		$('#loadPhoto').popup('close');
		$('.imageProfile').attr('src', '../images/banner_loading.gif');
		
		$(".imgLiquidFill").imgLiquid(
			{
				fill: true
			});
		var parseFile = new Parse.File("imageProfile.jpg", 
			{
				base64: imagedata
			});

		parseFile.save().then(function () {
			// 
			var relation = currentUser.relation('profile');

			relation.query().find(
				{
					success: function (object) {
						console.log(object);
						object[0].set('photo', parseFile);
						object[0].save();
						loadProfile(object[0]);
					}
				});
		}, function (error) {
			console.log("Error: " + error);
		});
	}

	function failHandler(e) {
		alert(e.toString());
	}

	function loadEvents() {
		$("#btnTakePic").on("click", function (e) {
			e.preventDefault();
			navigator.camera.getPicture(gotPic, failHandler, 
				{
					quality: 75,
					allowEdit: true,
					targetWidth: 750,
					targetHeight: 750,
					destinationType: navigator.camera.DestinationType.DATA_URL
				});
		});

		$("#btnChooseImage").on("click", function (e) {
			e.preventDefault();
			navigator.camera.getPicture(gotPic, failHandler, 
				{
					quality: 75,
					allowEdit: true,
					targetWidth: 750,
					targetHeight: 750,
					destinationType: navigator.camera.DestinationType.DATA_URL,
					sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
				});
		});
	}

	function loadProfile(profile) {
		/*-------------*/
		$('.displayName').html(currentUser.get('firstname') + ' ' + currentUser.get('lastname'));
		$('#livesIn').html(profile.get('livesIn'));
		$('#birthplace').html(profile.get('birthplace'));
		$('#work').html(profile.get('work'));
		$('#studiesIn').html(profile.get('studiesIn'));

		var languages = '<ul>';
		$.each(profile.get('languages'), function (index, language) {
			languages = languages + '<li data-translate="' + language + '"></li>';
		});

		languages += '</ul>';
		$('#languages').html(languages);

		var graduations = '<ul>';
		$.each(profile.get('graduations'), function (index, graduation) {
			graduations = graduations + '<li>' + graduation + '</li>';
		});

		$('#graduations').html(graduations + '</ul>');

		var traveling = '<ul>';
		$.each(profile.get('traveling'), function (index, travel) {
			traveling = traveling + '<li>' + travel + '</li>';
		});

		$('#traveling').html(traveling + '</ul>');

		if (profile.get('photo') === undefined) {
			$('.imageProfile').attr('src', 'images/user_128.png');
		}
		else {
			$('.imageProfile').attr('src', profile.get('photo').url() + '?' + new Date().getTime());
		}

		$(".imgLiquidFill").imgLiquid({fill: true});

		var lang = localStorage.getItem('lang');

		if (lang === null) {
			lang = 'br';
		}

		var opts = {
			forceLang: lang,
			path: "../scripts/lang",
			cache: false
		};
		$("[data-translate]").jqTranslate('profile', opts);
	}
})(window);