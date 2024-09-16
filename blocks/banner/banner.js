import { readBlockConfig } from '../../scripts/aem.js';

function getImagePath(imageUrl) {
    var parser = document.createElement('a');
    parser.href = imageUrl;

    return parser.pathname;
}

export default async function decorate(block) {
    const config = readBlockConfig(block);

    const image1Path = getImagePath(config.image1);
    const image2Path = getImagePath(config.image2);
    const image3Path = getImagePath(config.image3);
    const image4Path = getImagePath(config.image4);
    const image5Path = getImagePath(config.image5);

    const text1 = config.text1;
    const text2 = config.text2;
    const text3 = config.text3;

    const content = document.createRange().createContextualFragment(`
        <div id="ad">
            <link rel="stylesheet" href="banner.css">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>
            <div id="f1" class="frame-visual absolute">
                <div class="month absolute">${text1}</div>
                <div class="img centerX">
                    <img id="toto" src="${image1Path}" alt="" class="centerX">
                </div>
                <div class="bottom absolute">
                    <img src="logo-bottom.svg" alt="" class="logo-bottom absolute">
                    <div class="cta absolute"><div class="shadow"></div>${text2}</div>
                    <div class="ml absolute">${text3}</div>
                </div>
            </div>

            <div id="f2" class="frame-visual absolute">
                <div class="month absolute">${text1}</div>
                <div class="img centerX">
                    <img src="${image2Path}" alt="" class="centerX">
                </div>
                <div class="bottom absolute">
                    <img src="logo-bottom.svg" alt="" class="logo-bottom absolute">
                    <div class="cta absolute"><div class="shadow"></div>${text2}</div>
                    <div class="ml absolute">${text3}</div>
                </div>
            </div>

            <div id="f3" class="frame-visual absolute">
                <div class="month absolute">${text1}</div>
                <div class="img centerX">
                    <img src="${image3Path}" alt="" class="centerX">
                </div>
                <div class="bottom absolute">
                    <img src="logo-bottom.svg" alt="" class="logo-bottom absolute">
                    <div class="cta absolute"><div class="shadow"></div>${text2}</div>
                    <div class="ml absolute">${text3}</div>
                </div>
            </div>

            <div id="packshot" class="absolute">
                <img src="${image4Path}" alt="" id="logo-top" class="centerY">
                <img src="${image5Path}" alt="" id="offer" class="centerXY">
                <div class="cta centerY"><div class="shadow"></div>${text2}</div>
                <div class="ml absolute">${text3}</div>
            </div>
        </div>
    `);

    block.textContent = '';
    block.append(content);

    let initialized = false;
    while (!initialized) {
        await new Promise(resolve => setTimeout(resolve, 10));
        try {
            initialized = TweenMax ? true : false;
        } catch (error) {
        }
    }
    loadScript();
}

function loadScript() {
    TweenMax.set('.centerX', {position:'absolute', xPercent:-50, left:'50%'});
    TweenMax.set('.centerY', {position:'absolute', yPercent:-50, top:'50%'});
    TweenMax.set('.centerXY', {position:'absolute', xPercent:-50, yPercent:-50, left:'50%', top:'50%'});

    var tl = new TimelineMax()
    .set('#ad', {visibility : 'visible'})

    .addLabel('start', '+=.2')
    .from('#f1 .img', .6, {height:0, ease:Power0.easeOut}, 'start')
    .from('#f1 .month', .6, {y:-30, ease:Power0.easeOut}, 'start')
    .from('#f1 .bottom', .6, {opacity:0, ease:Power0.easeOut})
    .from('#f1 .bottom .ml', .5, {opacity:0, ease:Power0.easeOut}, '-=.3')
    .fromTo('#f1 .cta .shadow', 1.5, {left: '-100%'}, {left: '100%', ease: Power1.easeOut})

    .addLabel('f2', '+=1.2')
    .to('#f1', .5, {opacity:0, ease:Power0.easeOut}, 'f2-=.5')
    .from('#f2 .img', .6, {height:0, ease:Power0.easeOut}, 'f2')
    .from('#f2 .month', .6, {y:-30, ease:Power0.easeOut}, 'f2')
    .from('#f2 .bottom', .6, {opacity:0, ease:Power0.easeOut})
    .from('#f2 .bottom .ml', .5, {opacity:0, ease:Power0.easeOut}, '-=.3')
    .fromTo('#f2 .cta .shadow', 1.5, {left: '-100%'}, {left: '100%', ease: Power1.easeOut})

    .addLabel('f3', '+=1.2')
    .to('#f2', .5, {opacity:0, ease:Power0.easeOut}, 'f3-=.5')
    .from('#f3 .img', .6, {height:0, ease:Power0.easeOut}, 'f3')
    .from('#f3 .month', .6, {y:-30, ease:Power0.easeOut}, 'f3')
    .from('#f3 .bottom', .6, {opacity:0, ease:Power0.easeOut})
    .from('#f3 .bottom .ml', .5, {opacity:0, ease:Power0.easeOut}, '-=.3')
    .fromTo('#f3 .cta .shadow', 1.5, {left: '-100%'}, {left: '100%', ease: Power1.easeOut})

    .addLabel('packshot', '+=1.2')
    .to('#f3', .5, {opacity:0, ease:Power0.easeOut}, 'packshot-=.5')
    .from('#packshot #logo-top', .6, {y:-50, opacity:0, ease:Power2.easeOut}, 'packshot')
    .from('#packshot #offer', .5, {opacity:0, ease:Power0.easeOut}, '-=.1')
    .from('#packshot .cta', .5, {opacity:0, ease:Power0.easeOut}, '-=.1')
    .from('#packshot .ml', .5, {opacity:0, ease:Power0.easeOut}, '-=.3')
    .fromTo('#packshot .cta .shadow', 1.5, {left: '-100%'}, {left: '100%', ease: Power1.easeOut})
}

