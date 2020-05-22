var menuToggled = false,
toggleTime = 250,
delayTime = 10,
mob = false,
desk = false;

$(function() {
    sizeHandler();

});

const sizeHandler = function() {
    if ($(window).width() < 992) {
        $('#top').show();
        $('#main').css({
            'padding-top': '+=' + $('#top').outerHeight()//+$('#menu').outerHeight()
        });
        $('#bottom').show();
        if (!mob) mobileHandler();
    } else {}
};

const mobileHandler = function() {
    if (!mob) mob = true;
    $(".top-menu").on('click', function() {
        if (!menuToggled) {
            $(this).animate({
                rotationDeg: 90
            },
                {
                    duration: toggleTime,
                    step: function(angle) {
                        $(this).css({
                            transform: 'rotate(' + angle + 'deg)'
                        });
                    }
                }
            );
            setTimeout(function() {
                $('#menu').slideDown(toggleTime);
            }, delayTime);
            menuToggled = true;
            $(document).on('mouseup.outSideClick', function(p) {
                let elem = $('#menu');
                if (
                    menuToggled &&
                    //!$('.top-menu').is(p.target) &&
                    //$('.top-menu').has(p.target).length == 0 &&
                    $(p.target).closest('.top-menu').length == 0 &&
                    !elem.is(p.target) &&
                    elem.has(p.target).length == 0
                ) {
                    $('.top-menu').animate({
                        rotationDeg: 0
                    },
                        {
                            duration: toggleTime,
                            step: function(angle) {
                                $(this).css({
                                    transform: 'rotate(' + angle + 'deg)'
                                });
                            }
                        }
                    );
                    setTimeout(function() {
                        $('#menu').slideUp(toggleTime);
                    }, delayTime);
                    menuToggled = false;
                    $(document).off('.outSideClick');
                }
            })
        } else {
            $(this).animate({
                rotationDeg: 0
            },
                {
                    duration: toggleTime,
                    step: function(angle) {
                        $(this).css({
                            transform: 'rotate(' + angle + 'deg)'
                        });
                    }
                }
            );
            setTimeout(function() {
                $('#menu').slideUp(toggleTime);
            }, delayTime);
            menuToggled = false;
            $(document).off('.outSideClick');
        }
    });
};