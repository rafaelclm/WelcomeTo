(function(global) {
	var Comment = Parse.Object.extend('Comment');
	var Paper = Parse.Object.extend('Paper');
	$('#btnSaveComment').on('click', function() {
		var comment = new Comment();	
		var paperId = global.paperId;
		
		$.mobile.loading('show', 
			{
				msgText: 'Salvando o comentário'				 
			})
		
		var query = new Parse.Query(Paper);
		query.get(paperId, 
			{
				success: function(paper) {
					var content = $('#comment').val();
					comment.set('content', content);
					var relUser = comment.relation('user');
					relUser.add(Parse.User.current());
					var relPaper = comment.relation('paper');
					relPaper.add(paper);
					comment.save(null, 
						{
							success: function(comment) {
								paper.set('commentsCount', paper.get('commentsCount') + 1);
								paper.save(null, 
									{
										success: function(paper) {
											$('#commentsCount' + paper.id).text(paper.get('commentsCount') + ' comentários');
											$('#commentOk').popup('open');
											$.mobile.loading('hide');
											setTimeout(function() {
												$('#commentOk').popup('close');
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