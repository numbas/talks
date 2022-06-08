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
            if(e.target.nodeName=='A') {
                return;
            }
            const box = section.getBoundingClientRect();
            const qx = Math.floor(4*(e.pageX - box.left)/(box.width));
            const qy = Math.floor(4*(e.pageY - box.top)/(box.height));
            if(qy<3) {
                return;
            }
            const d = qx==0 ? -1 : qx==3 ? 1 : 0;
            if(d<0) {
                const revealed = section.querySelectorAll('.reveal.revealed');
                if(revealed.length) {
                    revealed[revealed.length-1].classList.remove('revealed');
                    return;
                }
            } else if(d>0) {
                const revealable = section.querySelectorAll('.reveal:not(.revealed)');
                if(revealable.length) {
                    revealable[0].classList.add('revealed');
                    return;
                }
            }
            const to_section = sections[i+d];
            if(to_section) {
                to_section.scrollIntoView();
            }
        })
    })

},100);

const url_footer = document.querySelector('body > footer > a#url');
url_footer.setAttribute('href',window.location+'');
url_footer.textContent = window.location.host + window.location.pathname;
