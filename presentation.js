import QRCode from './qrcode.js';

window.QRCode = QRCode;

const url_footer = document.querySelector('body > footer > a#url');
url_footer.textContent = window.location.host + window.location.pathname;

setTimeout(() => {
    const qrcode = new QRCode('qrcode', {
        width: 512,
        height: 512
    });

    function update_qrcode() {
        qrcode.makeCode(window.location+'');
        url_footer.setAttribute('href',window.location+'');
    }

    function restart_videos(section, play=false) {
        for(let video of section.querySelectorAll('video')) {
            video.currentTime = 0;
            play ? video.play() : video.pause();
        }
    }

    function find_current_section() {
        return sections.toReversed().find(s => s.getBoundingClientRect().top <= 10);
    }

    const sections = Array.from(document.querySelectorAll('main > section'));
    function scroll_update() {
        const section = find_current_section();
        if(!section) {
            return;
        }
        const hash = `#${section.id}`;
        if(location.hash != hash) {
            history.replaceState('','',hash);
            restart_videos(section);
        } else {
            restart_videos(section, true);
        }
        update_qrcode();
    }

    scroll_update();

    let lastKnownScrollPosition = 0;
    let ticking = false;

    const main = document.querySelector('main');
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
            const safe_clicks = 'section ul li p ol div span'.split(' ');
            if(!safe_clicks.includes(e.target.nodeName.toLowerCase())) {
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

            e.preventDefault();
            e.stopPropagation();

            window.getSelection().collapseToStart()

            const to_section = sections[i+d];
            if(to_section) {
                to_section.scrollIntoView();
            }
        })
    })

    const exam_observer = new IntersectionObserver(
        (entries) => {
            for(let {target, isIntersecting} of entries) {
                if(isIntersecting) {
                    target.load_exam();
                }
            }
        },
        {
            root: document.querySelector('main'),
            threshold: 0.01
        }
    );

    for(let exam of document.querySelectorAll('numbas-exam')) {
        exam_observer.observe(exam);
    }

    window.addEventListener('keydown', e => {
        if(e.key == 'Escape') {
            const section = find_current_section();
            restart_videos(section, [...section.querySelectorAll('video')].some(v => v.paused));
        }
    });

    function size_details() {
        for(let d of document.querySelectorAll('details')) {
            const was_open = d.open;
            d.style['min-width'] = '';
            d.style['min-height'] = '';
            d.open = true;
            const {width, height} = d.getBoundingClientRect();
            d.style['min-width'] = `${width}px`;
            d.style['min-height'] = `${height}px`;
            d.open = was_open;
        }
    }
    size_details();
    window.addEventListener('resize', size_details);

    window.matchMedia("print").addEventListener("change", evt => {
        if (evt.matches) {
            for(let e of document.body.querySelectorAll("details:not([open])")) {
                e.setAttribute("open", "");
                e.dataset.wasclosed = "";
            }
        } else {
            for(let e of document.body.querySelectorAll("details[data-wasclosed]")) {
                e.removeAttribute("open");
                delete e.dataset.wasclosed;
            }
        }
    })
},100);

function element(name, attr, content) {
    const el = document.createElement(name);
    if(attr) {
        for(let [k,v] of Object.entries(attr)) {
            el.setAttribute(k,v);
        }
    }
    if(content !== undefined) {
        el.innerHTML = content;
    }
    return el;
}

function setup_config() {
    const config_section = document.getElementById('controls');
    for(let sheet of document.styleSheets) {
        for(let rule of sheet.rules) {
            if(!(rule instanceof CSSPropertyRule)) {
                continue;
            }

            const group = element('div');
            config_section.append(group);

            const id = `config${rule.name}`;

            const label = element('label',{for:id}, rule.name.slice(2));
            group.append(label);

            const types = {
                'number': () => {
                    const input = element('input',{type:'range', min: 0, max: 1, step: 0.01, value:rule.initialValue});
                    return input;
                },
                'color': () => {
                    const input = element('input',{type:'color',value:rule.initialValue});
                    return input;
                },
                'length': () => {
                    const input = element('input',{type:'number',value:rule.initialValue});
                    return input;
                },
                string: () => {
                    const input = element('input',{type:'text',value:rule.initialValue});
                    return input;
                }
            }
            const type = rule.syntax.match(/<(.*?)>/)[1];
            const input = types[type]();
            input.addEventListener('input', e => {
                document.documentElement.style.setProperty(rule.name, input.value);
            });
            input.id = id;
            group.append(input);
        }
    }
}

if(document.readyState == 'complete') {
    setup_config();
} else {
    document.addEventListener('DOMContentLoaded', setup_config);
}
