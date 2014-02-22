(function (global) {
    //Event pageshow for page pageuser

    var currentUser = Parse.User.current();
    var lazypage = 1;
    $(document).off('pageshow', '#pageUser');
    $(document).on('pageshow', '#pageUser', function () {
        loadSwipeEvent();
        loadLayoutItens();
        loadMoreItens();

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
        $(document).off('swiperight', '#pageUser');
        $(document).on('swiperight', '#pageUser', function (e) {
            if ($('.ui-page-active').jqmData('panel') !== 'open') {
                $('#panelMenu').panel('open');
            }
        });
    };

    function loadLayoutItens() {
        $('#container').masonry({
            columnWidth: 15,
            itemSelector: '.item',
            isFitWidth: true
        });

        $(".lazy" + lazypage).imgLiquid({
            fill: true
        });

        setTimeout(function () {
            $(".lazy" + lazypage).lazyload({
                effect: "fadeIn"
            });
        }, 2000);

    }

    function loadMoreItens() {

        $(window).on('scroll', function (e) {

            if ($(window).scrollTop() > 200) {
                $('#backToTop').show('slow');
            } else {
                $('#backToTop').hide('slow');
            }

            if (($(window).scrollTop() + $(window).height()) >= ($(document).height() - 200)) {

                lazypage += 1;

                $('#loader').show();

                var elems = [];
                for (var i = 0; i < 10; i++) {
                    elems.push(getItemElement());
                }

                $('#container').append(elems).masonry('appended', elems);

                $(".lazy" + lazypage).imgLiquid({
                    fill: true
                });

                $(".lazy" + lazypage).lazyload({
                    effect: "fadeIn"
                });

                setTimeout(function () {
                    $('#loader').hide();
                }, 3000);

            }
        });

    }

    function getItemElement() {
        var elem = document.createElement('div');
        elem.className = 'item ui-body ui-body-a ui-shadow';
        var child = document.createElement('div');
        child.setAttribute('style', 'width: 100%; height: 200px; max-height: 400px;');
        child.setAttribute('data-original',
            'http://viajarpelomundo.com.br/wp-content/uploads/BXK301_fernando-de-noronha-set-2005-4800.jpg');
        child.className = 'imgLiquidFill imgLiquid lazy' + lazypage;
        var img = document.createElement('img');
        child.appendChild(img);
        elem.appendChild(child);
        return elem;
    }

})(window);