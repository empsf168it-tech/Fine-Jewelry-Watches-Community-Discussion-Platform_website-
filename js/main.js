(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 150) {
            $('.back-to-top').fadeIn(300).css('display', 'inline-flex');
        } else {
            $('.back-to-top').fadeOut(300);
        }
    });

    $(document).on('click', '.back-to-top', function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        $('html, body').animate({ scrollTop: 0 }, 500);
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
    // Unique Custom Mouse Cursor & Ember Particle Trail
    if (window.matchMedia("(min-width: 992px)").matches) {
        $(document).ready(function() {
            var $cursorDot = $('<div class="custom-cursor-dot"></div>');
            var $cursorFollower = $('<div class="custom-cursor-follower"></div>');
            $('body').append($cursorDot).append($cursorFollower);

            var mouseX = 0, mouseY = 0;
            var followerX = 0, followerY = 0;
            var lastEmberTime = 0;

            $(document).on('mousemove', function(e) {
                mouseX = e.clientX;
                mouseY = e.clientY;

                $cursorDot.css({
                    left: mouseX + 'px',
                    top: mouseY + 'px'
                });

                // Spawn ember particle on move
                var now = Date.now();
                if (now - lastEmberTime > 55) {
                    lastEmberTime = now;
                    var randomOffsetX = (Math.random() * 24 - 12);
                    var $ember = $('<div class="cursor-ember-particle"></div>');
                    $ember.css({
                        left: mouseX + 'px',
                        top: mouseY + 'px',
                        '--ember-x': randomOffsetX + 'px'
                    });
                    $('body').append($ember);
                    setTimeout(function() {
                        $ember.remove();
                    }, 750);
                }
            });

            // Smooth follower motion loop
            function animateFollower() {
                followerX += (mouseX - followerX) * 0.2;
                followerY += (mouseY - followerY) * 0.2;

                $cursorFollower.css({
                    left: followerX + 'px',
                    top: followerY + 'px'
                });

                requestAnimationFrame(animateFollower);
            }
            animateFollower();

            // Hover state feedback for interactive elements
            $(document).on('mouseenter', 'a, button, .btn, input, select, textarea, .service-item, .team-item, .nav-link, .culinary-perk-card, .kitchen-value-card', function() {
                $cursorFollower.addClass('cursor-hover');
            }).on('mouseleave', 'a, button, .btn, input, select, textarea, .service-item, .team-item, .nav-link, .culinary-perk-card, .kitchen-value-card', function() {
                $cursorFollower.removeClass('cursor-hover');
            });
        });
    }

})(jQuery);


