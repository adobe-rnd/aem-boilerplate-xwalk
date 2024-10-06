import { readBlockConfig } from '../../scripts/aem.js';

function insertSmartCrop(url, smartCropName) {
    return url.replace('?', `:${smartCropName}?`);
}

export default async function decorate(block) {
    const config = readBlockConfig(block);

    const smartCropName = '160x600';

    const image1Path = config.image1;
    const image2Path = config.image2;
    const image3Path = insertSmartCrop(config.image3, smartCropName);
    const image4Path = config.image4;
    const image5Path = config.image5;

    const text1 = config.text1;
    const text2 = config.text2;
    const text3 = config.text3;
    const text4 = config.text4;
    const text5 = config.text5;

    const content = document.createRange().createContextualFragment(`
        <div id="ad">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>
            <div id="f1" class="frame absolute">
                <div class="moment absolute">${text1}</div>
                <div class="text-center centerXY">${text2}</div>
                <div class="bottom absolute">
                    <img src="${image4Path}" alt="" class="logo-bottom absolute">
                    <div class="cta absolute"><div class="shadow"></div>${text4}</div>
                    <div class="ml absolute">${text5}</div>
                </div>
            </div>

            <div id="f2" class="frame absolute">
                <img src="${image3Path}" alt="" class="bg">
                <div class="shadow absolute"></div>
                <div class="moment absolute">${text1}</div>
                <div id="packshot" class="centerY">
                    ${text3}
                    <div class="team-pics">
                        <img src="${image1Path}" alt="">
                        <img src="${image2Path}" alt="">
                    </div>
                </div>
                <div class="bottom absolute">
                    <img src="${image4Path}" alt="" class="logo-bottom absolute">
                    <div class="cta absolute"><div class="shadow"></div>${text4}</div>
                    <div class="ml absolute">${text5}</div>
                </div>
            </div>

            <div id="f3" class="frame ps absolute">
                <div class="shadow absolute"></div>
          
                <img src="${image4Path}" alt="" class="logo centerX">
                <img src="${image5Path}" alt="" id="prix" class="centerXY">
                <div class="cta absolute"><div class="shadow"></div>${text4}</div>
                <div class="ml absolute">${text5}</div>
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

    var tl = new TimelineMax(/*{repeat:1, repeatDelay: 3}*/)
    .set('#ad', {visibility : 'visible'})

    .addLabel('start', '+=.2')
    .from('#f1 .img', .6, {height:0, ease:Power0.easeOut}, 'start')
    .from('#f1 .moment', .6, {y:-50, ease:Power1.easeOut}, 'start')
    .from('#f1 .text-center', .6, {opacity:0, ease:Power0.easeOut})
    .from('#f1 .bottom', .6, {opacity:0, ease:Power0.easeOut})
    .from('#f1 .bottom .ml', .5, {opacity:0, ease:Power0.easeOut}, '-=.3')
    .fromTo('#f1 .cta .shadow', 1.5, {left: '-100%'}, {left: '100%', ease: Power1.easeOut})

    .addLabel('f2', '+=1.2')
    .from('#f2', .5, {opacity:0, ease:Power0.easeOut}, 'f2-=.5')
    .from('#f2 .moment', .6, {y:-50, ease:Power1.easeOut}, 'f2')
    .from('#f2 #packshot', .6, {opacity:0, ease:Power0.easeOut})
    .from('#f2 #packshot .team-pics', .6, {opacity:0, ease:Power0.easeOut})
    .from('#f2 .bottom', .6, {opacity:0, ease:Power0.easeOut})
    .from('#f2 .bottom .ml', .5, {opacity:0, ease:Power0.easeOut}, '-=.3')
    .fromTo('#f2 .cta .shadow', 1.5, {left: '-100%'}, {left: '100%', ease: Power1.easeOut})

    .addLabel('f3', '+=1.2')
    .from('#f3', .5, {opacity:0, ease:Power0.easeOut}, 'f3-=.5')
    .from('#f3 .logo', .6, {y:-50, ease:Power1.easeOut}, 'f3')
    .from('#f3 #prix', .6, {opacity:0, ease:Power0.easeOut})
    .from('#f3 .cta', .6, {opacity:0, ease:Power0.easeOut})
    .from('#f3 .ml', .5, {opacity:0, ease:Power0.easeOut}, '-=.3')
    .fromTo('#f3 .cta .shadow', 1.5, {left: '-100%'}, {left: '100%', ease: Power1.easeOut})
}

