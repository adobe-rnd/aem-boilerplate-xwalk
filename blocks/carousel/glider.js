/* @preserve
    _____ __ _     __                _
   / ___// /(_)___/ /___  ____      (_)___
  / (_ // // // _  // -_)/ __/_    / /(_-<
  \___//_//_/ \_,_/ \__//_/  (_)__/ //___/
                              |___/

  Version: 1.7.4
  Author: Nick Piscitelli (pickykneee)
  Website: https://nickpiscitelli.com
  Documentation: http://nickpiscitelli.github.io/Glider.js
  License: MIT License
  Release Date: October 25th, 2018

*/
!(function (e) { typeof define === 'function' && define.amd ? define(e) : typeof exports === 'object' ? module.exports = e() : e(); }(function () {
  const a = typeof window !== 'undefined' ? window : this; const e = a.Glider = function (e, t) {
    const i = this; if (e._glider) return e._glider; if (i.ele = e, i.ele.classList.add('glider'), (i.ele._glider = i).opt = {
      slidesToScroll: 1, slidesToShow: 1, resizeLock: !0, duration: 0.5, passiveListeners: !1, easing(e, t, i, o, s) { return o * (t /= s) * t + i; }, ...t,
    }, i.animate_id = i.page = i.slide = 0, i.arrows = {}, i._opt = i.opt, i.opt.skipTrack) i.track = i.ele.children[0]; else for (i.track = document.createElement('div'), i.ele.appendChild(i.track); i.ele.children.length !== 1;)i.track.appendChild(i.ele.children[0]); i.track.classList.add('glider-track'), i.init(), i.resize = i.init.bind(i, !0), i.event(i.ele, 'add', { scroll: i.updateControls.bind(i) }, { passive: i.opt.passiveListeners }), i.event(a, 'add', { resize: i.resize });
  }; const
    t = e.prototype; return t.init = function (e, t) {
    let i; const o = this; let s = 0; let r = 0; const
      l = (o.slides = o.track.children, [].forEach.call(o.slides, (e, t) => { e.classList.add('glider-slide'), e.setAttribute('data-gslide', t); }), o.containerWidth = o.ele.clientWidth, o.settingsBreakpoint()); t = t || l, o.opt.slidesToShow !== 'auto' && void 0 === o.opt._autoSlide || (i = o.containerWidth / o.opt.itemWidth, o.opt._autoSlide = o.opt.slidesToShow = o.opt.exactWidth ? i : Math.max(1, Math.floor(i))), o.opt.slidesToScroll === 'auto' && (o.opt.slidesToScroll = Math.floor(o.opt.slidesToShow)), o.itemWidth = o.opt.exactWidth ? o.opt.itemWidth : o.containerWidth / o.opt.slidesToShow, [].forEach.call(o.slides, (e) => { e.style.height = 'auto', e.style.width = `${o.itemWidth}px`, s += o.itemWidth, r = Math.max(e.offsetHeight, r); }), o.track.style.width = `${s}px`, o.trackWidth = s, o.isDrag = !1, o.preventClick = !1, o.move = !1, o.opt.resizeLock && o.scrollTo(o.slide * o.itemWidth, 0), (l || t) && (o.bindArrows(), o.buildDots(), o.bindDrag()), o.updateControls(), o.emit(e ? 'refresh' : 'loaded');
  }, t.bindDrag = function () {
    function e() { t.mouseDown = void 0, t.ele.classList.remove('drag'), t.isDrag && (t.preventClick = !0), t.isDrag = !1; } var t = this; t.mouse = t.mouse || t.handleMouse.bind(t); function i() { t.move = !0; } const o = {
      mouseup: e, mouseleave: e, mousedown(e) { e.preventDefault(), e.stopPropagation(), t.mouseDown = e.clientX, t.ele.classList.add('drag'), t.move = !1, setTimeout(i, 300); }, touchstart(e) { t.ele.classList.add('drag'), t.move = !1, setTimeout(i, 300); }, mousemove: t.mouse, click(e) { t.preventClick && t.move && (e.preventDefault(), e.stopPropagation()), t.preventClick = !1, t.move = !1; },
    }; t.ele.classList.toggle('draggable', !0 === t.opt.draggable), t.event(t.ele, 'remove', o), t.opt.draggable && t.event(t.ele, 'add', o, { passive: t.opt.passiveListeners });
  }, t.buildDots = function () { const e = this; if (e.opt.dots) { if (typeof e.opt.dots === 'string' ? e.dots = document.querySelector(e.opt.dots) : e.dots = e.opt.dots, e.dots) { e.dots.innerHTML = '', e.dots.setAttribute('role', 'tablist'), e.dots.classList.add('glider-dots'); for (let t = 0; t < Math.ceil(e.slides.length / e.opt.slidesToShow); ++t) { const i = document.createElement('button'); i.dataset.index = t, i.setAttribute('aria-label', `Page ${t + 1}`), i.setAttribute('role', 'tab'), i.className = `glider-dot ${t ? '' : 'glider-active'}`, e.event(i, 'add', { click: e.scrollItem.bind(e, t, !0) }), e.dots.appendChild(i); } } } else e.dots && (e.dots.innerHTML = ''); }, t.bindArrows = function () { const i = this; i.opt.arrows ? ['prev', 'next'].forEach((e) => { let t = i.opt.arrows[e]; (t = t && (typeof t === 'string' ? document.querySelector(t) : t)) && (t._func = t._func || i.scrollItem.bind(i, e), i.event(t, 'remove', { click: t._func }), i.event(t, 'add', { click: t._func }), i.arrows[e] = t); }) : Object.keys(i.arrows).forEach((e) => { e = i.arrows[e]; i.event(e, 'remove', { click: e._func }); }); }, t.updateControls = function (e) {
    const n = this; const t = (e && !n.opt.scrollPropagate && e.stopPropagation(), n.containerWidth >= n.trackWidth); const a = (n.opt.rewind || (n.arrows.prev && (n.arrows.prev.classList.toggle('disabled', n.ele.scrollLeft <= 0 || t), n.arrows.prev.setAttribute('aria-disabled', n.arrows.prev.classList.contains('disabled'))), n.arrows.next && (n.arrows.next.classList.toggle('disabled', Math.ceil(n.ele.scrollLeft + n.containerWidth) >= Math.floor(n.trackWidth) || t), n.arrows.next.setAttribute('aria-disabled', n.arrows.next.classList.contains('disabled')))), n.slide = Math.round(n.ele.scrollLeft / n.itemWidth), n.page = Math.round(n.ele.scrollLeft / n.containerWidth), n.slide + Math.floor(Math.floor(n.opt.slidesToShow) / 2)); let
      d = Math.floor(n.opt.slidesToShow) % 2 ? 0 : a + 1; Math.floor(n.opt.slidesToShow) === 1 && (d = 0), n.ele.scrollLeft + n.containerWidth >= Math.floor(n.trackWidth) && (n.page = n.dots ? n.dots.children.length - 1 : 0), [].forEach.call(n.slides, (e, t) => {
      const i = e.classList; var e = i.contains('visible'); const o = n.ele.scrollLeft; const s = n.ele.scrollLeft + n.containerWidth; var r = n.itemWidth * t; const l = r + n.itemWidth; var
        r = ([].forEach.call(i, (e) => { /^left|right/.test(e) && i.remove(e); }), i.toggle('glider-active', n.slide === t), a === t || d && d === t ? i.add('center') : (i.remove('center'), i.add([t < a ? 'left' : 'right', Math.abs(t - (!(t < a) && d || a))].join('-'))), Math.ceil(r) >= Math.floor(o) && Math.floor(l) <= Math.ceil(s)); i.toggle('visible', r), r !== e && n.emit(`slide-${r ? 'visible' : 'hidden'}`, { slide: t });
    }), n.dots && [].forEach.call(n.dots.children, (e, t) => { e.classList.toggle('glider-active', n.page === t); }), e && n.opt.scrollLock && (clearTimeout(n.scrollLock), n.scrollLock = setTimeout(() => { clearTimeout(n.scrollLock), Math.abs(n.ele.scrollLeft / n.itemWidth - n.slide) > 0.02 && (n.mouseDown || n.trackWidth > n.containerWidth + n.ele.scrollLeft && n.scrollItem(n.getCurrentSlide())); }, n.opt.scrollLockDelay || 250));
  }, t.getCurrentSlide = function () { return this.round(this.ele.scrollLeft / this.itemWidth); }, t.scrollItem = function (e, t, i) {
    i && i.preventDefault(); let o; const s = this; const r = e; var i = (++s.animate_id, s.slide); var
      l = !0 === t ? (e = Math.round(e * s.containerWidth / s.itemWidth)) * s.itemWidth : (typeof e === 'string' && (l = e === 'prev', e = s.opt.slidesToScroll % 1 || s.opt.slidesToShow % 1 ? s.getCurrentSlide() : s.slide, l ? e -= s.opt.slidesToScroll : e += s.opt.slidesToScroll, s.opt.rewind && (o = s.ele.scrollLeft, e = l && !o ? s.slides.length : !l && o + s.containerWidth >= Math.floor(s.trackWidth) ? 0 : e)), e = Math.max(Math.min(e, s.slides.length), 0), s.slide = e, s.itemWidth * e); return s.emit('scroll-item', { prevSlide: i, slide: e }), s.scrollTo(l, s.opt.duration * Math.abs(s.ele.scrollLeft - l), () => { s.updateControls(), s.emit('animated', { value: r, type: typeof r === 'string' ? 'arrow' : t ? 'dot' : 'slide' }); }), !1;
  }, t.settingsBreakpoint = function () {
    const e = this; const
      t = e._opt.responsive; if (t) { t.sort((e, t) => t.breakpoint - e.breakpoint); for (let i = 0; i < t.length; ++i) { const o = t[i]; if (a.innerWidth >= o.breakpoint) return e.breakpoint !== o.breakpoint && (e.opt = { ...e._opt, ...o.settings }, e.breakpoint = o.breakpoint, !0); } } const s = e.breakpoint !== 0; return e.opt = { ...e._opt }, e.breakpoint = 0, s;
  }, t.scrollTo = function (t, i, o) {
    const s = this; const r = (new Date()).getTime(); const l = s.animate_id; const
      n = function () { const e = (new Date()).getTime() - r; s.ele.scrollLeft = s.ele.scrollLeft + (t - s.ele.scrollLeft) * s.opt.easing(0, e, 0, 1, i), e < i && l === s.animate_id ? a.requestAnimationFrame(n) : (s.ele.scrollLeft = t, o && o.call(s)); }; a.requestAnimationFrame(n);
  }, t.removeItem = function (e) { const t = this; t.slides.length && (t.track.removeChild(t.slides[e]), t.refresh(!0), t.emit('remove')); }, t.addItem = function (e) { this.track.appendChild(e), this.refresh(!0), this.emit('add'); }, t.handleMouse = function (e) { const t = this; t.mouseDown && (t.isDrag = !0, t.ele.scrollLeft += (t.mouseDown - e.clientX) * (t.opt.dragVelocity || 3.3), t.mouseDown = e.clientX); }, t.round = function (e) { const t = 1 / (this.opt.slidesToScroll % 1 || 1); return Math.round(e * t) / t; }, t.refresh = function (e) { this.init(!0, e); }, t.setOption = function (t, e) { const i = this; i.breakpoint && !e ? i._opt.responsive.forEach((e) => { e.breakpoint === i.breakpoint && (e.settings = { ...e.settings, ...t }); }) : i._opt = { ...i._opt, ...t }, i.breakpoint = 0, i.settingsBreakpoint(); }, t.destroy = function () {
    function e(t) { t.removeAttribute('style'), [].forEach.call(t.classList, (e) => { /^glider/.test(e) && t.classList.remove(e); }); } const t = this; const
      i = t.ele.cloneNode(!0); t.opt.skipTrack || (i.children[0].outerHTML = i.children[0].innerHTML), e(i), [].forEach.call(i.getElementsByTagName('*'), e), t.ele.parentNode.replaceChild(i, t.ele), t.event(a, 'remove', { resize: t.resize }), t.emit('destroy');
  }, t.emit = function (e, t) { e = new a.CustomEvent(`glider-${e}`, { bubbles: !this.opt.eventPropagate, detail: t }); this.ele.dispatchEvent(e); }, t.event = function (e, t, i) { const o = e[`${t}EventListener`].bind(e); Object.keys(i).forEach((e) => { o(e, i[e]); }); }, e;
}));

export default function (container, configJson) {
  return new window.Glider(container, configJson);
}
