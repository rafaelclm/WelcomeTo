(function (global) {
    
    //Event pageshow for page pageuser
    var currentUser = Parse.User.current();
    var lazypage = 1;
    var Paper = Parse.Object.extend("Paper");
    var skip;

    $(document).off('pageshow', '#pageUser');
    $(document).on('pageshow', '#pageUser', function () {
        skip = 0;

        $(".sticker").sticky({
            topSpacing: 0
        });

        loadSwipeEvent();
        loadItems();
        loadMoreItems();

        var relation = currentUser.relation('profile');

        relation.query().find({
            success: function (profile) {
                if (profile[0].get('photo') === undefined) {
                    $('.imageProfile').attr('src', 'images/user_128.png');
                } else {
                    $('.imageProfile').attr('src', profile[0].get('photo').url() + '?' + new Date().getTime());
                }

                $(".imageProfileContainer").imgLiquid({
                    fill: true
                });
            }
        });
    });

    //Load swipe event to open panel right with id panelMenu, this panel contain the menu for application
    function loadSwipeEvent() {
        $(document).off('swiperight swipeleft', '#pageUser');
        $(document).on('swiperight swipeleft', '#pageUser', function (e) {
            if ($('.ui-page-active').jqmData('panel') !== 'open') {
                if (e.type === "swipeleft") {
                    $("#panelUser").panel("open");
                } else if (e.type === "swiperight") {
                    $("#panelMenu").panel("open");
                }
            }
        });
    };

    function loadItems() {
        $('#container').masonry({
            columnWidth: 300,
            itemSelector: '.item',
            isFitWidth: true
        });

        getItems();
    }

    function loadMoreItems() {
        $(window).on('scroll', function (e) {
            if ($(window).scrollTop() > 200) {
                $('#backToTop').show('slow');
            } else {
                $('#backToTop').hide('slow');
            }

            if (($(window).scrollTop() + $(window).height()) >= ($(document).height() - 200)) {
                lazypage += 1;
                getItems()
            }
        });
    }

    function getItems() {
        
        var query = new Parse.Query(Paper);
        var relations = [];

        query.skip(skip);
        query.limit(10);
        query.descending('updatedAt');
        skip += 10;

        query.find().then(function (papers) {
            
           
            if(papers.length > 0){
                
                $.mobile.loading('show', {
                    theme: "b",
                    textVisible: true
                });
                
                var items = [];

                for (var i = 0; i < papers.length; i++) {

                    var paper = papers[i];
                    var $item = $('<div></div>');
                    $item.attr('class', 'item ui-shadow');
                    $item.attr('id', paper.id);
                   
                    var $imageContainer = $('<div><img/></div>');
                    $imageContainer.attr('data-original', paper.get('image').url());
                    $imageContainer.attr('class', 'imgLiquidFill imgLiquid lazy' + lazypage);
                    $imageContainer.attr('style', 'width: 100%; height: 250px;');
                    $item.append($imageContainer);

                    var $body = $('<div></div>');
                    $body.attr('class', 'ui-body ui-body-a');
                    
                    var $local = $('<div></div>');
                    $local.text('Local: ' + paper.get('formatted_address'));
                    $body.append($local);

                    var $content = $('<p></p>');
                    $content.text(paper.get('content'));
                    $body.append($content);
                    
                    $user = $('<div></div>');
                    $user.attr('id', 'user' + paper.id);
                    
                    $a = $('<a href="#" class="ui-btn ui-btn-mini" style="padding: 2px; text-align: left; margin: 0;"></a>');   
                    
                    $divPhoto = $('<div style="width: 39px; height: 39px; float: left;"></div>');
                    $divPhoto.attr('class', 'imgLiquidFill imgLiquid imageUser ui-shadow');  
                    $imageUser = $('<img/>');
                    $imageUser.attr('id', 'imageUser_' + paper.id);               
                    $divPhoto.append($imageUser);
                    $user.append($divPhoto);
                    
                    $divProfile = $('<div style="width: 225px; float: right;"></div>');
                    $firstname = $('<div></div>');
                    $firstname.attr('id', 'userDisplayname_' + paper.id);                    
                    $divProfile.append($firstname);
                    
                    $livesIn = $('<div style="font-weight: normal"></div>');
                    $livesIn.attr('id', 'userLivesIn_' + paper.id);
                    $divProfile.append($livesIn);
                    
                    $user.append($divProfile);  
                    $a.append($user); 
                    $body.append($a);  
                    
                    var relation = paper.relation('user');
                    relations.push(relation);                 
                       
                    $item.append($body);
                    
                    items.push($item[0]);

                }
                
                 $('#container').append(items).masonry('appended', items);

                setTimeout(function () {
                    $(".lazy" + lazypage).imgLiquid({
                        fill: true,
                        onFinish: function () {
                            $(".lazy" + lazypage).lazyload({
                                effect: "fadeIn"
                            });
                        }
                    });
                }, 2000);
                
                $.mobile.loading('hide');            
                loadUserToPaper(relations);
                
            }
            
        });

    }
     
    function loadUserToPaper(relations){
        
        if(relations.length > 0){
            relations[0].query().find().then(function(user){
                
                var relation = user[0].relation('profile');
                $('#userDisplayname_' + relations[0].parent.id)
                    .text('Por ' + user[0].get('firstname') + ' ' + user[0].get('lastname'));

                relation.query().find({
                    success: function (profile) {
                        
                        if (profile[0].get('photo') === undefined) {
                            $('#imageUser_' + relations[0].parent.id).attr('src', 'images/user_128.png');
                        } else {
                            $('#imageUser_' + relations[0].parent.id).attr('src', profile[0].get('photo').url());
                        }
                        
                        $('#imageUser_' + relations[0].parent.id).parent().imgLiquid({
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