var root = $('html, body')

$('a[href^=\\#]').on('click', function(e) {
    e.preventDefault()

    var hash = this.hash

    root.animate(
        { scrollTop: $(hash).offset().top - 20 },
        700,
        function() {
            window.location.hash = hash
        }
    )
})

var $navigationLinks = $($('nav > ul > li > a[href^=\\#]').get().reverse())

function throttle(fn, interval) {
    var lastCall, timeoutId

    return function () {
        var now = new Date().getTime()
        if (lastCall && now < (lastCall + interval) ) {
            // if we are inside the interval we wait
            clearTimeout(timeoutId)
            timeoutId = setTimeout(function () {
                lastCall = now
                fn.call()
            }, interval - (now - lastCall) )
        } else {
            // otherwise, we directly call the function
            lastCall = now
            fn.call()
        }
    }
}

function highlightNavigation() {
    var scrollPosition = $(window).scrollTop()

    $navigationLinks.each(function() {
        var currentSection = $(this.hash)
        var sectionTop = currentSection.offset().top - 300

        if (scrollPosition >= sectionTop) {
            var act = $(this)

            if (!act.hasClass('active')) {
                $navigationLinks.removeClass('active')
                act.addClass('active')
            }

            return false
        }
    })
}

$(window).scroll( throttle(highlightNavigation,100) )
