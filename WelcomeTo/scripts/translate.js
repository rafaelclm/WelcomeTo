(function(global) {
	$(document).on('pageshow', '#pageLogin', function() {
		var lang = localStorage.getItem('lang');

		if (lang !== null) {
			var opts = {
				forceLang: lang,
				path: "scripts/lang",
				cache: false
			};
            
			$("[data-translate]").jqTranslate('index', opts);
			$('#navbar_lang a').removeClass('ui-btn-active');
			$('#lang_' + lang).addClass('ui-btn-active');
		}

		$('#lang_br').on('click', function () {
			var opts = {
				forceLang: 'br',
				path: "scripts/lang",
				cache: false
			};
			$("[data-translate]").jqTranslate('index', opts);
			localStorage.setItem('lang', 'br');
		});

		$('#lang_en').on('click', function () {
			var opts = {
				forceLang: 'en',
				path: "scripts/lang",
				cache: false
			};
			$("[data-translate]").jqTranslate('index', opts);
			localStorage.setItem('lang', 'en');
		});
	});
	
})(window);