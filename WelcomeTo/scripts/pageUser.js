//Event pageshow for page pageuser
$(document).off('pageshow', '#pageUser');
$(document).on('pageshow', '#pageUser', function() {

    loadSwipeEvent();
    loadLayoutItens();
    loadMoreItens();

});

//Load swipe event to open panel right with id panelMenu, this panel contain the menu for application
function loadSwipeEvent() {

    $(document).off('swiperight', '#pageUser');
    $(document).on('swiperight', '#pageUser', function(e) {
        if ($('.ui-page-active').jqmData('panel') !== 'open') {
            $('#panelMenu').panel('open');
        }
    });

}
;

function loadLayoutItens() {

    $('#container').masonry({
        columnWidth: 40,
        itemSelector: '.item',
        isFitWidth: true
    });

    $(".imgLiquidFill").imgLiquid({fill: true});


}

function loadMoreItens() {
    $(window).on('scroll', function() {
        if (($(window).scrollTop() + $(window).height()) > ($(document).height() - 100)) {

            $.mobile.loading('show');

            var elems = [];
            for (var i = 0; i < 10; i++) {
                elems.push(getItemElement());
            }

            $('#container').append(elems).masonry('appended', elems);

            $(".imgLiquidFill").imgLiquid({fill: true});

            $.mobile.loading('hide');

        }
    });

    function getItemElement() {
        var elem = document.createElement('div');
        elem.className = 'item ui-body ui-body-a ui-shadow';
        var child = document.createElement('div');
        child.setAttribute('style', 'width: 100%; height: 200px; max-height: 400px;');
        child.className = 'imgLiquidFill imgLiquid';
        var img = document.createElement('img');
        img.setAttribute('src', 'http://viajarpelomundo.com.br/wp-content/uploads/BXK301_fernando-de-noronha-set-2005-4800.jpg');
        child.appendChild(img);
        elem.appendChild(child);
        return elem;
    }
}