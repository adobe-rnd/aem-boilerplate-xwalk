/**
 * Skipped minification because the original files appears to be already minified.
 * Original file: /npm/air-datepicker@3.3.5/air-datepicker.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
export default function () {
  return window.AirDatepicker;
}

!(function (e, t) {
  typeof exports === 'object' && typeof module === 'object'
    ? (module.exports = t())
    : typeof define === 'function' && define.amd
      ? define([], t)
      : typeof exports === 'object'
        ? (exports.AirDatepicker = window.AirDatepicker = t())
        : (window.AirDatepicker = t());
}(this, () => (function () {
  var e = {
    d(t, i) {
      for (const s in i) e.o(i, s) && !e.o(t, s) && Object.defineProperty(t, s, { enumerable: !0, get: i[s] });
    },
    o(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    },
  };
  const t = {};
  e.d(t, {
    default() {
      return K;
    },
  });
  const i = {
    days: 'days',
    months: 'months',
    years: 'years',
    day: 'day',
    month: 'month',
    year: 'year',
    eventChangeViewDate: 'changeViewDate',
    eventChangeCurrentView: 'changeCurrentView',
    eventChangeFocusDate: 'changeFocusDate',
    eventChangeSelectedDate: 'changeSelectedDate',
    eventChangeTime: 'changeTime',
    eventChangeLastSelectedDate: 'changeLastSelectedDate',
    actionSelectDate: 'selectDate',
    actionUnselectDate: 'unselectDate',
    cssClassWeekend: '-weekend-',
  };
  const s = {
    classes: '',
    inline: !1,
    locale: {
      days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
      daysShort: ['Вос', 'Пон', 'Вто', 'Сре', 'Чет', 'Пят', 'Суб'],
      daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
      today: 'Сегодня',
      clear: 'Очистить',
      dateFormat: 'dd.MM.yyyy',
      timeFormat: 'HH:mm',
      firstDay: 1,
    },
    startDate: new Date(),
    firstDay: '',
    weekends: [6, 0],
    dateFormat: '',
    altField: '',
    altFieldDateFormat: 'T',
    toggleSelected: !0,
    keyboardNav: !0,
    selectedDates: !1,
    container: '',
    isMobile: !1,
    visible: !1,
    position: 'bottom left',
    offset: 12,
    view: i.days,
    minView: i.days,
    showOtherMonths: !0,
    selectOtherMonths: !0,
    moveToOtherMonthsOnSelect: !0,
    showOtherYears: !0,
    selectOtherYears: !0,
    moveToOtherYearsOnSelect: !0,
    minDate: '',
    maxDate: '',
    disableNavWhenOutOfRange: !0,
    multipleDates: !1,
    multipleDatesSeparator: ', ',
    range: !1,
    dynamicRange: !0,
    buttons: !1,
    monthsField: 'monthsShort',
    showEvent: 'focus',
    autoClose: !1,
    prevHtml: '<svg><path d="M 17,12 l -5,5 l 5,5"></path></svg>',
    nextHtml: '<svg><path d="M 14,12 l 5,5 l -5,5"></path></svg>',
    navTitles: { days: 'MMMM, <i>yyyy</i>', months: 'yyyy', years: 'yyyy1 - yyyy2' },
    timepicker: !1,
    onlyTimepicker: !1,
    dateTimeSeparator: ' ',
    timeFormat: '',
    minHours: 0,
    maxHours: 24,
    minMinutes: 0,
    maxMinutes: 59,
    hoursStep: 1,
    minutesStep: 1,
    onSelect: !1,
    onChangeViewDate: !1,
    onChangeView: !1,
    onRenderCell: !1,
    onShow: !1,
    onHide: !1,
    onClickDayName: !1,
  };
  function a(e) {
    const t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : document;
    return typeof e === 'string' ? t.querySelector(e) : e;
  }
  function n() {
    const {
      tagName: e = 'div', className: t = '', innerHtml: i = '', id: s = '', attrs: a = {},
    } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    const n = document.createElement(e);
    return t && n.classList.add(...t.split(' ')), s && (n.id = s), i && (n.innerHTML = i), a && r(n, a), n;
  }
  function r(e, t) {
    for (const [i, s] of Object.entries(t)) void 0 !== s && e.setAttribute(i, s);
    return e;
  }
  function h(e) {
    return new Date(e.getFullYear(), e.getMonth() + 1, 0).getDate();
  }
  function o(e) {
    const t = e.getHours();
    const { hours: i, dayPeriod: s } = l(t);
    return {
      year: e.getFullYear(),
      month: e.getMonth(),
      fullMonth: e.getMonth() + 1 < 10 ? `0${e.getMonth() + 1}` : e.getMonth() + 1,
      date: e.getDate(),
      fullDate: e.getDate() < 10 ? `0${e.getDate()}` : e.getDate(),
      day: e.getDay(),
      hours: t,
      fullHours: d(t),
      hours12: i,
      dayPeriod: s,
      fullHours12: d(i),
      minutes: e.getMinutes(),
      fullMinutes: e.getMinutes() < 10 ? `0${e.getMinutes()}` : e.getMinutes(),
    };
  }
  function l(e) {
    return { dayPeriod: e > 11 ? 'pm' : 'am', hours: e % 12 == 0 ? 12 : e % 12 };
  }
  function d(e) {
    return e < 10 ? `0${e}` : e;
  }
  function c(e) {
    const t = 10 * Math.floor(e.getFullYear() / 10);
    return [t, t + 9];
  }
  function u() {
    const e = [];
    for (var t = arguments.length, i = new Array(t), s = 0; s < t; s++) i[s] = arguments[s];
    return (
      i.forEach((t) => {
        if (typeof t === 'object') for (const i in t) t[i] && e.push(i);
        else t && e.push(t);
      }),
      e.join(' ')
    );
  }
  function p(e, t) {
    const s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : i.days;
    if (!e || !t) return !1;
    const a = o(e);
    const n = o(t);
    const r = { [i.days]: a.date === n.date && a.month === n.month && a.year === n.year, [i.months]: a.month === n.month && a.year === n.year, [i.years]: a.year === n.year };
    return r[s];
  }
  function m(e, t, i) {
    const s = g(e, !1).getTime();
    const a = g(t, !1).getTime();
    return i ? s >= a : s > a;
  }
  function v(e, t) {
    return !m(e, t, !0);
  }
  function g(e) {
    const t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
    const i = new Date(e.getTime());
    return typeof t !== 'boolean' || t || D(i), i;
  }
  function D(e) {
    return e.setHours(0, 0, 0, 0), e;
  }
  function y(e, t, i) {
    e.length
      ? e.forEach((e) => {
        e.addEventListener(t, i);
      })
      : e.addEventListener(t, i);
  }
  function f(e, t) {
    return !(!e || e === document || e instanceof DocumentFragment) && (e.matches(t) ? e : f(e.parentNode, t));
  }
  function w(e, t, i) {
    return e > i ? i : e < t ? t : e;
  }
  function b(e) {
    for (var t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++) i[s - 1] = arguments[s];
    return (
      i
        .filter((e) => e)
        .forEach((t) => {
          for (const [i, s] of Object.entries(t)) {
            if (void 0 !== s && s.toString() === '[object Object]') {
              const t = void 0 !== e[i] ? e[i].toString() : void 0;
              const a = s.toString();
              const n = Array.isArray(s) ? [] : {};
              (e[i] = e[i] ? (t !== a ? n : e[i]) : n), b(e[i], s);
            } else e[i] = s;
          }
        }),
      e
    );
  }
  function k(e) {
    let t = e;
    return e instanceof Date || (t = new Date(e)), isNaN(t.getTime()) && (console.log(`Unable to convert value "${e}" to Date object`), (t = !1)), t;
  }
  function C(e) {
    const t = '\\s|\\.|-|/|\\\\|,|\\$|\\!|\\?|:|;';
    return new RegExp(`(^|>|${t})(${e})($|<|${t})`, 'g');
  }
  function $(e, t, i) {
    return (
      (t = (function (e) {
        const t = (function (e, t) {
          if (typeof e !== 'object' || e === null) return e;
          const i = e[Symbol.toPrimitive];
          if (void 0 !== i) {
            const s = i.call(e, t);
            if (typeof s !== 'object') return s;
            throw new TypeError('@@toPrimitive must return a primitive value.');
          }
          return String(e);
        }(e, 'string'));
        return typeof t === 'symbol' ? t : String(t);
      }(t))) in e
        ? Object.defineProperty(e, t, {
          value: i, enumerable: !0, configurable: !0, writable: !0,
        })
        : (e[t] = i),
      e
    );
  }
  class _ {
    constructor() {
      const {
        type: e, date: t, dp: i, opts: s, body: a,
      } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      $(this, 'focus', () => {
        this.$cell.classList.add('-focus-'), (this.focused = !0);
      }),
      $(this, 'removeFocus', () => {
        this.$cell.classList.remove('-focus-'), (this.focused = !1);
      }),
      $(this, 'select', () => {
        this.$cell.classList.add('-selected-'), (this.selected = !0);
      }),
      $(this, 'removeSelect', () => {
        this.$cell.classList.remove('-selected-', '-range-from-', '-range-to-'), (this.selected = !1);
      }),
      $(this, 'onChangeSelectedDate', () => {
        this.isDisabled || (this._handleSelectedStatus(), this.opts.range && this._handleRangeStatus());
      }),
      $(this, 'onChangeFocusDate', (e) => {
        if (!e) return void (this.focused && this.removeFocus());
        const t = p(e, this.date, this.type);
        t ? this.focus() : !t && this.focused && this.removeFocus(), this.opts.range && this._handleRangeStatus();
      }),
      $(this, 'render', () => ((this.$cell.innerHTML = this._getHtml()), (this.$cell.adpCell = this), this.$cell)),
      (this.type = e),
      (this.singleType = this.type.slice(0, -1)),
      (this.date = t),
      (this.dp = i),
      (this.opts = s),
      (this.body = a),
      (this.customData = !1),
      this.init();
    }

    init() {
      const { range: e, onRenderCell: t } = this.opts;
      t && (this.customData = t({ date: this.date, cellType: this.singleType, datepicker: this.dp })),
      this._createElement(),
      this._bindDatepickerEvents(),
      this._handleInitialFocusStatus(),
      this.dp.hasSelectedDates && (this._handleSelectedStatus(), e && this._handleRangeStatus());
    }

    _bindDatepickerEvents() {
      this.dp.on(i.eventChangeSelectedDate, this.onChangeSelectedDate), this.dp.on(i.eventChangeFocusDate, this.onChangeFocusDate);
    }

    unbindDatepickerEvents() {
      this.dp.off(i.eventChangeSelectedDate, this.onChangeSelectedDate), this.dp.off(i.eventChangeFocusDate, this.onChangeFocusDate);
    }

    _createElement() {
      let e;
      const { year: t, month: i, date: s } = o(this.date);
      const a = ((e = this.customData) === null || void 0 === e ? void 0 : e.attrs) || {};
      this.$cell = n({
        className: this._getClassName(),
        attrs: {
          'data-year': t, 'data-month': i, 'data-date': s, ...a,
        },
      });
    }

    _getClassName() {
      let e; let
        t;
      const s = new Date();
      const { selectOtherMonths: a, selectOtherYears: n } = this.opts;
      const { minDate: r, maxDate: h } = this.dp;
      const { day: l } = o(this.date);
      const d = this._isOutOfMinMaxRange();
      const c = (e = this.customData) === null || void 0 === e ? void 0 : e.disabled;
      const m = u('air-datepicker-cell', `-${this.singleType}-`, {
        '-current-': p(s, this.date, this.type),
        '-min-date-': r && p(r, this.date, this.type),
        '-max-date-': h && p(h, this.date, this.type),
      });
      let v = '';
      switch (this.type) {
        case i.days:
          v = u({ '-weekend-': this.dp.isWeekend(l), '-other-month-': this.isOtherMonth, '-disabled-': (this.isOtherMonth && !a) || d || c });
          break;
        case i.months:
          v = u({ '-disabled-': d || c });
          break;
        case i.years:
          v = u({ '-other-decade-': this.isOtherDecade, '-disabled-': d || (this.isOtherDecade && !n) || c });
      }
      return u(m, v, (t = this.customData) === null || void 0 === t ? void 0 : t.classes);
    }

    _getHtml() {
      let e;
      const { year: t, month: s, date: a } = o(this.date);
      const { showOtherMonths: n, showOtherYears: r } = this.opts;
      if ((e = this.customData) !== null && void 0 !== e && e.html) return this.customData.html;
      switch (this.type) {
        case i.days:
          return !n && this.isOtherMonth ? '' : a;
        case i.months:
          return this.dp.locale[this.opts.monthsField][s];
        case i.years:
          return !r && this.isOtherDecade ? '' : t;
      }
    }

    _isOutOfMinMaxRange() {
      const { minDate: e, maxDate: t } = this.dp;
      const { type: s, date: a } = this;
      const { month: n, year: r, date: h } = o(a);
      const l = s === i.days;
      const d = s === i.years;
      const c = !!e && new Date(r, d ? e.getMonth() : n, l ? h : e.getDate());
      const u = !!t && new Date(r, d ? t.getMonth() : n, l ? h : t.getDate());
      return e && t ? v(c, e) || m(u, t) : e ? v(c, e) : t ? m(u, t) : void 0;
    }

    destroy() {
      this.unbindDatepickerEvents();
    }

    _handleRangeStatus() {
      const { rangeDateFrom: e, rangeDateTo: t } = this.dp;
      const i = u({ '-in-range-': e && t && ((s = this.date), (a = e), (n = t), m(s, a) && v(s, n)), '-range-from-': e && p(this.date, e, this.type), '-range-to-': t && p(this.date, t, this.type) });
      let s; let a; let
        n;
      this.$cell.classList.remove('-range-from-', '-range-to-', '-in-range-'), i && this.$cell.classList.add(...i.split(' '));
    }

    _handleSelectedStatus() {
      const e = this.dp._checkIfDateIsSelected(this.date, this.type);
      e ? this.select() : !e && this.selected && this.removeSelect();
    }

    _handleInitialFocusStatus() {
      p(this.dp.focusDate, this.date, this.type) && this.focus();
    }

    get isDisabled() {
      return this.$cell.matches('.-disabled-');
    }

    get isOtherMonth() {
      return this.dp.isOtherMonth(this.date);
    }

    get isOtherDecade() {
      return this.dp.isOtherDecade(this.date);
    }
  }
  function M(e, t, i) {
    return (
      (t = (function (e) {
        const t = (function (e, t) {
          if (typeof e !== 'object' || e === null) return e;
          const i = e[Symbol.toPrimitive];
          if (void 0 !== i) {
            const s = i.call(e, t);
            if (typeof s !== 'object') return s;
            throw new TypeError('@@toPrimitive must return a primitive value.');
          }
          return String(e);
        }(e, 'string'));
        return typeof t === 'symbol' ? t : String(t);
      }(t))) in e
        ? Object.defineProperty(e, t, {
          value: i, enumerable: !0, configurable: !0, writable: !0,
        })
        : (e[t] = i),
      e
    );
  }
  const S = {
    [i.days]: `<div class="air-datepicker-body--day-names"></div><div class="air-datepicker-body--cells -${i.days}-"></div>`,
    [i.months]: `<div class="air-datepicker-body--cells -${i.months}-"></div>`,
    [i.years]: `<div class="air-datepicker-body--cells -${i.years}-"></div>`,
  };
  const T = '.air-datepicker-cell';
  class F {
    constructor(e) {
      const { dp: t, type: s, opts: a } = e;
      M(this, 'handleClick', (e) => {
        const t = e.target.closest(T).adpCell;
        if (t.isDisabled) return;
        if (!this.dp.isMinViewReached) return void this.dp.down();
        const i = this.dp._checkIfDateIsSelected(t.date, t.type);
        i ? this.dp._handleAlreadySelectedDates(i, t.date) : this.dp.selectDate(t.date);
      }),
      M(this, 'handleDayNameClick', (e) => {
        const t = e.target.getAttribute('data-day-index');
        this.opts.onClickDayName({ dayIndex: Number(t), datepicker: this.dp });
      }),
      M(this, 'onChangeCurrentView', (e) => {
        e !== this.type ? this.hide() : (this.show(), this.render());
      }),
      M(this, 'onMouseOverCell', (e) => {
        const t = f(e.target, T);
        this.dp.setFocusDate(!!t && t.adpCell.date);
      }),
      M(this, 'onMouseOutCell', () => {
        this.dp.setFocusDate(!1);
      }),
      M(this, 'onClickBody', (e) => {
        const { onClickDayName: t } = this.opts;
        const i = e.target;
        i.closest(T) && this.handleClick(e), t && i.closest('.air-datepicker-body--day-name') && this.handleDayNameClick(e);
      }),
      M(this, 'onMouseDown', (e) => {
        this.pressed = !0;
        const t = f(e.target, T);
        const i = t && t.adpCell;
        p(i.date, this.dp.rangeDateFrom) && (this.rangeFromFocused = !0), p(i.date, this.dp.rangeDateTo) && (this.rangeToFocused = !0);
      }),
      M(this, 'onMouseMove', (e) => {
        if (!this.pressed || !this.dp.isMinViewReached) return;
        e.preventDefault();
        const t = f(e.target, T);
        const i = t && t.adpCell;
        const { selectedDates: s, rangeDateTo: a, rangeDateFrom: n } = this.dp;
        if (!i || i.isDisabled) return;
        const { date: r } = i;
        if (s.length === 2) {
          if (this.rangeFromFocused && !m(r, a)) {
            const { hours: e, minutes: t } = o(n);
            r.setHours(e), r.setMinutes(t), (this.dp.rangeDateFrom = r), this.dp.replaceDate(n, r);
          }
          if (this.rangeToFocused && !v(r, n)) {
            const { hours: e, minutes: t } = o(a);
            r.setHours(e), r.setMinutes(t), (this.dp.rangeDateTo = r), this.dp.replaceDate(a, r);
          }
        }
      }),
      M(this, 'onMouseUp', () => {
        (this.pressed = !1), (this.rangeFromFocused = !1), (this.rangeToFocused = !1);
      }),
      M(this, 'onChangeViewDate', (e, t) => {
        if (!this.isVisible) return;
        const s = c(e);
        const a = c(t);
        switch (this.dp.currentView) {
          case i.days:
            if (p(e, t, i.months)) return;
            break;
          case i.months:
            if (p(e, t, i.years)) return;
            break;
          case i.years:
            if (s[0] === a[0] && s[1] === a[1]) return;
        }
        this.render();
      }),
      M(this, 'render', () => {
        this.destroyCells(),
        this._generateCells(),
        this.cells.forEach((e) => {
          this.$cells.appendChild(e.render());
        });
      }),
      (this.dp = t),
      (this.type = s),
      (this.opts = a),
      (this.cells = []),
      (this.$el = ''),
      (this.pressed = !1),
      (this.isVisible = !0),
      this.init();
    }

    init() {
      this._buildBaseHtml(), this.type === i.days && this.renderDayNames(), this.render(), this._bindEvents(), this._bindDatepickerEvents();
    }

    _bindEvents() {
      const { range: e, dynamicRange: t } = this.opts;
      y(this.$el, 'mouseover', this.onMouseOverCell),
      y(this.$el, 'mouseout', this.onMouseOutCell),
      y(this.$el, 'click', this.onClickBody),
      e && t && (y(this.$el, 'mousedown', this.onMouseDown), y(this.$el, 'mousemove', this.onMouseMove), y(window.document, 'mouseup', this.onMouseUp));
    }

    _bindDatepickerEvents() {
      this.dp.on(i.eventChangeViewDate, this.onChangeViewDate), this.dp.on(i.eventChangeCurrentView, this.onChangeCurrentView);
    }

    _buildBaseHtml() {
      (this.$el = n({ className: `air-datepicker-body -${this.type}-`, innerHtml: S[this.type] })),
      (this.$names = a('.air-datepicker-body--day-names', this.$el)),
      (this.$cells = a('.air-datepicker-body--cells', this.$el));
    }

    _getDayNamesHtml() {
      const e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.dp.locale.firstDay;
      let t = '';
      const s = this.dp.isWeekend;
      const { onClickDayName: a } = this.opts;
      let n = e;
      let r = 0;
      for (; r < 7;) {
        const e = n % 7;
        (t += `<div class="${u('air-datepicker-body--day-name', { [i.cssClassWeekend]: s(e), '-clickable-': !!a })}" data-day-index='${e}'>${this.dp.locale.daysMin[e]}</div>`), r++, n++;
      }
      return t;
    }

    _getDaysCells() {
      const {
        viewDate: e,
        locale: { firstDay: t },
      } = this.dp;
      const i = h(e);
      const { year: s, month: a } = o(e);
      const n = new Date(s, a, 1);
      const r = new Date(s, a, i);
      let l = n.getDay() - t;
      let d = 6 - r.getDay() + t;
      (l = l < 0 ? l + 7 : l), (d = d > 6 ? d - 7 : d);
      const c = (function (e, t) {
        const { year: i, month: s, date: a } = o(e);
        return new Date(i, s, a - t);
      }(n, l));
      const u = i + l + d;
      const p = c.getDate();
      const { year: m, month: v } = o(c);
      let g = 0;
      for (; g < u;) {
        const e = new Date(m, v, p + g);
        this._generateCell(e), g++;
      }
    }

    _generateCell(e) {
      const { type: t, dp: i, opts: s } = this;
      const a = new _({
        type: t, dp: i, opts: s, date: e, body: this,
      });
      return this.cells.push(a), a;
    }

    _generateDayCells() {
      this._getDaysCells();
    }

    _generateMonthCells() {
      const { year: e } = this.dp.parsedViewDate;
      let t = 0;
      for (; t < 12;) this.cells.push(this._generateCell(new Date(e, t))), t++;
    }

    _generateYearCells() {
      const e = c(this.dp.viewDate);
      const t = e[0] - 1;
      const i = e[1] + 1;
      let s = t;
      for (; s <= i;) this.cells.push(this._generateCell(new Date(s, 0))), s++;
    }

    renderDayNames() {
      this.$names.innerHTML = this._getDayNamesHtml();
    }

    _generateCells() {
      switch (this.type) {
        case i.days:
          this._generateDayCells();
          break;
        case i.months:
          this._generateMonthCells();
          break;
        case i.years:
          this._generateYearCells();
      }
    }

    show() {
      (this.isVisible = !0), this.$el.classList.remove('-hidden-');
    }

    hide() {
      (this.isVisible = !1), this.$el.classList.add('-hidden-');
    }

    destroyCells() {
      this.cells.forEach((e) => e.destroy()), (this.cells = []), (this.$cells.innerHTML = '');
    }

    destroy() {
      this.destroyCells(), this.dp.off(i.eventChangeViewDate, this.onChangeViewDate), this.dp.off(i.eventChangeCurrentView, this.onChangeCurrentView);
    }
  }
  function V(e, t, i) {
    return (
      (t = (function (e) {
        const t = (function (e, t) {
          if (typeof e !== 'object' || e === null) return e;
          const i = e[Symbol.toPrimitive];
          if (void 0 !== i) {
            const s = i.call(e, t);
            if (typeof s !== 'object') return s;
            throw new TypeError('@@toPrimitive must return a primitive value.');
          }
          return String(e);
        }(e, 'string'));
        return typeof t === 'symbol' ? t : String(t);
      }(t))) in e
        ? Object.defineProperty(e, t, {
          value: i, enumerable: !0, configurable: !0, writable: !0,
        })
        : (e[t] = i),
      e
    );
  }
  class x {
    constructor(e) {
      const { dp: t, opts: i } = e;
      V(this, 'onClickNav', (e) => {
        const t = f(e.target, '.air-datepicker-nav--action');
        if (!t) return;
        const i = t.dataset.action;
        this.dp[i]();
      }),
      V(this, 'onChangeViewDate', () => {
        this.render(), this._resetNavStatus(), this.handleNavStatus();
      }),
      V(this, 'onChangeCurrentView', () => {
        this.render(), this._resetNavStatus(), this.handleNavStatus();
      }),
      V(this, 'onClickNavTitle', () => {
        this.dp.isFinalView || this.dp.up();
      }),
      V(this, 'update', () => {
        const { prevHtml: e, nextHtml: t } = this.opts;
        (this.$prev.innerHTML = e), (this.$next.innerHTML = t), this._resetNavStatus(), this.render(), this.handleNavStatus();
      }),
      V(this, 'renderDelay', () => {
        setTimeout(this.render);
      }),
      V(this, 'render', () => {
        (this.$title.innerHTML = this._getTitle()),
        (function (e, t) {
          for (const i in t) t[i] ? e.classList.add(i) : e.classList.remove(i);
        }(this.$title, { '-disabled-': this.dp.isFinalView }));
      }),
      (this.dp = t),
      (this.opts = i),
      this.init();
    }

    init() {
      this._createElement(), this._buildBaseHtml(), this._defineDOM(), this.render(), this.handleNavStatus(), this._bindEvents(), this._bindDatepickerEvents();
    }

    _defineDOM() {
      (this.$title = a('.air-datepicker-nav--title', this.$el)), (this.$prev = a('[data-action="prev"]', this.$el)), (this.$next = a('[data-action="next"]', this.$el));
    }

    _bindEvents() {
      this.$el.addEventListener('click', this.onClickNav), this.$title.addEventListener('click', this.onClickNavTitle);
    }

    _bindDatepickerEvents() {
      this.dp.on(i.eventChangeViewDate, this.onChangeViewDate),
      this.dp.on(i.eventChangeCurrentView, this.onChangeCurrentView),
      this.isNavIsFunction && (this.dp.on(i.eventChangeSelectedDate, this.renderDelay), this.dp.opts.timepicker && this.dp.on(i.eventChangeTime, this.render));
    }

    destroy() {
      this.dp.off(i.eventChangeViewDate, this.onChangeViewDate),
      this.dp.off(i.eventChangeCurrentView, this.onChangeCurrentView),
      this.isNavIsFunction && (this.dp.off(i.eventChangeSelectedDate, this.renderDelay), this.dp.opts.timepicker && this.dp.off(i.eventChangeTime, this.render));
    }

    _createElement() {
      this.$el = n({ tagName: 'nav', className: 'air-datepicker-nav' });
    }

    _getTitle() {
      const { dp: e, opts: t } = this;
      const i = t.navTitles[e.currentView];
      return typeof i === 'function' ? i(e) : e.formatDate(e.viewDate, i);
    }

    handleNavStatus() {
      const { disableNavWhenOutOfRange: e } = this.opts;
      const { minDate: t, maxDate: s } = this.dp;
      if ((!t && !s) || !e) return;
      const { year: a, month: n } = this.dp.parsedViewDate;
      const r = !!t && o(t);
      const h = !!s && o(s);
      switch (this.dp.currentView) {
        case i.days:
          t && r.month >= n && r.year >= a && this._disableNav('prev'), s && h.month <= n && h.year <= a && this._disableNav('next');
          break;
        case i.months:
          t && r.year >= a && this._disableNav('prev'), s && h.year <= a && this._disableNav('next');
          break;
        case i.years: {
          const e = c(this.dp.viewDate);
          t && r.year >= e[0] && this._disableNav('prev'), s && h.year <= e[1] && this._disableNav('next');
          break;
        }
      }
    }

    _disableNav(e) {
      a(`[data-action="${e}"]`, this.$el).classList.add('-disabled-');
    }

    _resetNavStatus() {
      !(function (e) {
        for (var t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++) i[s - 1] = arguments[s];
        e.length
          ? e.forEach((e) => {
            e.classList.remove(...i);
          })
          : e.classList.remove(...i);
      }(this.$el.querySelectorAll('.air-datepicker-nav--action'), '-disabled-'));
    }

    _buildBaseHtml() {
      const { prevHtml: e, nextHtml: t } = this.opts;
      this.$el.innerHTML = `<div class="air-datepicker-nav--action" data-action="prev">${e}</div><div class="air-datepicker-nav--title"></div><div class="air-datepicker-nav--action" data-action="next">${t}</div>`;
    }

    get isNavIsFunction() {
      const { navTitles: e } = this.opts;
      return Object.keys(e).find((t) => typeof e[t] === 'function');
    }
  }
  const H = { today: { content: (e) => e.locale.today, onClick: (e) => e.setViewDate(new Date()) }, clear: { content: (e) => e.locale.clear, onClick: (e) => e.clear() } };
  class E {
    constructor(e) {
      const { dp: t, opts: i } = e;
      (this.dp = t), (this.opts = i), this.init();
    }

    init() {
      this.createElement(), this.render();
    }

    createElement() {
      this.$el = n({ className: 'air-datepicker-buttons' });
    }

    destroy() {
      this.$el.parentNode.removeChild(this.$el);
    }

    clearHtml() {
      return (this.$el.innerHTML = ''), this;
    }

    generateButtons() {
      let { buttons: e } = this.opts;
      Array.isArray(e) || (e = [e]),
      e.forEach((e) => {
        let t = e;
        typeof e === 'string' && H[e] && (t = H[e]);
        const i = this.createButton(t);
        t.onClick && this.attachEventToButton(i, t.onClick), this.$el.appendChild(i);
      });
    }

    attachEventToButton(e, t) {
      e.addEventListener('click', () => {
        t(this.dp);
      });
    }

    createButton(e) {
      const {
        content: t, className: i, tagName: s = 'button', attrs: a = {},
      } = e;
      return n({
        tagName: s, innerHtml: `<span tabindex='-1'>${typeof t === 'function' ? t(this.dp) : t}</span>`, className: u('air-datepicker-button', i), attrs: a,
      });
    }

    render() {
      this.generateButtons();
    }
  }
  function L(e, t, i) {
    return (
      (t = (function (e) {
        const t = (function (e, t) {
          if (typeof e !== 'object' || e === null) return e;
          const i = e[Symbol.toPrimitive];
          if (void 0 !== i) {
            const s = i.call(e, t);
            if (typeof s !== 'object') return s;
            throw new TypeError('@@toPrimitive must return a primitive value.');
          }
          return String(e);
        }(e, 'string'));
        return typeof t === 'symbol' ? t : String(t);
      }(t))) in e
        ? Object.defineProperty(e, t, {
          value: i, enumerable: !0, configurable: !0, writable: !0,
        })
        : (e[t] = i),
      e
    );
  }
  class O {
    constructor() {
      const { opts: e, dp: t } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      L(this, 'toggleTimepickerIsActive', (e) => {
        this.dp.timepickerIsActive = e;
      }),
      L(this, 'onChangeSelectedDate', (e) => {
        const { date: t, updateTime: i = !1 } = e;
        t && (this.setMinMaxTime(t), this.setCurrentTime(!!i && t), this.addTimeToDate(t));
      }),
      L(this, 'onChangeLastSelectedDate', (e) => {
        e && (this.setTime(e), this.render());
      }),
      L(this, 'onChangeInputRange', (e) => {
        const t = e.target;
        (this[t.getAttribute('name')] = t.value), this.updateText(), this.dp.trigger(i.eventChangeTime, { hours: this.hours, minutes: this.minutes });
      }),
      L(this, 'onMouseEnterLeave', (e) => {
        const t = e.target.getAttribute('name');
        let i = this.$minutesText;
        t === 'hours' && (i = this.$hoursText), i.classList.toggle('-focus-');
      }),
      L(this, 'onFocus', () => {
        this.toggleTimepickerIsActive(!0);
      }),
      L(this, 'onBlur', () => {
        this.toggleTimepickerIsActive(!1);
      }),
      (this.opts = e),
      (this.dp = t);
      const { timeFormat: s } = this.dp.locale;
      s && (s.match(C('h')) || s.match(C('hh'))) && (this.ampm = !0), this.init();
    }

    init() {
      this.setTime(this.dp.lastSelectedDate || this.dp.viewDate), this.createElement(), this.buildHtml(), this.defineDOM(), this.render(), this.bindDatepickerEvents(), this.bindDOMEvents();
    }

    bindDatepickerEvents() {
      this.dp.on(i.eventChangeSelectedDate, this.onChangeSelectedDate), this.dp.on(i.eventChangeLastSelectedDate, this.onChangeLastSelectedDate);
    }

    bindDOMEvents() {
      let e = 'input';
      navigator.userAgent.match(/trident/gi) && (e = 'change'),
      y(this.$ranges, e, this.onChangeInputRange),
      y(this.$ranges, 'mouseenter', this.onMouseEnterLeave),
      y(this.$ranges, 'mouseleave', this.onMouseEnterLeave),
      y(this.$ranges, 'focus', this.onFocus),
      y(this.$ranges, 'mousedown', this.onFocus),
      y(this.$ranges, 'blur', this.onBlur);
    }

    createElement() {
      this.$el = n({ className: u('air-datepicker-time', { '-am-pm-': this.dp.ampm }) });
    }

    destroy() {
      this.dp.off(i.eventChangeSelectedDate, this.onChangeSelectedDate), this.dp.off(i.eventChangeLastSelectedDate, this.onChangeLastSelectedDate), this.$el.parentNode.removeChild(this.$el);
    }

    buildHtml() {
      const {
        ampm: e,
        hours: t,
        displayHours: i,
        minutes: s,
        minHours: a,
        minMinutes: n,
        maxHours: r,
        maxMinutes: h,
        dayPeriod: o,
        opts: { hoursStep: l, minutesStep: c },
      } = this;
      this.$el.innerHTML = `<div class="air-datepicker-time--current">   <span class="air-datepicker-time--current-hours">${d(
        i,
      )}</span>   <span class="air-datepicker-time--current-colon">:</span>   <span class="air-datepicker-time--current-minutes">${d(s)}</span>   ${
        e ? `<span class='air-datepicker-time--current-ampm'>${o}</span>` : ''
      }</div><div class="air-datepicker-time--sliders">   <div class="air-datepicker-time--row">`
          + `      <input type="range" name="hours" value="${t}" min="${a}" max="${r}" step="${l}"/>   </div>   <div class="air-datepicker-time--row">`
          + `      <input type="range" name="minutes" value="${s}" min="${n}" max="${h}" step="${c}"/>   </div></div>`;
    }

    defineDOM() {
      const e = (e) => a(e, this.$el);
      (this.$ranges = this.$el.querySelectorAll('[type="range"]')),
      (this.$hours = e('[name="hours"]')),
      (this.$minutes = e('[name="minutes"]')),
      (this.$hoursText = e('.air-datepicker-time--current-hours')),
      (this.$minutesText = e('.air-datepicker-time--current-minutes')),
      (this.$ampm = e('.air-datepicker-time--current-ampm'));
    }

    setTime(e) {
      this.setMinMaxTime(e), this.setCurrentTime(e);
    }

    addTimeToDate(e) {
      e && (e.setHours(this.hours), e.setMinutes(this.minutes));
    }

    setMinMaxTime(e) {
      if ((this.setMinMaxTimeFromOptions(), e)) {
        const { minDate: t, maxDate: i } = this.dp;
        t && p(e, t) && this.setMinTimeFromMinDate(t), i && p(e, i) && this.setMaxTimeFromMaxDate(i);
      }
    }

    setCurrentTime(e) {
      const { hours: t, minutes: i } = e ? o(e) : this;
      (this.hours = w(t, this.minHours, this.maxHours)), (this.minutes = w(i, this.minMinutes, this.maxMinutes));
    }

    setMinMaxTimeFromOptions() {
      const {
        minHours: e, minMinutes: t, maxHours: i, maxMinutes: s,
      } = this.opts;
      (this.minHours = w(e, 0, 23)), (this.minMinutes = w(t, 0, 59)), (this.maxHours = w(i, 0, 23)), (this.maxMinutes = w(s, 0, 59));
    }

    setMinTimeFromMinDate(e) {
      const { lastSelectedDate: t } = this.dp;
      (this.minHours = e.getHours()), t && t.getHours() > e.getHours() ? (this.minMinutes = this.opts.minMinutes) : (this.minMinutes = e.getMinutes());
    }

    setMaxTimeFromMaxDate(e) {
      const { lastSelectedDate: t } = this.dp;
      (this.maxHours = e.getHours()), t && t.getHours() < e.getHours() ? (this.maxMinutes = this.opts.maxMinutes) : (this.maxMinutes = e.getMinutes());
    }

    updateSliders() {
      (r(this.$hours, { min: this.minHours, max: this.maxHours }).value = this.hours), (r(this.$minutes, { min: this.minMinutes, max: this.maxMinutes }).value = this.minutes);
    }

    updateText() {
      (this.$hoursText.innerHTML = d(this.displayHours)), (this.$minutesText.innerHTML = d(this.minutes)), this.ampm && (this.$ampm.innerHTML = this.dayPeriod);
    }

    set hours(e) {
      this._hours = e;
      const { hours: t, dayPeriod: i } = l(e);
      (this.displayHours = this.ampm ? t : e), (this.dayPeriod = i);
    }

    get hours() {
      return this._hours;
    }

    render() {
      this.updateSliders(), this.updateText();
    }
  }
  function A(e, t, i) {
    return (
      (t = (function (e) {
        const t = (function (e, t) {
          if (typeof e !== 'object' || e === null) return e;
          const i = e[Symbol.toPrimitive];
          if (void 0 !== i) {
            const s = i.call(e, t);
            if (typeof s !== 'object') return s;
            throw new TypeError('@@toPrimitive must return a primitive value.');
          }
          return String(e);
        }(e, 'string'));
        return typeof t === 'symbol' ? t : String(t);
      }(t))) in e
        ? Object.defineProperty(e, t, {
          value: i, enumerable: !0, configurable: !0, writable: !0,
        })
        : (e[t] = i),
      e
    );
  }
  class N {
    constructor(e) {
      const { dp: t, opts: i } = e;
      A(this, 'pressedKeys', new Set()),
      A(
        this,
        'hotKeys',
        new Map([
          [
            [
              ['Control', 'ArrowRight'],
              ['Control', 'ArrowUp'],
            ],
            (e) => e.month++,
          ],
          [
            [
              ['Control', 'ArrowLeft'],
              ['Control', 'ArrowDown'],
            ],
            (e) => e.month--,
          ],
          [
            [
              ['Shift', 'ArrowRight'],
              ['Shift', 'ArrowUp'],
            ],
            (e) => e.year++,
          ],
          [
            [
              ['Shift', 'ArrowLeft'],
              ['Shift', 'ArrowDown'],
            ],
            (e) => e.year--,
          ],
          [
            [
              ['Alt', 'ArrowRight'],
              ['Alt', 'ArrowUp'],
            ],
            (e) => (e.year += 10),
          ],
          [
            [
              ['Alt', 'ArrowLeft'],
              ['Alt', 'ArrowDown'],
            ],
            (e) => (e.year -= 10),
          ],
          [['Control', 'Shift', 'ArrowUp'], (e, t) => t.up()],
        ]),
      ),
      A(this, 'handleHotKey', (e) => {
        const t = this.hotKeys.get(e);
        const i = o(this.getInitialFocusDate());
        t(i, this.dp);
        let { year: s, month: a, date: n } = i;
        const r = h(new Date(s, a));
        r < n && (n = r);
        const l = this.dp.getClampedDate(new Date(s, a, n));
        this.dp.setFocusDate(l, { viewDateTransition: !0 });
      }),
      A(this, 'isHotKeyPressed', () => {
        let e = !1;
        const t = this.pressedKeys.size;
        const i = (e) => this.pressedKeys.has(e);
        for (const [s] of this.hotKeys) {
          if (e) break;
          if (Array.isArray(s[0])) {
            s.forEach((a) => {
              e || t !== a.length || (e = a.every(i) && s);
            });
          } else {
            if (t !== s.length) continue;
            e = s.every(i) && s;
          }
        }
        return e;
      }),
      A(this, 'isArrow', (e) => e >= 37 && e <= 40),
      A(this, 'onKeyDown', (e) => {
        const { key: t, which: i } = e;
        const {
          dp: s,
          dp: { focusDate: a },
          opts: n,
        } = this;
        this.registerKey(t);
        const r = this.isHotKeyPressed();
        if (r) return e.preventDefault(), void this.handleHotKey(r);
        if (this.isArrow(i)) return e.preventDefault(), void this.focusNextCell(t);
        if (t === 'Enter') {
          if (s.currentView !== n.minView) return void s.down();
          if (a) {
            const e = s._checkIfDateIsSelected(a);
            return void (e ? s._handleAlreadySelectedDates(e, a) : s.selectDate(a));
          }
        }
        t === 'Escape' && this.dp.hide();
      }),
      A(this, 'onKeyUp', (e) => {
        this.removeKey(e.key);
      }),
      (this.dp = t),
      (this.opts = i),
      this.init();
    }

    init() {
      this.bindKeyboardEvents();
    }

    bindKeyboardEvents() {
      const { $el: e } = this.dp;
      e.addEventListener('keydown', this.onKeyDown), e.addEventListener('keyup', this.onKeyUp);
    }

    destroy() {
      const { $el: e } = this.dp;
      e.removeEventListener('keydown', this.onKeyDown), e.removeEventListener('keyup', this.onKeyUp), (this.hotKeys = null), (this.pressedKeys = null);
    }

    getInitialFocusDate() {
      const {
        focusDate: e,
        currentView: t,
        selectedDates: s,
        parsedViewDate: { year: a, month: n },
      } = this.dp;
      const r = e || s[s.length - 1];
      if (!r) {
        switch (t) {
          case i.days:
            r = new Date(a, n, new Date().getDate());
            break;
          case i.months:
            r = new Date(a, n, 1);
            break;
          case i.years:
            r = new Date(a, 0, 1);
        }
      }
      return r;
    }

    focusNextCell(e) {
      const t = this.getInitialFocusDate();
      const { currentView: s } = this.dp;
      const { days: a, months: n, years: r } = i;
      const h = o(t);
      let l = h.year;
      let d = h.month;
      let c = h.date;
      switch (e) {
        case 'ArrowLeft':
          s === a && (c -= 1), s === n && (d -= 1), s === r && (l -= 1);
          break;
        case 'ArrowUp':
          s === a && (c -= 7), s === n && (d -= 3), s === r && (l -= 4);
          break;
        case 'ArrowRight':
          s === a && (c += 1), s === n && (d += 1), s === r && (l += 1);
          break;
        case 'ArrowDown':
          s === a && (c += 7), s === n && (d += 3), s === r && (l += 4);
      }
      const u = this.dp.getClampedDate(new Date(l, d, c));
      this.dp.setFocusDate(u, { viewDateTransition: !0 });
    }

    registerKey(e) {
      this.pressedKeys.add(e);
    }

    removeKey(e) {
      this.pressedKeys.delete(e);
    }
  }
  const I = {
    on(e, t) {
      this.__events || (this.__events = {}), this.__events[e] ? this.__events[e].push(t) : (this.__events[e] = [t]);
    },
    off(e, t) {
      this.__events && this.__events[e] && (this.__events[e] = this.__events[e].filter((e) => e !== t));
    },
    removeAllEvents() {
      this.__events = {};
    },
    trigger(e) {
      for (var t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++) i[s - 1] = arguments[s];
      this.__events
          && this.__events[e]
          && this.__events[e].forEach((e) => {
            e(...i);
          });
    },
  };
  function P(e, t, i) {
    return (
      (t = (function (e) {
        const t = (function (e, t) {
          if (typeof e !== 'object' || e === null) return e;
          const i = e[Symbol.toPrimitive];
          if (void 0 !== i) {
            const s = i.call(e, t);
            if (typeof s !== 'object') return s;
            throw new TypeError('@@toPrimitive must return a primitive value.');
          }
          return String(e);
        }(e, 'string'));
        return typeof t === 'symbol' ? t : String(t);
      }(t))) in e
        ? Object.defineProperty(e, t, {
          value: i, enumerable: !0, configurable: !0, writable: !0,
        })
        : (e[t] = i),
      e
    );
  }
  let j = '';
  let R = '';
  let B = !1;
  class K {
    static buildGlobalContainer(e) {
      (B = !0), (j = n({ className: e, id: e })), a('body').appendChild(j);
    }

    constructor(e, t) {
      const r = this;
      if (
        (P(this, 'viewIndexes', [i.days, i.months, i.years]),
        P(this, 'next', () => {
          const { year: e, month: t } = this.parsedViewDate;
          switch (this.currentView) {
            case i.days:
              this.setViewDate(new Date(e, t + 1, 1));
              break;
            case i.months:
              this.setViewDate(new Date(e + 1, t, 1));
              break;
            case i.years:
              this.setViewDate(new Date(e + 10, 0, 1));
          }
        }),
        P(this, 'prev', () => {
          const { year: e, month: t } = this.parsedViewDate;
          switch (this.currentView) {
            case i.days:
              this.setViewDate(new Date(e, t - 1, 1));
              break;
            case i.months:
              this.setViewDate(new Date(e - 1, t, 1));
              break;
            case i.years:
              this.setViewDate(new Date(e - 10, 0, 1));
          }
        }),
        P(this, '_finishHide', () => {
          (this.hideAnimation = !1), this._destroyComponents(), this.$container.removeChild(this.$datepicker);
        }),
        P(this, 'setPosition', function (e) {
          const t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
          if (typeof (e = e || r.opts.position) === 'function') {
            return void (r.customHide = e({
              $datepicker: r.$datepicker, $target: r.$el, $pointer: r.$pointer, isViewChange: t, done: r._finishHide,
            }));
          }
          let i;
          let s;
          const { isMobile: a } = r.opts;
          const n = r.$el.getBoundingClientRect();
          let h = r.$el.getBoundingClientRect();
          const o = r.$datepicker.offsetParent;
          const l = r.$el.offsetParent;
          const d = r.$datepicker.getBoundingClientRect();
          const c = e.split(' ');
          let u = window.scrollY;
          let p = window.scrollX;
          const m = r.opts.offset;
          const v = c[0];
          const g = c[1];
          if (a) r.$datepicker.style.cssText = 'left: 50%; top: 50%';
          else {
            if (
              (o === l && o !== document.body && ((h = {
                top: r.$el.offsetTop, left: r.$el.offsetLeft, width: n.width, height: r.$el.offsetHeight,
              }), (u = 0), (p = 0)),
              o !== l && o !== document.body)
            ) {
              const e = o.getBoundingClientRect();
              (h = {
                top: n.top - e.top, left: n.left - e.left, width: n.width, height: n.height,
              }), (u = 0), (p = 0);
            }
            switch (v) {
              case 'top':
                i = h.top - d.height - m;
                break;
              case 'right':
                s = h.left + h.width + m;
                break;
              case 'bottom':
                i = h.top + h.height + m;
                break;
              case 'left':
                s = h.left - d.width - m;
            }
            switch (g) {
              case 'top':
                i = h.top;
                break;
              case 'right':
                s = h.left + h.width - d.width;
                break;
              case 'bottom':
                i = h.top + h.height - d.height;
                break;
              case 'left':
                s = h.left;
                break;
              case 'center':
                /left|right/.test(v) ? (i = h.top + h.height / 2 - d.height / 2) : (s = h.left + h.width / 2 - d.width / 2);
            }
            r.$datepicker.style.cssText = `left: ${s + p}px; top: ${i + u}px`;
          }
        }),
        P(this, '_setInputValue', () => {
          const {
            opts: e,
            $altField: t,
            locale: { dateFormat: i },
          } = this;
          const { altFieldDateFormat: s, altField: a } = e;
          a && t && (t.value = this._getInputValue(s)), (this.$el.value = this._getInputValue(i));
        }),
        P(this, '_getInputValue', (e) => {
          const { selectedDates: t, opts: i } = this;
          const { multipleDates: s, multipleDatesSeparator: a } = i;
          if (!t.length) return '';
          const n = typeof e === 'function';
          let r = n ? e(s ? t : t[0]) : t.map((t) => this.formatDate(t, e));
          return (r = n ? r : r.join(a)), r;
        }),
        P(this, '_checkIfDateIsSelected', function (e) {
          const t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : i.days;
          let s = !1;
          return (
            r.selectedDates.some((i) => {
              const a = p(e, i, t);
              return (s = a && i), a;
            }),
            s
          );
        }),
        P(this, '_scheduleCallAfterTransition', (e) => {
          this._cancelScheduledCall(),
          e && e(!1),
          (this._onTransitionEnd = () => {
            e && e(!0);
          }),
          this.$datepicker.addEventListener('transitionend', this._onTransitionEnd, { once: !0 });
        }),
        P(this, '_cancelScheduledCall', () => {
          this.$datepicker.removeEventListener('transitionend', this._onTransitionEnd);
        }),
        P(this, 'setViewDate', (e) => {
          if (!((e = k(e)) instanceof Date)) return;
          if (p(e, this.viewDate)) return;
          const t = this.viewDate;
          this.viewDate = e;
          const { onChangeViewDate: s } = this.opts;
          if (s) {
            const { month: e, year: t } = this.parsedViewDate;
            s({ month: e, year: t, decade: this.curDecade });
          }
          this.trigger(i.eventChangeViewDate, e, t);
        }),
        P(this, 'setFocusDate', function (e) {
          const t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          (!e || (e = k(e)) instanceof Date) && ((r.focusDate = e), r.opts.range && e && r._handleRangeOnFocus(), r.trigger(i.eventChangeFocusDate, e, t));
        }),
        P(this, 'setCurrentView', (e) => {
          if (this.viewIndexes.includes(e)) {
            if (((this.currentView = e), this.elIsInput && this.visible && this.setPosition(void 0, !0), this.trigger(i.eventChangeCurrentView, e), !this.views[e])) {
              const t = (this.views[e] = new F({ dp: this, opts: this.opts, type: e }));
              this.shouldUpdateDOM && this.$content.appendChild(t.$el);
            }
            this.opts.onChangeView && this.opts.onChangeView(e);
          }
        }),
        P(this, '_updateLastSelectedDate', (e) => {
          (this.lastSelectedDate = e), this.trigger(i.eventChangeLastSelectedDate, e);
        }),
        P(this, 'destroy', () => {
          const { showEvent: e, isMobile: t } = this.opts;
          const i = this.$datepicker.parentNode;
          i && i.removeChild(this.$datepicker),
          this.$el.removeEventListener(e, this._onFocus),
          this.$el.removeEventListener('blur', this._onBlur),
          window.removeEventListener('resize', this._onResize),
          t && this._removeMobileAttributes(),
          this.keyboardNav && this.keyboardNav.destroy(),
          (this.views = null),
          (this.nav = null),
          (this.$datepicker = null),
          (this.opts = null),
          (this.$customContainer = null),
          (this.viewDate = null),
          (this.focusDate = null),
          (this.selectedDates = null),
          (this.rangeDateFrom = null),
          (this.rangeDateTo = null);
        }),
        P(this, 'update', (e) => {
          const t = b({}, this.opts);
          b(this.opts, e);
          const {
            timepicker: s, buttons: a, range: n, selectedDates: r, isMobile: h,
          } = this.opts;
          const o = this.visible || this.treatAsInline;
          this._createMinMaxDates(),
          this._limitViewDateByMaxMinDates(),
          this._handleLocale(),
          !t.selectedDates && r && this.selectDate(r),
          e.view && this.setCurrentView(e.view),
          this._setInputValue(),
          t.range && !n
            ? ((this.rangeDateTo = !1), (this.rangeDateFrom = !1))
            : !t.range && n && this.selectedDates.length && ((this.rangeDateFrom = this.selectedDates[0]), (this.rangeDateTo = this.selectedDates[1])),
          t.timepicker && !s ? (o && this.timepicker.destroy(), (this.timepicker = !1), this.$timepicker.parentNode.removeChild(this.$timepicker)) : !t.timepicker && s && this._addTimepicker(),
          !t.buttons && a
            ? this._addButtons()
            : t.buttons && !a
              ? (this.buttons.destroy(), this.$buttons.parentNode.removeChild(this.$buttons))
              : o && t.buttons && a && this.buttons.clearHtml().render(),
          !t.isMobile && h
            ? (this.treatAsInline || R || this._createMobileOverlay(), this._addMobileAttributes(), this.visible && this._showMobileOverlay())
            : t.isMobile && !h && (this._removeMobileAttributes(), this.visible && (R.classList.remove('-active-'), typeof this.opts.position !== 'function' && this.setPosition())),
          o && (this.nav.update(), this.views[this.currentView].render(), this.currentView === i.days && this.views[this.currentView].renderDayNames());
        }),
        P(this, 'isOtherMonth', (e) => {
          const { month: t } = o(e);
          return t !== this.parsedViewDate.month;
        }),
        P(this, 'isOtherYear', (e) => {
          const { year: t } = o(e);
          return t !== this.parsedViewDate.year;
        }),
        P(this, 'isOtherDecade', (e) => {
          const { year: t } = o(e);
          const [i, s] = c(this.viewDate);
          return t < i || t > s;
        }),
        P(this, '_onChangeSelectedDate', (e) => {
          const { silent: t } = e;
          setTimeout(() => {
            this._setInputValue(), this.opts.onSelect && !t && this._triggerOnSelect();
          });
        }),
        P(this, '_onChangeFocusedDate', function (e) {
          const { viewDateTransition: t } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          if (!e) return;
          let i = !1;
          t && (i = r.isOtherMonth(e) || r.isOtherYear(e) || r.isOtherDecade(e)), i && r.setViewDate(e);
        }),
        P(this, '_onChangeTime', (e) => {
          const { hours: t, minutes: i } = e;
          const s = new Date();
          const {
            lastSelectedDate: a,
            opts: { onSelect: n },
          } = this;
          let r = a;
          a || (r = s);
          const h = this.getCell(r, this.currentViewSingular);
          const o = h && h.adpCell;
          (o && o.isDisabled) || (r.setHours(t), r.setMinutes(i), a ? (this._setInputValue(), n && this._triggerOnSelect()) : this.selectDate(r));
        }),
        P(this, '_onFocus', (e) => {
          this.visible || this.show();
        }),
        P(this, '_onBlur', (e) => {
          this.inFocus || !this.visible || this.opts.isMobile || this.hide();
        }),
        P(this, '_onMouseDown', (e) => {
          this.inFocus = !0;
        }),
        P(this, '_onMouseUp', (e) => {
          (this.inFocus = !1), this.$el.focus();
        }),
        P(this, '_onResize', () => {
          this.visible && typeof this.opts.position !== 'function' && this.setPosition();
        }),
        P(this, '_onClickOverlay', () => {
          this.visible && this.hide();
        }),
        P(this, 'isWeekend', (e) => this.opts.weekends.includes(e)),
        P(this, 'getClampedDate', (e) => {
          const { minDate: t, maxDate: i } = this;
          let s = e;
          return i && m(e, i) ? (s = i) : t && v(e, t) && (s = t), s;
        }),
        (this.$el = a(e)),
        !this.$el)
      ) { return; }
      (this.$datepicker = n({ className: 'air-datepicker' })),
      (this.opts = b({}, s, t)),
      (this.$customContainer = !!this.opts.container && a(this.opts.container)),
      (this.$altField = a(this.opts.altField || !1));
      const { view: h, startDate: l } = this.opts;
      l || (this.opts.startDate = new Date()),
      this.$el.nodeName === 'INPUT' && (this.elIsInput = !0),
      (this.inited = !1),
      (this.visible = !1),
      (this.viewDate = k(this.opts.startDate)),
      (this.focusDate = !1),
      (this.initialReadonly = this.$el.getAttribute('readonly')),
      (this.customHide = !1),
      (this.currentView = h),
      (this.selectedDates = []),
      (this.views = {}),
      (this.keys = []),
      (this.rangeDateFrom = ''),
      (this.rangeDateTo = ''),
      (this.timepickerIsActive = !1),
      (this.treatAsInline = this.opts.inline || !this.elIsInput),
      this.init();
    }

    init() {
      const {
        opts: e,
        treatAsInline: t,
        opts: {
          inline: i, isMobile: s, selectedDates: n, keyboardNav: r, onlyTimepicker: h,
        },
      } = this;
      const o = a('body');
      (!B || (B && j && !o.contains(j))) && !i && this.elIsInput && !this.$customContainer && K.buildGlobalContainer(K.defaultGlobalContainerId),
      !s || R || t || this._createMobileOverlay(),
      this._handleLocale(),
      this._bindSubEvents(),
      this._createMinMaxDates(),
      this._limitViewDateByMaxMinDates(),
      this.elIsInput && (i || this._bindEvents(), r && !h && (this.keyboardNav = new N({ dp: this, opts: e }))),
      n && this.selectDate(n, { silent: !0 }),
      this.opts.visible && !t && this.show(),
      s && !t && this.$el.setAttribute('readonly', !0),
      t && this._createComponents();
    }

    _createMobileOverlay() {
      (R = n({ className: 'air-datepicker-overlay' })), j.appendChild(R);
    }

    _createComponents() {
      const {
        opts: e,
        treatAsInline: t,
        opts: {
          inline: i, buttons: s, timepicker: a, position: n, classes: r, onlyTimepicker: h, isMobile: o,
        },
      } = this;
      this._buildBaseHtml(),
      this.elIsInput && (i || this._setPositionClasses(n)),
      (!i && this.elIsInput) || this.$datepicker.classList.add('-inline-'),
      r && this.$datepicker.classList.add(...r.split(' ')),
      h && this.$datepicker.classList.add('-only-timepicker-'),
      o && !t && this._addMobileAttributes(),
      (this.views[this.currentView] = new F({ dp: this, type: this.currentView, opts: e })),
      (this.nav = new x({ dp: this, opts: e })),
      a && this._addTimepicker(),
      s && this._addButtons(),
      this.$content.appendChild(this.views[this.currentView].$el),
      this.$nav.appendChild(this.nav.$el);
    }

    _destroyComponents() {
      for (const e in this.views) this.views[e].destroy();
      (this.views = {}), this.nav.destroy(), this.timepicker && this.timepicker.destroy();
    }

    _addMobileAttributes() {
      R.addEventListener('click', this._onClickOverlay), this.$datepicker.classList.add('-is-mobile-'), this.$el.setAttribute('readonly', !0);
    }

    _removeMobileAttributes() {
      R.removeEventListener('click', this._onClickOverlay),
      this.$datepicker.classList.remove('-is-mobile-'),
      this.initialReadonly || this.initialReadonly === '' || this.$el.removeAttribute('readonly');
    }

    _createMinMaxDates() {
      const { minDate: e, maxDate: t } = this.opts;
      (this.minDate = !!e && k(e)), (this.maxDate = !!t && k(t));
    }

    _addTimepicker() {
      (this.$timepicker = n({ className: 'air-datepicker--time' })),
      this.$datepicker.appendChild(this.$timepicker),
      (this.timepicker = new O({ dp: this, opts: this.opts })),
      this.$timepicker.appendChild(this.timepicker.$el);
    }

    _addButtons() {
      (this.$buttons = n({ className: 'air-datepicker--buttons' })),
      this.$datepicker.appendChild(this.$buttons),
      (this.buttons = new E({ dp: this, opts: this.opts })),
      this.$buttons.appendChild(this.buttons.$el);
    }

    _bindSubEvents() {
      this.on(i.eventChangeSelectedDate, this._onChangeSelectedDate), this.on(i.eventChangeFocusDate, this._onChangeFocusedDate), this.on(i.eventChangeTime, this._onChangeTime);
    }

    _buildBaseHtml() {
      const { inline: e } = this.opts;
      let t; let
        i;
      this.elIsInput
        ? e
          ? ((t = this.$datepicker), (i = this.$el).parentNode.insertBefore(t, i.nextSibling))
          : this.$container.appendChild(this.$datepicker)
        : this.$el.appendChild(this.$datepicker),
      (this.$datepicker.innerHTML = '<i class="air-datepicker--pointer"></i><div class="air-datepicker--navigation"></div><div class="air-datepicker--content"></div>'),
      (this.$content = a('.air-datepicker--content', this.$datepicker)),
      (this.$pointer = a('.air-datepicker--pointer', this.$datepicker)),
      (this.$nav = a('.air-datepicker--navigation', this.$datepicker));
    }

    _handleLocale() {
      const {
        locale: e, dateFormat: t, firstDay: i, timepicker: s, onlyTimepicker: a, timeFormat: n, dateTimeSeparator: r,
      } = this.opts;
      let h;
      (this.locale = ((h = e), JSON.parse(JSON.stringify(h)))), t && (this.locale.dateFormat = t), void 0 !== n && n !== '' && (this.locale.timeFormat = n);
      const { timeFormat: o } = this.locale;
      if ((i !== '' && (this.locale.firstDay = i), s && typeof t !== 'function')) {
        const e = o ? r : '';
        this.locale.dateFormat = [this.locale.dateFormat, o || ''].join(e);
      }
      a && typeof t !== 'function' && (this.locale.dateFormat = this.locale.timeFormat);
    }

    _setPositionClasses(e) {
      if (typeof e === 'function') return void this.$datepicker.classList.add('-custom-position-');
      const t = (e = e.split(' '))[0];
      const i = `air-datepicker -${t}-${e[1]}- -from-${t}-`;
      this.$datepicker.classList.add(...i.split(' '));
    }

    _bindEvents() {
      this.$el.addEventListener(this.opts.showEvent, this._onFocus),
      this.$el.addEventListener('blur', this._onBlur),
      this.$datepicker.addEventListener('mousedown', this._onMouseDown),
      this.$datepicker.addEventListener('mouseup', this._onMouseUp),
      window.addEventListener('resize', this._onResize);
    }

    _limitViewDateByMaxMinDates() {
      const { viewDate: e, minDate: t, maxDate: i } = this;
      i && m(e, i) && this.setViewDate(i), t && v(e, t) && this.setViewDate(t);
    }

    formatDate() {
      let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.viewDate;
      const t = arguments.length > 1 ? arguments[1] : void 0;
      if (((e = k(e)), !(e instanceof Date))) return;
      let i = t;
      const s = this.locale;
      const a = o(e);
      const n = a.dayPeriod;
      const r = c(e);
      const h = K.replacer;
      const l = {
        T: e.getTime(),
        m: a.minutes,
        mm: a.fullMinutes,
        h: a.hours12,
        hh: a.fullHours12,
        H: a.hours,
        HH: a.fullHours,
        aa: n,
        AA: n.toUpperCase(),
        E: s.daysShort[a.day],
        EEEE: s.days[a.day],
        d: a.date,
        dd: a.fullDate,
        M: a.month + 1,
        MM: a.fullMonth,
        MMM: s.monthsShort[a.month],
        MMMM: s.months[a.month],
        yy: a.year.toString().slice(-2),
        yyyy: a.year,
        yyyy1: r[0],
        yyyy2: r[1],
      };
      for (const [e, t] of Object.entries(l)) i = h(i, C(e), t);
      return i;
    }

    down(e) {
      this._handleUpDownActions(e, 'down');
    }

    up(e) {
      this._handleUpDownActions(e, 'up');
    }

    selectDate(e) {
      let t;
      const s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      const { currentView: a, parsedViewDate: n, selectedDates: r } = this;
      const { updateTime: h } = s;
      const {
        moveToOtherMonthsOnSelect: o, moveToOtherYearsOnSelect: l, multipleDates: d, range: c, autoClose: u,
      } = this.opts;
      const p = r.length;
      if (Array.isArray(e)) {
        return (
          e.forEach((e) => {
            this.selectDate(e, s);
          }),
          new Promise((e) => {
            setTimeout(e);
          })
        );
      }
      if ((e = k(e)) instanceof Date) {
        if (
          (a === i.days && e.getMonth() !== n.month && o && (t = new Date(e.getFullYear(), e.getMonth(), 1)),
          a === i.years && e.getFullYear() !== n.year && l && (t = new Date(e.getFullYear(), 0, 1)),
          t && this.setViewDate(t),
          d && !c)
        ) {
          if (p === d) return;
          this._checkIfDateIsSelected(e) || r.push(e);
        } else if (c) {
          switch (p) {
            case 1:
              r.push(e),
              this.rangeDateTo || (this.rangeDateTo = e),
              m(this.rangeDateFrom, this.rangeDateTo) && ((this.rangeDateTo = this.rangeDateFrom), (this.rangeDateFrom = e)),
              (this.selectedDates = [this.rangeDateFrom, this.rangeDateTo]);
              break;
            case 2:
              (this.selectedDates = [e]), (this.rangeDateFrom = e), (this.rangeDateTo = '');
              break;
            default:
              (this.selectedDates = [e]), (this.rangeDateFrom = e);
          }
        } else this.selectedDates = [e];
        return (
          this.trigger(i.eventChangeSelectedDate, {
            action: i.actionSelectDate, silent: s == null ? void 0 : s.silent, date: e, updateTime: h,
          }),
          this._updateLastSelectedDate(e),
          u && !this.timepickerIsActive && this.visible && (d || c ? c && p === 1 && this.hide() : this.hide()),
          new Promise((e) => {
            setTimeout(e);
          })
        );
      }
    }

    unselectDate(e) {
      const t = this.selectedDates;
      const s = this;
      if ((e = k(e)) instanceof Date) {
        return t.some((a, n) => {
          if (p(a, e)) {
            return (
              t.splice(n, 1),
              s.selectedDates.length ? s._updateLastSelectedDate(s.selectedDates[s.selectedDates.length - 1]) : ((s.rangeDateFrom = ''), (s.rangeDateTo = ''), s._updateLastSelectedDate(!1)),
              this.trigger(i.eventChangeSelectedDate, { action: i.actionUnselectDate, date: e }),
              !0
            );
          }
        });
      }
    }

    replaceDate(e, t) {
      const s = this.selectedDates.find((t) => p(t, e, this.currentView));
      const a = this.selectedDates.indexOf(s);
      a < 0
          || p(this.selectedDates[a], t, this.currentView)
          || ((this.selectedDates[a] = t), this.trigger(i.eventChangeSelectedDate, { action: i.actionSelectDate, date: t, updateTime: !0 }), this._updateLastSelectedDate(t));
    }

    clear() {
      const e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      return (
        (this.selectedDates = []),
        (this.rangeDateFrom = !1),
        (this.rangeDateTo = !1),
        this.trigger(i.eventChangeSelectedDate, { action: i.actionUnselectDate, silent: e.silent }),
        new Promise((e) => {
          setTimeout(e);
        })
      );
    }

    show() {
      const { onShow: e, isMobile: t } = this.opts;
      this._cancelScheduledCall(),
      this.visible || this.hideAnimation || this._createComponents(),
      this.setPosition(this.opts.position),
      this.$datepicker.classList.add('-active-'),
      (this.visible = !0),
      e && this._scheduleCallAfterTransition(e),
      t && this._showMobileOverlay();
    }

    hide() {
      const { onHide: e, isMobile: t } = this.opts;
      const i = this._hasTransition();
      (this.visible = !1),
      (this.hideAnimation = !0),
      this.$datepicker.classList.remove('-active-'),
      this.customHide && this.customHide(),
      this.elIsInput && this.$el.blur(),
      this._scheduleCallAfterTransition((t) => {
        !this.customHide && ((t && i) || (!t && !i)) && this._finishHide(), e && e(t);
      }),
      t && R.classList.remove('-active-');
    }

    _triggerOnSelect() {
      const e = [];
      const t = [];
      const {
        selectedDates: i,
        locale: s,
        opts: { onSelect: a, multipleDates: n, range: r },
      } = this;
      const h = n || r;
      const o = typeof s.dateFormat === 'function';
      i.length && ((e = i.map(g)), (t = o ? (n ? s.dateFormat(e) : e.map((e) => s.dateFormat(e))) : e.map((e) => this.formatDate(e, s.dateFormat)))),
      a({ date: h ? e : e[0], formattedDate: h ? t : t[0], datepicker: this });
    }

    _handleAlreadySelectedDates(e, t) {
      const { range: i, toggleSelected: s } = this.opts;
      i ? (s ? this.unselectDate(t) : this.selectedDates.length !== 2 && this.selectDate(t)) : s && this.unselectDate(t), s || this._updateLastSelectedDate(e);
    }

    _handleUpDownActions(e, t) {
      if (!((e = k(e || this.focusDate || this.viewDate)) instanceof Date)) return;
      let i = t === 'up' ? this.viewIndex + 1 : this.viewIndex - 1;
      i > 2 && (i = 2), i < 0 && (i = 0), this.setViewDate(new Date(e.getFullYear(), e.getMonth(), 1)), this.setCurrentView(this.viewIndexes[i]);
    }

    _handleRangeOnFocus() {
      this.selectedDates.length === 1
          && (m(this.selectedDates[0], this.focusDate)
            ? ((this.rangeDateTo = this.selectedDates[0]), (this.rangeDateFrom = this.focusDate))
            : ((this.rangeDateTo = this.focusDate), (this.rangeDateFrom = this.selectedDates[0])));
    }

    getCell(e) {
      const t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : i.day;
      if (!((e = k(e)) instanceof Date)) return;
      const { year: s, month: a, date: n } = o(e);
      const r = `[data-year="${s}"]`;
      const h = `[data-month="${a}"]`;
      const l = { [i.day]: `${r}${h}[data-date="${n}"]`, [i.month]: `${r}${h}`, [i.year]: `${r}` };
      return this.views[this.currentView].$el.querySelector(l[t]);
    }

    _showMobileOverlay() {
      R.classList.add('-active-');
    }

    _hasTransition() {
      return (
        window
          .getComputedStyle(this.$datepicker)
          .getPropertyValue('transition-duration')
          .split(', ')
          .reduce((e, t) => parseFloat(t) + e, 0) > 0
      );
    }

    get shouldUpdateDOM() {
      return this.visible || this.treatAsInline;
    }

    get parsedViewDate() {
      return o(this.viewDate);
    }

    get currentViewSingular() {
      return this.currentView.slice(0, -1);
    }

    get curDecade() {
      return c(this.viewDate);
    }

    get viewIndex() {
      return this.viewIndexes.indexOf(this.currentView);
    }

    get isFinalView() {
      return this.currentView === i.years;
    }

    get hasSelectedDates() {
      return this.selectedDates.length > 0;
    }

    get isMinViewReached() {
      return this.currentView === this.opts.minView || this.currentView === i.days;
    }

    get $container() {
      return this.$customContainer || j;
    }

    static replacer(e, t, i) {
      return e.replace(t, (e, t, s, a) => t + i + a);
    }
  }
  let U;
  return P(K, 'defaults', s), P(K, 'version', '3.3.5'), P(K, 'defaultGlobalContainerId', 'air-datepicker-global-container'), (U = K.prototype), Object.assign(U, I), t.default;
}())));
