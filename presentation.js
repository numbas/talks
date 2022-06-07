setTimeout(() => {
    const sections = Array.from(document.querySelectorAll('main > section'));
    function scroll_update(scrollPos) {
    }

    let lastKnownScrollPosition = 0;
    let ticking = false;

    main = document.querySelector('main');
    main.addEventListener('scroll', function(e) {
        lastKnownScrollPosition = main.scrollTop;

        if (!ticking) {
            window.requestAnimationFrame(function() {
                scroll_update(lastKnownScrollPosition);
                ticking = false;
            });

            ticking = true;
        }
    });

    sections.forEach((section,i) => {
        section.addEventListener('click', e => {
            const box = section.getBoundingClientRect();
            const d = i + (e.pageX < (box.left+box.right)/2 ? -1 : 1);
            if(d>=0 && d<sections.length) {
                sections[d].scrollIntoView();
            }
        })
    })

},100);

const url_footer = document.querySelector('body > footer > a#url');
url_footer.setAttribute('href',window.location+'');
url_footer.textContent = window.location.host + window.location.pathname;
