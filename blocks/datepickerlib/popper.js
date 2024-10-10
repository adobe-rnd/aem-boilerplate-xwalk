/**
 * @popperjs/core v2.11.8 - MIT License
 */

export default function () {
  return window.Popper;
}

// export function createPopper(){
!(function (e, t) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? t(exports)
    : typeof define === 'function' && define.amd
      ? define(['exports'], t)
      : t(((e = typeof globalThis !== 'undefined' ? globalThis : e || self).Popper = window.Popper = {}));
}(this, (e) => {
  function t(e) {
    if (e == null) return window;
    if (e.toString() !== '[object Window]') {
      const t = e.ownerDocument;
      return (t && t.defaultView) || window;
    }
    return e;
  }
  function n(e) {
    return e instanceof t(e).Element || e instanceof Element;
  }
  function r(e) {
    return e instanceof t(e).HTMLElement || e instanceof HTMLElement;
  }
  function o(e) {
    return typeof ShadowRoot !== 'undefined' && (e instanceof t(e).ShadowRoot || e instanceof ShadowRoot);
  }
  const i = Math.max;
  const a = Math.min;
  const s = Math.round;
  function f() {
    const e = navigator.userAgentData;
    return e != null && e.brands && Array.isArray(e.brands)
      ? e.brands
        .map((e) => `${e.brand}/${e.version}`)
        .join(' ')
      : navigator.userAgent;
  }
  function c() {
    return !/^((?!chrome|android).)*safari/i.test(f());
  }
  function p(e, o, i) {
    void 0 === o && (o = !1), void 0 === i && (i = !1);
    const a = e.getBoundingClientRect();
    let f = 1;
    let p = 1;
    o && r(e) && ((f = (e.offsetWidth > 0 && s(a.width) / e.offsetWidth) || 1), (p = (e.offsetHeight > 0 && s(a.height) / e.offsetHeight) || 1));
    const u = (n(e) ? t(e) : window).visualViewport;
    const l = !c() && i;
    const d = (a.left + (l && u ? u.offsetLeft : 0)) / f;
    const h = (a.top + (l && u ? u.offsetTop : 0)) / p;
    const m = a.width / f;
    const v = a.height / p;
    return {
      width: m, height: v, top: h, right: d + m, bottom: h + v, left: d, x: d, y: h,
    };
  }
  function u(e) {
    const n = t(e);
    return { scrollLeft: n.pageXOffset, scrollTop: n.pageYOffset };
  }
  function l(e) {
    return e ? (e.nodeName || '').toLowerCase() : null;
  }
  function d(e) {
    return ((n(e) ? e.ownerDocument : e.document) || window.document).documentElement;
  }
  function h(e) {
    return p(d(e)).left + u(e).scrollLeft;
  }
  function m(e) {
    return t(e).getComputedStyle(e);
  }
  function v(e) {
    const t = m(e);
    const n = t.overflow;
    const r = t.overflowX;
    const o = t.overflowY;
    return /auto|scroll|overlay|hidden/.test(n + o + r);
  }
  function y(e, n, o) {
    void 0 === o && (o = !1);
    let i;
    let a;
    const f = r(n);
    const c = r(n)
        && (function (e) {
          const t = e.getBoundingClientRect();
          const n = s(t.width) / e.offsetWidth || 1;
          const r = s(t.height) / e.offsetHeight || 1;
          return n !== 1 || r !== 1;
        }(n));
    const m = d(n);
    const y = p(e, c, o);
    let g = { scrollLeft: 0, scrollTop: 0 };
    let b = { x: 0, y: 0 };
    return (
      (f || (!f && !o))
        && ((l(n) !== 'body' || v(m)) && (g = (i = n) !== t(i) && r(i) ? { scrollLeft: (a = i).scrollLeft, scrollTop: a.scrollTop } : u(i)),
        r(n) ? (((b = p(n, !0)).x += n.clientLeft), (b.y += n.clientTop)) : m && (b.x = h(m))),
      {
        x: y.left + g.scrollLeft - b.x, y: y.top + g.scrollTop - b.y, width: y.width, height: y.height,
      }
    );
  }
  function g(e) {
    const t = p(e);
    let n = e.offsetWidth;
    let r = e.offsetHeight;
    return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
      x: e.offsetLeft, y: e.offsetTop, width: n, height: r,
    };
  }
  function b(e) {
    return l(e) === 'html' ? e : e.assignedSlot || e.parentNode || (o(e) ? e.host : null) || d(e);
  }
  function x(e) {
    return ['html', 'body', '#document'].indexOf(l(e)) >= 0 ? e.ownerDocument.body : r(e) && v(e) ? e : x(b(e));
  }
  function w(e, n) {
    let r;
    void 0 === n && (n = []);
    const o = x(e);
    const i = o === ((r = e.ownerDocument) == null ? void 0 : r.body);
    const a = t(o);
    const s = i ? [a].concat(a.visualViewport || [], v(o) ? o : []) : o;
    const f = n.concat(s);
    return i ? f : f.concat(w(b(s)));
  }
  function O(e) {
    return ['table', 'td', 'th'].indexOf(l(e)) >= 0;
  }
  function j(e) {
    return r(e) && m(e).position !== 'fixed' ? e.offsetParent : null;
  }
  function E(e) {
    for (var n = t(e), i = j(e); i && O(i) && m(i).position === 'static';) i = j(i);
    return i && (l(i) === 'html' || (l(i) === 'body' && m(i).position === 'static'))
      ? n
      : i
          || (function (e) {
            const t = /firefox/i.test(f());
            if (/Trident/i.test(f()) && r(e) && m(e).position === 'fixed') return null;
            let n = b(e);
            for (o(n) && (n = n.host); r(n) && ['html', 'body'].indexOf(l(n)) < 0;) {
              const i = m(n);
              if (
                i.transform !== 'none'
                || i.perspective !== 'none'
                || i.contain === 'paint'
                || ['transform', 'perspective'].indexOf(i.willChange) !== -1
                || (t && i.willChange === 'filter')
                || (t && i.filter && i.filter !== 'none')
              ) { return n; }
              n = n.parentNode;
            }
            return null;
          }(e))
          || n;
  }
  const D = 'top';
  const A = 'bottom';
  const L = 'right';
  const P = 'left';
  const M = 'auto';
  const k = [D, A, L, P];
  const W = 'start';
  const B = 'end';
  const H = 'viewport';
  const T = 'popper';
  const R = k.reduce((e, t) => e.concat([`${t}-${W}`, `${t}-${B}`]), []);
  const S = [].concat(k, [M]).reduce((e, t) => e.concat([t, `${t}-${W}`, `${t}-${B}`]), []);
  const V = ['beforeRead', 'read', 'afterRead', 'beforeMain', 'main', 'afterMain', 'beforeWrite', 'write', 'afterWrite'];
  function q(e) {
    const t = new Map();
    const n = new Set();
    const r = [];
    function o(e) {
      n.add(e.name),
      [].concat(e.requires || [], e.requiresIfExists || []).forEach((e) => {
        if (!n.has(e)) {
          const r = t.get(e);
          r && o(r);
        }
      }),
      r.push(e);
    }
    return (
      e.forEach((e) => {
        t.set(e.name, e);
      }),
      e.forEach((e) => {
        n.has(e.name) || o(e);
      }),
      r
    );
  }
  function C(e, t) {
    const n = t.getRootNode && t.getRootNode();
    if (e.contains(t)) return !0;
    if (n && o(n)) {
      let r = t;
      do {
        if (r && e.isSameNode(r)) return !0;
        r = r.parentNode || r.host;
      } while (r);
    }
    return !1;
  }
  function N(e) {
    return {
      ...e, left: e.x, top: e.y, right: e.x + e.width, bottom: e.y + e.height,
    };
  }
  function I(e, r, o) {
    return r === H
      ? N(
        (function (e, n) {
          const r = t(e);
          const o = d(e);
          const i = r.visualViewport;
          let a = o.clientWidth;
          let s = o.clientHeight;
          let f = 0;
          let p = 0;
          if (i) {
            (a = i.width), (s = i.height);
            const u = c();
            (u || (!u && n === 'fixed')) && ((f = i.offsetLeft), (p = i.offsetTop));
          }
          return {
            width: a, height: s, x: f + h(e), y: p,
          };
        }(e, o)),
      )
      : n(r)
        ? (function (e, t) {
          const n = p(e, !1, t === 'fixed');
          return (
            (n.top += e.clientTop),
            (n.left += e.clientLeft),
            (n.bottom = n.top + e.clientHeight),
            (n.right = n.left + e.clientWidth),
            (n.width = e.clientWidth),
            (n.height = e.clientHeight),
            (n.x = n.left),
            (n.y = n.top),
            n
          );
        }(r, o))
        : N(
          (function (e) {
            let t;
            const n = d(e);
            const r = u(e);
            const o = (t = e.ownerDocument) == null ? void 0 : t.body;
            const a = i(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0);
            const s = i(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0);
            let f = -r.scrollLeft + h(e);
            const c = -r.scrollTop;
            return m(o || n).direction === 'rtl' && (f += i(n.clientWidth, o ? o.clientWidth : 0) - a), {
              width: a, height: s, x: f, y: c,
            };
          }(d(e))),
        );
  }
  function _(e, t, o, s) {
    const f = t === 'clippingParents'
      ? (function (e) {
        const t = w(b(e));
        const o = ['absolute', 'fixed'].indexOf(m(e).position) >= 0 && r(e) ? E(e) : e;
        return n(o)
          ? t.filter((e) => n(e) && C(e, o) && l(e) !== 'body')
          : [];
      }(e))
      : [].concat(t);
    const c = [].concat(f, [o]);
    const p = c[0];
    const u = c.reduce((t, n) => {
      const r = I(e, n, s);
      return (t.top = i(r.top, t.top)), (t.right = a(r.right, t.right)), (t.bottom = a(r.bottom, t.bottom)), (t.left = i(r.left, t.left)), t;
    }, I(e, p, s));
    return (u.width = u.right - u.left), (u.height = u.bottom - u.top), (u.x = u.left), (u.y = u.top), u;
  }
  function F(e) {
    return e.split('-')[0];
  }
  function U(e) {
    return e.split('-')[1];
  }
  function z(e) {
    return ['top', 'bottom'].indexOf(e) >= 0 ? 'x' : 'y';
  }
  function X(e) {
    let t;
    const n = e.reference;
    const r = e.element;
    const o = e.placement;
    const i = o ? F(o) : null;
    const a = o ? U(o) : null;
    const s = n.x + n.width / 2 - r.width / 2;
    const f = n.y + n.height / 2 - r.height / 2;
    switch (i) {
      case D:
        t = { x: s, y: n.y - r.height };
        break;
      case A:
        t = { x: s, y: n.y + n.height };
        break;
      case L:
        t = { x: n.x + n.width, y: f };
        break;
      case P:
        t = { x: n.x - r.width, y: f };
        break;
      default:
        t = { x: n.x, y: n.y };
    }
    const c = i ? z(i) : null;
    if (c != null) {
      const p = c === 'y' ? 'height' : 'width';
      switch (a) {
        case W:
          t[c] = t[c] - (n[p] / 2 - r[p] / 2);
          break;
        case B:
          t[c] = t[c] + (n[p] / 2 - r[p] / 2);
      }
    }
    return t;
  }
  function Y(e) {
    return {
      top: 0, right: 0, bottom: 0, left: 0, ...e,
    };
  }
  function G(e, t) {
    return t.reduce((t, n) => ((t[n] = e), t), {});
  }
  function J(e, t) {
    void 0 === t && (t = {});
    const r = t;
    const o = r.placement;
    const i = void 0 === o ? e.placement : o;
    const a = r.strategy;
    const s = void 0 === a ? e.strategy : a;
    const f = r.boundary;
    const c = void 0 === f ? 'clippingParents' : f;
    const u = r.rootBoundary;
    const l = void 0 === u ? H : u;
    const h = r.elementContext;
    const m = void 0 === h ? T : h;
    const v = r.altBoundary;
    const y = void 0 !== v && v;
    const g = r.padding;
    const b = void 0 === g ? 0 : g;
    const x = Y(typeof b !== 'number' ? b : G(b, k));
    const w = m === T ? 'reference' : T;
    const O = e.rects.popper;
    const j = e.elements[y ? w : m];
    const E = _(n(j) ? j : j.contextElement || d(e.elements.popper), c, l, s);
    const P = p(e.elements.reference);
    const M = X({
      reference: P, element: O, strategy: 'absolute', placement: i,
    });
    const W = N({ ...O, ...M });
    const B = m === T ? W : P;
    const R = {
      top: E.top - B.top + x.top, bottom: B.bottom - E.bottom + x.bottom, left: E.left - B.left + x.left, right: B.right - E.right + x.right,
    };
    const S = e.modifiersData.offset;
    if (m === T && S) {
      const V = S[i];
      Object.keys(R).forEach((e) => {
        const t = [L, A].indexOf(e) >= 0 ? 1 : -1;
        const n = [D, A].indexOf(e) >= 0 ? 'y' : 'x';
        R[e] += V[n] * t;
      });
    }
    return R;
  }
  const K = { placement: 'bottom', modifiers: [], strategy: 'absolute' };
  function Q() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
    return !t.some((e) => !(e && typeof e.getBoundingClientRect === 'function'));
  }
  function Z(e) {
    void 0 === e && (e = {});
    const t = e;
    const r = t.defaultModifiers;
    const o = void 0 === r ? [] : r;
    const i = t.defaultOptions;
    const a = void 0 === i ? K : i;
    return function (e, t, r) {
      void 0 === r && (r = a);
      let i;
      let s;
      let f = {
        placement: 'bottom', orderedModifiers: [], options: { ...K, ...a }, modifiersData: {}, elements: { reference: e, popper: t }, attributes: {}, styles: {},
      };
      let c = [];
      let p = !1;
      var u = {
        state: f,
        setOptions(r) {
          const i = typeof r === 'function' ? r(f.options) : r;
          l(), (f.options = { ...a, ...f.options, ...i }), (f.scrollParents = { reference: n(e) ? w(e) : e.contextElement ? w(e.contextElement) : [], popper: w(t) });
          let s;
          let p;
          const d = (function (e) {
            const t = q(e);
            return V.reduce((e, n) => e.concat(
              t.filter((e) => e.phase === n),
            ), []);
          }(
            ((s = [].concat(o, f.options.modifiers)),
            (p = s.reduce((e, t) => {
              const n = e[t.name];
              return (e[t.name] = n ? ({
                ...n, ...t, options: { ...n.options, ...t.options }, data: { ...n.data, ...t.data },
              }) : t), e;
            }, {})),
            Object.keys(p).map((e) => p[e])),
          ));
          return (
            (f.orderedModifiers = d.filter((e) => e.enabled)),
            f.orderedModifiers.forEach((e) => {
              const t = e.name;
              const n = e.options;
              const r = void 0 === n ? {} : n;
              const o = e.effect;
              if (typeof o === 'function') {
                const i = o({
                  state: f, name: t, instance: u, options: r,
                });
                const a = function () {};
                c.push(i || a);
              }
            }),
            u.update()
          );
        },
        forceUpdate() {
          if (!p) {
            const e = f.elements;
            const t = e.reference;
            const n = e.popper;
            if (Q(t, n)) {
              (f.rects = { reference: y(t, E(n), f.options.strategy === 'fixed'), popper: g(n) }),
              (f.reset = !1),
              (f.placement = f.options.placement),
              f.orderedModifiers.forEach((e) => (f.modifiersData[e.name] = { ...e.data }));
              for (let r = 0; r < f.orderedModifiers.length; r++) {
                if (!0 !== f.reset) {
                  const o = f.orderedModifiers[r];
                  const i = o.fn;
                  const a = o.options;
                  const s = void 0 === a ? {} : a;
                  const c = o.name;
                  typeof i === 'function' && (f = i({
                    state: f, options: s, name: c, instance: u,
                  }) || f);
                } else (f.reset = !1), (r = -1);
              }
            }
          }
        },
        update:
            ((i = function () {
              return new Promise((e) => {
                u.forceUpdate(), e(f);
              });
            }),
            function () {
              return (
                s
                  || (s = new Promise((e) => {
                    Promise.resolve().then(() => {
                      (s = void 0), e(i());
                    });
                  })),
                s
              );
            }),
        destroy() {
          l(), (p = !0);
        },
      };
      if (!Q(e, t)) return u;
      function l() {
        c.forEach((e) => e()),
        (c = []);
      }
      return (
        u.setOptions(r).then((e) => {
          !p && r.onFirstUpdate && r.onFirstUpdate(e);
        }),
        u
      );
    };
  }
  const $ = { passive: !0 };
  const ee = {
    name: 'eventListeners',
    enabled: !0,
    phase: 'write',
    fn() {},
    effect(e) {
      const n = e.state;
      const r = e.instance;
      const o = e.options;
      const i = o.scroll;
      const a = void 0 === i || i;
      const s = o.resize;
      const f = void 0 === s || s;
      const c = t(n.elements.popper);
      const p = [].concat(n.scrollParents.reference, n.scrollParents.popper);
      return (
        a
          && p.forEach((e) => {
            e.addEventListener('scroll', r.update, $);
          }),
        f && c.addEventListener('resize', r.update, $),
        function () {
          a
            && p.forEach((e) => {
              e.removeEventListener('scroll', r.update, $);
            }),
          f && c.removeEventListener('resize', r.update, $);
        }
      );
    },
    data: {},
  };
  const te = {
    name: 'popperOffsets',
    enabled: !0,
    phase: 'read',
    fn(e) {
      const t = e.state;
      const n = e.name;
      t.modifiersData[n] = X({
        reference: t.rects.reference, element: t.rects.popper, strategy: 'absolute', placement: t.placement,
      });
    },
    data: {},
  };
  const ne = {
    top: 'auto', right: 'auto', bottom: 'auto', left: 'auto',
  };
  function re(e) {
    let n;
    const r = e.popper;
    const o = e.popperRect;
    const i = e.placement;
    const a = e.variation;
    const f = e.offsets;
    const c = e.position;
    const p = e.gpuAcceleration;
    const u = e.adaptive;
    const l = e.roundOffsets;
    const h = e.isFixed;
    const v = f.x;
    let y = void 0 === v ? 0 : v;
    const g = f.y;
    let b = void 0 === g ? 0 : g;
    const x = typeof l === 'function' ? l({ x: y, y: b }) : { x: y, y: b };
    (y = x.x), (b = x.y);
    const w = f.hasOwnProperty('x');
    const O = f.hasOwnProperty('y');
    let j = P;
    let M = D;
    const k = window;
    if (u) {
      let W = E(r);
      let H = 'clientHeight';
      let T = 'clientWidth';
      if ((W === t(r) && m((W = d(r))).position !== 'static' && c === 'absolute' && ((H = 'scrollHeight'), (T = 'scrollWidth')), (W = W), i === D || ((i === P || i === L) && a === B))) { (M = A), (b -= (h && W === k && k.visualViewport ? k.visualViewport.height : W[H]) - o.height), (b *= p ? 1 : -1); }
      if (i === P || ((i === D || i === A) && a === B)) (j = L), (y -= (h && W === k && k.visualViewport ? k.visualViewport.width : W[T]) - o.width), (y *= p ? 1 : -1);
    }
    let R;
    const S = { position: c, ...u && ne };
    const V = !0 === l
      ? (function (e, t) {
        const n = e.x;
        const r = e.y;
        const o = t.devicePixelRatio || 1;
        return { x: s(n * o) / o || 0, y: s(r * o) / o || 0 };
      }({ x: y, y: b }, t(r)))
      : { x: y, y: b };
    return (
      (y = V.x),
      (b = V.y),
      p
        ? ({

          ...S,
          ...(((R = {})[M] = O ? '0' : ''),
          (R[j] = w ? '0' : ''),
          (R.transform = (k.devicePixelRatio || 1) <= 1 ? `translate(${y}px, ${b}px)` : `translate3d(${y}px, ${b}px, 0)`),
          R),
        })
        : ({ ...S, ...(((n = {})[M] = O ? `${b}px` : ''), (n[j] = w ? `${y}px` : ''), (n.transform = ''), n) })
    );
  }
  const oe = {
    name: 'computeStyles',
    enabled: !0,
    phase: 'beforeWrite',
    fn(e) {
      const t = e.state;
      const n = e.options;
      const r = n.gpuAcceleration;
      const o = void 0 === r || r;
      const i = n.adaptive;
      const a = void 0 === i || i;
      const s = n.roundOffsets;
      const f = void 0 === s || s;
      const c = {
        placement: F(t.placement), variation: U(t.placement), popper: t.elements.popper, popperRect: t.rects.popper, gpuAcceleration: o, isFixed: t.options.strategy === 'fixed',
      };
      t.modifiersData.popperOffsets != null
        && (t.styles.popper = {
          ...t.styles.popper,
          ...re({
            ...c, offsets: t.modifiersData.popperOffsets, position: t.options.strategy, adaptive: a, roundOffsets: f,
          }),
        }),
      t.modifiersData.arrow != null
          && (t.styles.arrow = {
            ...t.styles.arrow,
            ...re({
              ...c, offsets: t.modifiersData.arrow, position: 'absolute', adaptive: !1, roundOffsets: f,
            }),
          }),
      (t.attributes.popper = { ...t.attributes.popper, 'data-popper-placement': t.placement });
    },
    data: {},
  };
  const ie = {
    name: 'applyStyles',
    enabled: !0,
    phase: 'write',
    fn(e) {
      const t = e.state;
      Object.keys(t.elements).forEach((e) => {
        const n = t.styles[e] || {};
        const o = t.attributes[e] || {};
        const i = t.elements[e];
        r(i)
          && l(i)
          && (Object.assign(i.style, n),
          Object.keys(o).forEach((e) => {
            const t = o[e];
            !1 === t ? i.removeAttribute(e) : i.setAttribute(e, !0 === t ? '' : t);
          }));
      });
    },
    effect(e) {
      const t = e.state;
      const n = {
        popper: {
          position: t.options.strategy, left: '0', top: '0', margin: '0',
        },
        arrow: { position: 'absolute' },
        reference: {},
      };
      return (
        Object.assign(t.elements.popper.style, n.popper),
        (t.styles = n),
        t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
        function () {
          Object.keys(t.elements).forEach((e) => {
            const o = t.elements[e];
            const i = t.attributes[e] || {};
            const a = Object.keys(t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]).reduce((e, t) => ((e[t] = ''), e), {});
            r(o)
              && l(o)
              && (Object.assign(o.style, a),
              Object.keys(i).forEach((e) => {
                o.removeAttribute(e);
              }));
          });
        }
      );
    },
    requires: ['computeStyles'],
  };
  const ae = {
    name: 'offset',
    enabled: !0,
    phase: 'main',
    requires: ['popperOffsets'],
    fn(e) {
      const t = e.state;
      const n = e.options;
      const r = e.name;
      const o = n.offset;
      const i = void 0 === o ? [0, 0] : o;
      const a = S.reduce((e, n) => (
        (e[n] = (function (e, t, n) {
          const r = F(e);
          const o = [P, D].indexOf(r) >= 0 ? -1 : 1;
          const i = typeof n === 'function' ? n({ ...t, placement: e }) : n;
          let a = i[0];
          let s = i[1];
          return (a = a || 0), (s = (s || 0) * o), [P, L].indexOf(r) >= 0 ? { x: s, y: a } : { x: a, y: s };
        }(n, t.rects, i))),
        e
      ), {});
      const s = a[t.placement];
      const f = s.x;
      const c = s.y;
      t.modifiersData.popperOffsets != null && ((t.modifiersData.popperOffsets.x += f), (t.modifiersData.popperOffsets.y += c)), (t.modifiersData[r] = a);
    },
  };
  const se = {
    left: 'right', right: 'left', bottom: 'top', top: 'bottom',
  };
  function fe(e) {
    return e.replace(/left|right|bottom|top/g, (e) => se[e]);
  }
  const ce = { start: 'end', end: 'start' };
  function pe(e) {
    return e.replace(/start|end/g, (e) => ce[e]);
  }
  function ue(e, t) {
    void 0 === t && (t = {});
    const n = t;
    const r = n.placement;
    const o = n.boundary;
    const i = n.rootBoundary;
    const a = n.padding;
    const s = n.flipVariations;
    const f = n.allowedAutoPlacements;
    const c = void 0 === f ? S : f;
    const p = U(r);
    const u = p
      ? s
        ? R
        : R.filter((e) => U(e) === p)
      : k;
    let l = u.filter((e) => c.indexOf(e) >= 0);
    l.length === 0 && (l = u);
    const d = l.reduce((t, n) => ((t[n] = J(e, {
      placement: n, boundary: o, rootBoundary: i, padding: a,
    })[F(n)]), t), {});
    return Object.keys(d).sort((e, t) => d[e] - d[t]);
  }
  const le = {
    name: 'flip',
    enabled: !0,
    phase: 'main',
    fn(e) {
      const t = e.state;
      const n = e.options;
      const r = e.name;
      if (!t.modifiersData[r]._skip) {
        for (
          var o = n.mainAxis,
            i = void 0 === o || o,
            a = n.altAxis,
            s = void 0 === a || a,
            f = n.fallbackPlacements,
            c = n.padding,
            p = n.boundary,
            u = n.rootBoundary,
            l = n.altBoundary,
            d = n.flipVariations,
            h = void 0 === d || d,
            m = n.allowedAutoPlacements,
            v = t.options.placement,
            y = F(v),
            g = f
              || (y === v || !h
                ? [fe(v)]
                : (function (e) {
                  if (F(e) === M) return [];
                  const t = fe(e);
                  return [pe(e), t, pe(t)];
                }(v))),
            b = [v].concat(g).reduce((e, n) => e.concat(F(n) === M ? ue(t, {
              placement: n, boundary: p, rootBoundary: u, padding: c, flipVariations: h, allowedAutoPlacements: m,
            }) : n), []),
            x = t.rects.reference,
            w = t.rects.popper,
            O = new Map(),
            j = !0,
            E = b[0],
            k = 0;
          k < b.length;
          k++
        ) {
          const B = b[k];
          const H = F(B);
          const T = U(B) === W;
          const R = [D, A].indexOf(H) >= 0;
          const S = R ? 'width' : 'height';
          const V = J(t, {
            placement: B, boundary: p, rootBoundary: u, altBoundary: l, padding: c,
          });
          let q = R ? (T ? L : P) : T ? A : D;
          x[S] > w[S] && (q = fe(q));
          const C = fe(q);
          const N = [];
          if (
            (i && N.push(V[H] <= 0),
            s && N.push(V[q] <= 0, V[C] <= 0),
            N.every((e) => e))
          ) {
            (E = B), (j = !1);
            break;
          }
          O.set(B, N);
        }
        if (j) {
          for (
            let I = function (e) {
                const t = b.find((t) => {
                  const n = O.get(t);
                  if (n) {
                    return n.slice(0, e).every((e) => e);
                  }
                });
                if (t) return (E = t), 'break';
              },
              _ = h ? 3 : 1;
            _ > 0;
            _--
          ) {
            if (I(_) === 'break') break;
          }
        }
        t.placement !== E && ((t.modifiersData[r]._skip = !0), (t.placement = E), (t.reset = !0));
      }
    },
    requiresIfExists: ['offset'],
    data: { _skip: !1 },
  };
  function de(e, t, n) {
    return i(e, a(t, n));
  }
  const he = {
    name: 'preventOverflow',
    enabled: !0,
    phase: 'main',
    fn(e) {
      const t = e.state;
      const n = e.options;
      const r = e.name;
      const o = n.mainAxis;
      const s = void 0 === o || o;
      const f = n.altAxis;
      const c = void 0 !== f && f;
      const p = n.boundary;
      const u = n.rootBoundary;
      const l = n.altBoundary;
      const d = n.padding;
      const h = n.tether;
      const m = void 0 === h || h;
      const v = n.tetherOffset;
      const y = void 0 === v ? 0 : v;
      const b = J(t, {
        boundary: p, rootBoundary: u, padding: d, altBoundary: l,
      });
      const x = F(t.placement);
      const w = U(t.placement);
      const O = !w;
      const j = z(x);
      const M = j === 'x' ? 'y' : 'x';
      const k = t.modifiersData.popperOffsets;
      const B = t.rects.reference;
      const H = t.rects.popper;
      const T = typeof y === 'function' ? y({ ...t.rects, placement: t.placement }) : y;
      const R = typeof T === 'number' ? { mainAxis: T, altAxis: T } : ({ mainAxis: 0, altAxis: 0, ...T });
      const S = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null;
      const V = { x: 0, y: 0 };
      if (k) {
        if (s) {
          let q;
          const C = j === 'y' ? D : P;
          const N = j === 'y' ? A : L;
          const I = j === 'y' ? 'height' : 'width';
          const _ = k[j];
          const X = _ + b[C];
          const Y = _ - b[N];
          const G = m ? -H[I] / 2 : 0;
          const K = w === W ? B[I] : H[I];
          const Q = w === W ? -H[I] : -B[I];
          const Z = t.elements.arrow;
          const $ = m && Z ? g(Z) : { width: 0, height: 0 };
          const ee = t.modifiersData['arrow#persistent'] ? t.modifiersData['arrow#persistent'].padding : {
            top: 0, right: 0, bottom: 0, left: 0,
          };
          const te = ee[C];
          const ne = ee[N];
          const re = de(0, B[I], $[I]);
          const oe = O ? B[I] / 2 - G - re - te - R.mainAxis : K - re - te - R.mainAxis;
          const ie = O ? -B[I] / 2 + G + re + ne + R.mainAxis : Q + re + ne + R.mainAxis;
          const ae = t.elements.arrow && E(t.elements.arrow);
          const se = ae ? (j === 'y' ? ae.clientTop || 0 : ae.clientLeft || 0) : 0;
          const fe = (q = S == null ? void 0 : S[j]) != null ? q : 0;
          const ce = _ + ie - fe;
          const pe = de(m ? a(X, _ + oe - fe - se) : X, _, m ? i(Y, ce) : Y);
          (k[j] = pe), (V[j] = pe - _);
        }
        if (c) {
          let ue;
          const le = j === 'x' ? D : P;
          const he = j === 'x' ? A : L;
          const me = k[M];
          const ve = M === 'y' ? 'height' : 'width';
          const ye = me + b[le];
          const ge = me - b[he];
          const be = [D, P].indexOf(x) !== -1;
          const xe = (ue = S == null ? void 0 : S[M]) != null ? ue : 0;
          const we = be ? ye : me - B[ve] - H[ve] - xe + R.altAxis;
          const Oe = be ? me + B[ve] + H[ve] - xe - R.altAxis : ge;
          const je = m && be
            ? (function (e, t, n) {
              const r = de(e, t, n);
              return r > n ? n : r;
            }(we, me, Oe))
            : de(m ? we : ye, me, m ? Oe : ge);
          (k[M] = je), (V[M] = je - me);
        }
        t.modifiersData[r] = V;
      }
    },
    requiresIfExists: ['offset'],
  };
  const me = {
    name: 'arrow',
    enabled: !0,
    phase: 'main',
    fn(e) {
      let t;
      const n = e.state;
      const r = e.name;
      const o = e.options;
      const i = n.elements.arrow;
      const a = n.modifiersData.popperOffsets;
      const s = F(n.placement);
      const f = z(s);
      const c = [P, L].indexOf(s) >= 0 ? 'height' : 'width';
      if (i && a) {
        const p = (function (e, t) {
          return Y(typeof (e = typeof e === 'function' ? e({ ...t.rects, placement: t.placement }) : e) !== 'number' ? e : G(e, k));
        }(o.padding, n));
        const u = g(i);
        const l = f === 'y' ? D : P;
        const d = f === 'y' ? A : L;
        const h = n.rects.reference[c] + n.rects.reference[f] - a[f] - n.rects.popper[c];
        const m = a[f] - n.rects.reference[f];
        const v = E(i);
        const y = v ? (f === 'y' ? v.clientHeight || 0 : v.clientWidth || 0) : 0;
        const b = h / 2 - m / 2;
        const x = p[l];
        const w = y - u[c] - p[d];
        const O = y / 2 - u[c] / 2 + b;
        const j = de(x, O, w);
        const M = f;
        n.modifiersData[r] = (((t = {})[M] = j), (t.centerOffset = j - O), t);
      }
    },
    effect(e) {
      const t = e.state;
      const n = e.options.element;
      let r = void 0 === n ? '[data-popper-arrow]' : n;
      r != null && (typeof r !== 'string' || (r = t.elements.popper.querySelector(r))) && C(t.elements.popper, r) && (t.elements.arrow = r);
    },
    requires: ['popperOffsets'],
    requiresIfExists: ['preventOverflow'],
  };
  function ve(e, t, n) {
    return void 0 === n && (n = { x: 0, y: 0 }), {
      top: e.top - t.height - n.y, right: e.right - t.width + n.x, bottom: e.bottom - t.height + n.y, left: e.left - t.width - n.x,
    };
  }
  function ye(e) {
    return [D, L, A, P].some((t) => e[t] >= 0);
  }
  const ge = {
    name: 'hide',
    enabled: !0,
    phase: 'main',
    requiresIfExists: ['preventOverflow'],
    fn(e) {
      const t = e.state;
      const n = e.name;
      const r = t.rects.reference;
      const o = t.rects.popper;
      const i = t.modifiersData.preventOverflow;
      const a = J(t, { elementContext: 'reference' });
      const s = J(t, { altBoundary: !0 });
      const f = ve(a, r);
      const c = ve(s, o, i);
      const p = ye(f);
      const u = ye(c);
      (t.modifiersData[n] = {
        referenceClippingOffsets: f, popperEscapeOffsets: c, isReferenceHidden: p, hasPopperEscaped: u,
      }),
      (t.attributes.popper = { ...t.attributes.popper, 'data-popper-reference-hidden': p, 'data-popper-escaped': u });
    },
  };
  const be = Z({ defaultModifiers: [ee, te, oe, ie] });
  const xe = [ee, te, oe, ie, ae, le, he, me, ge];
  const we = Z({ defaultModifiers: xe });
  (e.applyStyles = ie),
  (e.arrow = me),
  (e.computeStyles = oe),
  (e.createPopper = we),
  (e.createPopperLite = be),
  (e.defaultModifiers = xe),
  (e.detectOverflow = J),
  (e.eventListeners = ee),
  (e.flip = le),
  (e.hide = ge),
  (e.offset = ae),
  (e.popperGenerator = Z),
  (e.popperOffsets = te),
  (e.preventOverflow = he),
  Object.defineProperty(e, '__esModule', { value: !0 });
}));
// # sourceMappingURL=popper.min.js.map
// }
