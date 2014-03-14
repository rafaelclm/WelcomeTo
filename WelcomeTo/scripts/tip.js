(function(global) {
	var Tip = Parse.Object.extend('Tip');
	var Paper = Parse.Object.extend('Paper');
	$('#btnSaveTip').on('click', function() {
		var tip = new Tip();	
		var paperId = global.paperId;
		
		$.mobile.loading('show', 
			{
				msgText: 'Salvando a dica'				 
			})
		
		var query = new Parse.Query(Paper);
		query.get(paperId, 
			{
				success: function(paper) {
					var content = $('#tip').val();
					tip.set('content', content);
					var relUser = tip.relation('user');
					relUser.add(Parse.User.current());
					var relPaper = tip.relation('paper');
					relPaper.add(paper);
					tip.save(null, 
						{
							success: function(comment) {
								paper.set('tipsCount', paper.get('tipsCount') + 1);
								paper.save(null, 
									{
										success: function(paper) {
											$('#tipsCount' + paper.id).text(paper.get('tipsCount') + ' dicas');
											$('#tipOk').popup('open');
											$.mobile.loading('hide');
											setTimeout(function() {
												$('#tipOk').popup('close');
											}, 2500);
										},
										error: function(paper, error) {
											alert('Ocorreu um erro: ' + error);
										}
									});
							},
							error: function(comment, error) {
								// Execute any logic that should take place if the save fails.
								// error is a Parse.Error with an error code and description.
								alert('Failed to create new object, with error code: ' + error.description);
							}
						});
				},
				error: function(paper, error) {
					// Execute any logic that should take place if the save fails.
					// error is a Parse.Error with an error code and description.
					alert('Failed to create new object, with error code: ' + error.description);
				}
			});
	});
})(window);