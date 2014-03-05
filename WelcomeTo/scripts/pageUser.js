(function (global) {
	//Event pageshow for page pageuser
	var currentUser = Parse.User.current();
	var lazypage = 1;
	var Paper = Parse.Object.extend("Paper");
	var skip;

	$(document).off('pageshow', '#pageUser');
	$(document).on('pageshow', '#pageUser', function () {
		skip = 0;

		loadSwipeEvent();
		loadItems();
		loadMoreItems();

		var relation = currentUser.relation('profile');

		relation.query().find(
			{
				success: function (profile) {
					if (profile[0].get('photo') === undefined) {
						$('.imageProfile').attr('src', 'images/user.png');
					}
					else {
						$('.imageProfile').attr('src', profile[0].get('photo').url() + '?' + new Date().getTime());
					}

					$(".imageProfileContainer").imgLiquid({fill: true});
				}
			});
		
		$('.displayName').html(currentUser.get('firstname') + ' ' + currentUser.get('lastname'));
		
		$('#score').raty(
			{
				path     : '../scripts/plugins/img',
				cancel   : true,
				half     : true,
				size     : 24,
				click:
				function(score, evt) {
					global.score = score;
				}
			});
		
		$('#sticker').sticky({topSpacing:0});
		
		$('#btnSaveTip').on('click', function() {
		});
	});

	function loadSwipeEvent() {
		$(document).off('swiperight swipeleft', '#pageUser');
		$(document).on('swiperight swipeleft', '#pageUser', function (e) {
			if ($('.ui-page-active').jqmData('panel') !== 'open') {
				if (e.type === "swipeleft") {
					$("#panelUser").panel("open");
				}
				else if (e.type === "swiperight") {
					$("#panelMenu").panel("open");
				}
			}
		});
	};

	function loadItems() {
		$('#container').masonry(
			{
				columnWidth: 300,
				itemSelector: '.item',
				isFitWidth: true
			});

		searchItems();
	}
   
	function loadMoreItems() {
		$(window).on('scroll', function (e) {
			if (($(window).scrollTop() + $(window).height()) >= ($(document).height() - 200)) {
				lazypage += 1;
				searchItems()
			}
		});
	}

	function searchItems() {
		var query = new Parse.Query(Paper);
		var relations = [];

		query.skip(skip);
		query.limit(10);
		query.descending('updatedAt');
		skip += 10;

		query.find().then(function (papers) {
			if (papers.length > 0) {
				$.mobile.loading('show', 
					{
						theme: "b",
						textVisible: true
					});
                
				var items = [];

				for (var i = 0; i < papers.length; i++) {
					var paper = papers[i];
					var $item = $('<div></div>');
					$item.attr('class', 'item ui-shadow');
					$item.attr('id', paper.id);	
					$item.attr('style', 'background: whitesmoke');
					
					var $user = $('<div></div>');
					$user.attr('id', 'user' + paper.id);
                    
					var $wrapUser = $('<a href="#" class="ui-btn ui-btn-mini ui-corner-top"></a>');  
					$wrapUser.attr('style', 'padding: 2px; text-align: left; margin: 0; border: none;');
                    
					var $divPhoto = $('<div style="width: 39px; height: 39px; float: left;"></div>');
					$divPhoto.attr('class', 'imgLiquidFill imgLiquid imageUser ui-shadow');  
					var $imageUser = $('<img/>');
					$imageUser.attr('id', 'imageUser_' + paper.id);               
					$divPhoto.append($imageUser);
					$user.append($divPhoto);
                    
					var $divProfile = $('<div style="width: 225px; float: right;"></div>');
					var $firstname = $('<div></div>');
					$firstname.attr('id', 'userDisplayname_' + paper.id);                    
					$divProfile.append($firstname);
                    
					var $livesIn = $('<div style="font-weight: normal"></div>');
					$livesIn.attr('id', 'userLivesIn_' + paper.id);
					$divProfile.append($livesIn);
                    
					$user.append($divProfile);  
					$wrapUser.append($user); 
					
					var $body = $('<div></div>');
					$body.attr('class', 'ui-body ui-body-a ui-corner-all ui-shadow');
					$body.attr('style', 'border: none');
                   
					var $imageContainer = $('<div></div>');
					var $img = $('<img class="imgLiquidFill imgLiquid"/>');
					$img.attr('width', '100%');
					$imageContainer.append($img);
					$imageContainer.attr('data-original', paper.get('image').url());
					$imageContainer.attr('class', 'ui-corner-all imgLiquidFill imgLiquid lazy' + lazypage);
					$imageContainer.attr('style', 'width: 100%; height: 250px;');
					$body.append($imageContainer);
					
					var $wrapResults = $('<div class="ui-grid-b"></div>');
					
					var $commentsCount = $('<div class="ui-block-a" style="width: 40%"></div>');
					$commentsCount.attr('id', 'commentsCount' + paper.id);
					$commentsCount.text(paper.get('commentsCount') + ' comentários');
					$wrapResults.append($commentsCount);
					
					var $tipsCount = $('<div class="ui-block-b" style="width: 30%"></div>');
					$tipsCount.attr('id', 'tipsCount' + paper.id);
					$tipsCount.text(paper.get('tipsCount') + ' dicas');
					$wrapResults.append($tipsCount);
					
					var $ratings = $('<div class="ui-block-c" style="width: 30%"></div>');
					$ratings.attr('id', 'ratings' + paper.id);
					$ratings.text(paper.get('ratings') + ' votos');
					$ratings.append($ratings);
					
					$wrapResults.append($ratings);
					
					$body.append($wrapResults);
					
					var $score = $('<div style="height: 30px; padding-top: 10px;"></div>');
					$score.attr('data-score', (paper.get('score') / paper.get('ratings')));
					$score.attr('class', 'score');
					$score.attr('id', 'score' + paper.id);
					$body.append($score);
                    
					var $local = $('<div></div>');
					$local.text('Local: ' + paper.get('formatted_address'));
					$body.append($local);

					var $content = $('<p></p>');
					$content.text(paper.get('content'));
					$body.append($content);
			   
					var relation = paper.relation('user');
					relations.push(relation); 
					 
					var $buttons = $('<div class="ui-grid-b"></div>');
					$buttons.attr('paper', paper.id);
					var $comment = $('<a href="#popupComment"><span class="icon32-comments"></span></a>');
					$comment.attr('name', 'paperOp');
					$comment.attr('style', 'margin: 0; border: none;');
					$comment.attr('class', 'ui-btn ui-mini');
					$comment.attr('data-position-to', 'window');
					$comment.attr('data-rel', 'popup');
					
					var $wrapComment = $('<div class="ui-block-a"></div>');
					$buttons.append($wrapComment.append($comment));
					
					var $tag = $('<a href="#popupTip"><span class="icon32-info3"></span></a>');
					$tag.attr('name', 'paperOp');
					$tag.attr('style', 'margin: 0; border: none;');
					$tag.attr('class', 'ui-btn ui-mini');
					$tag.attr('data-position-to', 'window');
					$tag.attr('data-rel', 'popup');
					
					var $wrapTag = $('<div class="ui-block-b"></div>');
					$buttons.append($wrapTag.append($tag));
					
					var $raty = $('<a href="#popupRaty"><span class="icon32-star4"></span></a>');
					$raty.attr('name', 'paperOp');
					$raty.attr('style', 'margin: 0; border: none;');
					$raty.attr('class', 'ui-btn ui-mini');
					$raty.attr('data-rel', 'popup');
					
					var $wrapRaty = $('<div class="ui-block-c"></div>');
					$buttons.append($wrapRaty.append($raty));
					
					$item.append($wrapUser); 
					$item.append($body); 
					$item.append($buttons);                   
					items.push($item[0]);
				}
                
				$('#container').append(items).masonry('appended', items);

				setTimeout(function () {
					$(".lazy" + lazypage).imgLiquid(
						{
							fill: true,
							onFinish: function () {
								$(".lazy" + lazypage).lazyload(
									{
										effect: "fadeIn"
									});
								
								var scores = $('.score');
								
								for (var i = 0; i < scores.length; i++) {
									$(scores[i]).raty(
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
								
								$('a[name="paperOp"]').on('click', function() {
									var parent = $(this).parent().parent();
									global.paperId = parent.attr('paper');
								});
							}
						});
				}, 3000);
                
				$.mobile.loading('hide');            
				loadUserToPaper(relations);
			}
		});
	}
     
	function loadUserToPaper(relations) {
		if (relations.length > 0) {
			relations[0].query().find().then(function(user) {
				var relation = user[0].relation('profile');
				$('#userDisplayname_' + relations[0].parent.id)
					.text('Por ' + user[0].get('firstname') + ' ' + user[0].get('lastname'));

				relation.query().find(
					{
						success: function (profile) {
							if (profile[0].get('photo') === undefined) {
								$('#imageUser_' + relations[0].parent.id).attr('src', '../images/user.png');
							}
							else {
								$('#imageUser_' + relations[0].parent.id).attr('src', profile[0].get('photo').url());
							}
                        
							$('#imageUser_' + relations[0].parent.id).parent().imgLiquid(
								{
									fill: true
								});
                                
							$('#userLivesIn_' + relations[0].parent.id).text('de ' + profile[0].get('livesIn'));
                        
							relations.shift();                        
							loadUserToPaper(relations);
						}
					});
			});
		}
	}
})(window);