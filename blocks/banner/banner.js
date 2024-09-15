import { readBlockConfig } from '../../scripts/aem.js';

export default function decorate(block) {
    const config = readBlockConfig(block);
    console.info(JSON.stringify(config));

    const content = document.createRange().createContextualFragment(`
        <div id="ad">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>
            <div id="f1" class="frame-visual absolute">
                <div class="month absolute">EN JUILLET</div>
                <div class="img centerX">
                    <img src="img1.jpg" alt="" class="centerX">
                </div>
                <div class="bottom absolute">
                    <img src="logo-bottom.svg" alt="" class="logo-bottom absolute">
                    <div class="cta absolute"><div class="shadow"></div>J'en profite*</div>
                    <div class="ml absolute">*Offre soumise à conditions valable jusqu’au 09/08/2023. Voir modalités sur boutique.canalplus.com</div>
                </div>
            </div>

            <div id="f2" class="frame-visual absolute">
                <div class="month absolute">EN JUILLET</div>
                <div class="img centerX">
                    <img src="img2.jpg" alt="" class="centerX">
                </div>
                <div class="bottom absolute">
                    <img src="logo-bottom.svg" alt="" class="logo-bottom absolute">
                    <div class="cta absolute"><div class="shadow"></div>J'en profite*</div>
                    <div class="ml absolute">*Offre soumise à conditions valable jusqu’au 09/08/2023. Voir modalités sur boutique.canalplus.com</div>
                </div>
            </div>

            <div id="f3" class="frame-visual absolute">
                <div class="month absolute">EN JUILLET</div>
                <div class="img centerX">
                    <img src="img3.jpg" alt="" class="centerX">
                </div>
                <div class="bottom absolute">
                    <img src="logo-bottom.svg" alt="" class="logo-bottom absolute">
                    <div class="cta absolute"><div class="shadow"></div>J'en profite*</div>
                    <div class="ml absolute">*Offre soumise à conditions valable jusqu’au 09/08/2023. Voir modalités sur boutique.canalplus.com</div>
                </div>
            </div>

            <div id="packshot" class="absolute">
                <img src="logo-top.svg" alt="" id="logo-top" class="centerY">
                <img src="packshot-offer.svg" alt="" id="offer" class="centerXY">
                <div class="cta centerY"><div class="shadow"></div>J'en profite*</div>
                <div class="ml absolute">*Offre soumise à conditions valable jusqu’au 09/08/2023. Voir modalités sur boutique.canalplus.com</div>
            </div>

        </div>
    `);

    block.textContent = '';
    block.append(content);
}

window.onload = function() {

    TweenMax.set('.centerX', {position:'absolute', xPercent:-50, left:'50%'});
    TweenMax.set('.centerY', {position:'absolute', yPercent:-50, top:'50%'});
    TweenMax.set('.centerXY', {position:'absolute', xPercent:-50, yPercent:-50, left:'50%', top:'50%'});

    var tl = new TimelineMax(/*{repeat:1, repeatDelay: 3}*/)
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
    .from('#packshot #logo-top', .6, {y:-35, ease:Power2.easeOut}, 'packshot')
    .from('#packshot #offer', .5, {opacity:0, ease:Power0.easeOut}, '-=.1')
    .from('#packshot .cta', .5, {opacity:0, ease:Power0.easeOut}, '-=.1')
    .from('#packshot .ml', .5, {opacity:0, ease:Power0.easeOut}, '-=.3')
    .fromTo('#packshot .cta .shadow', 1.5, {left: '-100%'}, {left: '100%', ease: Power1.easeOut})
}


