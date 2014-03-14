(function(global) {
	var Paper = Parse.Object.extend("Paper");
	var Comment = Parse.Object.extend("Comment");
	var skipComment = 0;
	$('#viewPaper').off('panelbeforeopen');
	$('#viewPaper').on('panelbeforeopen', function(event, ui) {
		$('#contentViewPaper').html('');
		var query = new Parse.Query(Paper);
		query.get(global.paperId, 
			{
				success: function(paper) {
					var $imageContainer = $('<div></div>');
					var $img = $('<img/>');
					$img.attr('src', paper.get('image').url());
					$imageContainer.append($img);
					$imageContainer.attr('class', 'imgLiquidFill imgLiquid');
					$imageContainer.attr('style', 'width: 100%;');
					$imageContainer.attr('id', 'viewImagePaper');
					
					var $wrapResults = $('<div class="ui-grid-a"></div>');
					
					var $commentsCount = $('<div class="ui-block-a" style="width: 60%"></div>');
					$commentsCount.attr('id', 'view_CommentsCount' + paper.id);
					$commentsCount.text(paper.get('commentsCount') + ' comentários de pessoas');
					$wrapResults.append($commentsCount);
					
					var $ratings = $('<div class="ui-block-b" style="width: 40%"></div>');
					$ratings.attr('id', 'view_Ratings' + paper.id);
					$ratings.text(paper.get('ratings') + ' pessoas votaram');
					$ratings.append($ratings);
					
					$wrapResults.append($ratings);
					
					var $score = $('<div style="height: 30px; padding-top: 10px;"></div>');
					$score.attr('data-score', (paper.get('score') / paper.get('ratings')));
					$score.attr('class', 'score');
					$score.attr('id', 'view_Score' + paper.id);
                    
					var $local = $('<div></div>');
					$local.text('Local: ' + paper.get('formatted_address'));

					var $content = $('<p></p>');
					$content.text(paper.get('content'));
					
					var relation = paper.relation('user');
						
					var $body = $('<div></div>');
					console.log(paper.id);
					$body.append(layoutUser(paper.id));
					$body.append($imageContainer);
					$body.append($wrapResults);
					$body.append($score);
					$body.append($local);
					$body.append($content);
					$('#contentViewPaper').html($body);
					
					setTimeout(function() {
						var height = $('#viewImagePaper').outerWidth() * 0.90;
						$('#viewImagePaper').height(height);
						$('#viewImagePaper').imgLiquid(
							{
								fill: true,
								onFinish: function () {
									$('#view_Score' + paper.id).raty(
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
								}
							});
						
						var query = new Parse.Query(Comment);
						query.equalTo("paper", paper);
						query.skip(skipComment);
						query.limit(10);
						query.find(
							{
								success: function(comments) {
									
									var $boxComments = $('<div class="ui-corner-all custom-corners ui-shadow"/>');
									$boxComments.append('<div class="ui-bar ui-bar-a"><h3>Comentários das Pessoas</h3></div>');
									
									var $listComments = $('<ul data-role="listview"></ul>');

									for (var i = 0; i < comments.length; i ++) {
										var $li = $('<li/>');
										var comment = comments[i].get('content');
										$li.append('<p>' + comment + '</p>');
										var createdAt = $.format.date(comments[i].createdAt, "dd/MM/yyyy HH:mm")
										$li.append('<p style="text-align: right; font-size: 10px;">Adicionado em ' + createdAt + '</p>');
										$li.append(layoutUser(comment.id)); 
										$listComments.append($li);
									}
									
									$listComments.listview();
									var $contentComments = $('<div class="ui-body ui-body-a"/>');
									$boxComments.append($contentComments.append($listComments));
									$body.append($boxComments);
								}
							});
						
						loadUserTo(relation);
					}, 1000);
				},
				error: function(paper, error) {
					// The object was not retrieved successfully.
					// error is a Parse.Error with an error code and description.
				}
			});
		
		function layoutUser(objectId) {
			var $user = $('<div></div>');
			$user.attr('id', 'object_User' + objectId);
  					
			var $wrapUser = $('<a href="#" class="ui-btn ui-btn-mini ui-corner-top"></a>');  
			$wrapUser.attr('style', 'padding: 2px; text-align: left; margin: 0; border: none;');
                      
			var $divPhoto = $('<div style="width: 39px; height: 39px; float: left;"></div>');
			$divPhoto.attr('class', 'imgLiquidFill imgLiquid imageUser ui-shadow');  
			var $imageUser = $('<img/>');
			$imageUser.attr('id', 'object_ImageUser_' + objectId);               
			$divPhoto.append($imageUser);
			$user.append($divPhoto);
                      
			var $divProfile = $('<div style="margin-left: 10px; float: left;"></div>');
			var $firstname = $('<div></div>');
			$firstname.attr('id', 'object_UserDisplayname_' + objectId);                    
			$divProfile.append($firstname);
                      
			var $livesIn = $('<div style="font-weight: normal"></div>');
			$livesIn.attr('id', 'object_UserLivesIn_' + objectId);
			$divProfile.append($livesIn);
                      
			$user.append($divProfile);  
			$wrapUser.append($user);
			
			console.log($wrapUser);
			
			return $wrapUser;
		}
	});
	
	$('.btnViewPaper').off('click');
	$('.btnViewPaper').on('click', function() {
		global.paperId = $(this).parent().parent().attr('id');
		$('#viewPaper').panel('open');
	});
	
	function loadUserTo(relation) {
		relation.query().find().then(function(user) {
			var relProfile = user[0].relation('profile');
			$('#object_UserDisplayname_' + relation.parent.id)
				.text('Por ' + user[0].get('firstname') + ' ' + user[0].get('lastname'));

			relProfile.query().find(
				{
					success: function (profile) {
						if (profile[0].get('photo') === undefined) {
							$('#object_ImageUser_' + relation.parent.id).attr('src', '../images/user.png');
						}
						else {
							$('#object_ImageUser_' + relation.parent.id).attr('src', profile[0].get('photo').url());
						}
                        
						$('#object_ImageUser_' + relation.parent.id).parent().imgLiquid(
							{
								fill: true
							});
                                
						$('#object_UserLivesIn_' + relation.parent.id).text('de ' + profile[0].get('livesIn'));
					}
				});
		});
	};

})(window);