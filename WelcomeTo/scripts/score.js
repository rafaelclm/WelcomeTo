(function(global) {
	$('#btnSaveScore').on('click', function() {
		var paperId = global.paperId;
		var Paper = Parse.Object.extend('Paper');
		var query = new Parse.Query(Paper);
		query.get(paperId, 
			{
				success: function(paper) {
					var ratings = paper.get('ratings');
					ratings++;
					var newScore = global.score + paper.get('score');
					console.log(global.score);
					console.log(newScore);
					paper.set('score', newScore);
					paper.set('ratings', ratings);
					paper.save(null, 
						{
							success: function(paper) {
								var $score = $('#score' + paper.id);
								$score.attr('data-score', paper.get('score') / ratings);
								var $ratings = $('#ratings' + paper.id);
								$ratings.text(ratings + ' votos');
								$score.raty(
									{
										path     : '../scripts/plugins/img',
										cancel   : true,
										half     : true,
										score: function() {
											return $(this).attr('data-score');
										},
										readOnly : true,
										size     : 24
									});
							},
							error: function(paper, error) {
								// Execute any logic that should take place if the save fails.
								// error is a Parse.Error with an error code and description.
								alert('Failed to create new object, with error code: ' + error.description);
							}
						});
				},
				error: function(object, error) {
					// The object was not retrieved successfully.
					// error is a Parse.Error with an error code and description.
				}
				
			});
	});
})(window);