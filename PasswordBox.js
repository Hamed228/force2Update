var J = Object.defineProperty
var O = (s, t, e) =>
  t in s
    ? J(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e })
    : (s[t] = e)
var a = (s, t, e) => (O(s, typeof t != 'symbol' ? t + '' : t, e), e),
  R = (s, t, e) => {
    if (!t.has(s)) throw TypeError('Cannot ' + e)
  }
var i = (s, t, e) => (
    R(s, t, 'read from private field'), e ? e.call(s) : t.get(s)
  ),
  o = (s, t, e) => {
    if (t.has(s))
      throw TypeError('Cannot add the same private member more than once')
    t instanceof WeakSet ? t.add(s) : t.set(s, e)
  },
  l = (s, t, e, n) => (
    R(s, t, 'write to private field'), n ? n.call(s, e) : t.set(s, e), e
  )
var I = (s, t, e) => (R(s, t, 'access private method'), e)
var V, w, $, B
class Q {
  constructor(t) {
    o(this, V, void 0)
    a(this, 'validation', () => !0)
    a(this, 'initialize', () => {
      i(this, V).inputElement.addEventListener('keydown', i(this, w))
    })
    a(this, 'dispose', () => {
      i(this, V).inputElement.removeEventListener('keydown', i(this, w))
    })
    a(this, 'onArrowDown')
    a(this, 'onArrowUp')
    a(this, 'onGotoNextEditableControl')
    a(this, 'onGotoNextControl')
    a(this, 'onGotoPreviousEditableControl')
    a(this, 'onGotoPreviousControl')
    o(this, w, (t) => {
      t.isTrusted &&
        (!t.altKey && !t.ctrlKey && !t.shiftKey && !t.metaKey
          ? i(this, $).call(this, t)
          : t.shiftKey &&
            !t.altKey &&
            !t.ctrlKey &&
            !t.metaKey &&
            i(this, B).call(this, t))
    })
    o(this, $, (t) => {
      this.onGotoNextEditableControl && t.key === 'Enter' && this.validation()
        ? (t.preventDefault(),
          t.stopPropagation(),
          this.onGotoNextEditableControl())
        : this.onGotoNextControl && t.key === 'Tab'
        ? (t.preventDefault(), t.stopPropagation(), this.onGotoNextControl())
        : this.onArrowDown && (t.key === 'Down' || t.key === 'ArrowDown')
        ? (t.preventDefault(), t.stopPropagation(), this.onArrowDown())
        : this.onArrowUp &&
          (t.key === 'Up' || t.key === 'ArrowUp') &&
          (t.preventDefault(), t.stopPropagation(), this.onArrowUp())
    })
    o(this, B, (t) => {
      this.onGotoPreviousEditableControl && t.key === 'Enter'
        ? (t.preventDefault(),
          t.stopPropagation(),
          this.onGotoPreviousEditableControl())
        : this.onGotoPreviousControl &&
          t.key === 'Tab' &&
          (t.preventDefault(),
          t.stopPropagation(),
          this.onGotoPreviousControl())
    })
    l(this, V, t)
  }
}
;(V = new WeakMap()),
  (w = new WeakMap()),
  ($ = new WeakMap()),
  (B = new WeakMap())
class q {
  constructor() {
    a(this, 'nextValidator')
    a(this, 'isValidMain', (t) => {
      const e = this.isValid(t)
      return e === null && this.nextValidator != null
        ? this.nextValidator.isValidMain(t)
        : e
    })
  }
  setNextValidator(t) {
    this.nextValidator = t
  }
  requiredValidate(t) {
    return (
      typeof t == 'object' &&
      typeof t.required == 'boolean' &&
      t.required === !0
    )
  }
  minLengthValidate(t) {
    return (
      typeof t == 'object' && typeof t.minLength == 'number' && t.minLength > -1
    )
  }
  minLengthIsValid(t, e) {
    const n = t == null ? void 0 : t.toString()
    return typeof n == 'string' && n.length >= e
  }
  maxLengthValidate(t) {
    return (
      typeof t == 'object' && typeof t.maxLength == 'number' && t.maxLength > -1
    )
  }
  maxLengthIsValid(t, e) {
    const n = t == null ? void 0 : t.toString()
    return typeof n == 'string' && n.length <= e
  }
  minValueValidate(t) {
    return (
      typeof t == 'object' && typeof t.minValue == 'number' && t.minValue > -1
    )
  }
  minValueIsValid(t, e) {
    return t >= e
  }
  maxValueValidate(t) {
    return (
      typeof t == 'object' && typeof t.maxValue == 'number' && t.maxValue > -1
    )
  }
  maxValueIsValid(t, e) {
    return t <= e
  }
}
class X extends q {
  constructor() {
    super(...arguments)
    a(this, 'isValid', (e) =>
      this.requiredValidate(e.configuration) &&
      (e.amisaValue === null || e.amisaValue === void 0 || e.amisaValue == 0)
        ? e.configuration.validationText === 'string'
          ? `${e.configuration.validationText} is required!!`
          : 'required value!!'
        : null
    )
  }
}
class Y extends q {
  constructor() {
    super(...arguments)
    a(this, 'isValid', (e) => {
      const n = e.configuration
      return this.minLengthValidate(n) &&
        !this.minLengthIsValid(e.amisaValue, n.minLength)
        ? typeof n.validationText == 'string'
          ? `min ${n.validationText} Length at least: '${n.minLength}'!!`
          : `min length at least '${n.minLength}'!!`
        : null
    })
  }
}
class Z extends q {
  constructor() {
    super(...arguments)
    a(this, 'isValid', (e) => {
      const n = e.configuration
      return this.maxLengthValidate(n) &&
        !this.maxLengthIsValid(e.amisaValue, n.maxLength)
        ? typeof n.validationText == 'string'
          ? `max ${n.validationText} Length at most: '${n.maxLength}'!!`
          : `max length at most '${n.maxLength}'!!`
        : null
    })
  }
}
class tt extends q {
  constructor() {
    super(...arguments)
    a(this, 'isValid', (e) => {
      const n = e.configuration
      return this.minValueValidate(n) &&
        !this.minValueIsValid(e.amisaValue, n.minValue)
        ? typeof n.validationText == 'string'
          ? `min ${n.validationText} Value at least: '${n.minValue}'!!`
          : `min Value at least '${n.minValue}'!!`
        : null
    })
  }
}
class et extends q {
  constructor() {
    super(...arguments)
    a(this, 'isValid', (e) => {
      const n = e.configuration
      return this.maxValueValidate(n) &&
        !this.maxValueIsValid(e.amisaValue, n.maxValue)
        ? typeof n.validationText == 'string'
          ? `max ${n.validationText} Value at most: '${n.maxValue}'!!`
          : `max Value at most '${n.maxValue}'!!`
        : null
    })
  }
}
var x, v
class it {
  constructor() {
    o(this, x, void 0)
    o(this, v, void 0)
    a(this, 'add', (t) => {
      var e
      return (
        i(this, x)
          ? ((e = i(this, v)) == null || e.setNextValidator(t), l(this, v, t))
          : (l(this, x, t), l(this, v, t)),
        this
      )
    })
    a(this, 'addRequired', () => this.add(new X()))
    a(this, 'addMinLength', () => this.add(new Y()))
    a(this, 'addMaxLength', () => this.add(new Z()))
    a(this, 'addMinValue', () => this.add(new tt()))
    a(this, 'addMaxValue', () => this.add(new et()))
    a(this, 'getFirst', () => i(this, x))
  }
}
;(x = new WeakMap()), (v = new WeakMap())
var b
class nt {
  constructor(t) {
    o(this, b, void 0)
    l(this, b, t)
  }
  performValidation(t) {
    const e = new it(),
      n = i(this, b).call(this, e).getFirst()
    return n == null ? void 0 : n.isValidMain(t)
  }
}
b = new WeakMap()
var p, C, d, c, r, m, h, f, y, G, K, F, E, D, g, A, H, N, U, z, j
class st {
  constructor(t, e, n) {
    o(this, K)
    o(this, A)
    o(this, p, null)
    a(this, 'getAmisaValue', () => i(this, p))
    a(this, 'setAmisaValue', (t) => {
      l(this, p, t)
    })
    o(this, C, null)
    a(this, 'getAmisaDefaultValue', () => i(this, C))
    a(this, 'initAmisaValueAsAny', (t) => {
      l(this, C, t), l(this, p, t)
    })
    o(this, d, void 0)
    o(this, c, void 0)
    o(this, r, void 0)
    o(this, m, void 0)
    o(this, h, void 0)
    o(this, f, void 0)
    o(this, y, void 0)
    o(this, G, () => {
      const t = i(this, h).labelText
      t &&
        (l(this, m, document.createElement('label')),
        (i(this, m).id = `${i(this, d)}-label`),
        (i(this, m).innerText = `${t} : `),
        i(this, c).append(i(this, m)))
    })
    o(this, E, (t) => {
      if (i(this, f)) t.preventDefault()
      else {
        const e = t,
          n = e.inputType
        this.onBaseBeforeValueChange(e.data, n) && t.preventDefault()
      }
    })
    o(this, D, (t) => {
      const e = t
      this.onBaseValueChanged(i(this, r).value, this.amisaValue, e.inputType),
        (i(this, r).value = i(this, p) || '')
    })
    a(this, 'dispose', () => {
      var t
      i(this, y).dispose(),
        (t = i(this, m)) == null || t.remove(),
        (i(this, r).autofocus = !1),
        i(this, r).removeEventListener('beforeinput', i(this, E)),
        i(this, r).removeEventListener('input', i(this, D)),
        i(this, r).remove(),
        i(this, c).remove()
    })
    a(this, 'simulateInput', (t) => {
      i(this, r).value = t
      const e = new InputEvent('input', {
        bubbles: !1,
        cancelable: !0,
        inputType: 'testInput'
      })
      this.inputElement.dispatchEvent(e)
    })
    o(this, g, null)
    a(this, 'validate', () => {
      l(this, g, new nt(this.getValidationSteps).performValidation(this)),
        I(this, A, H).call(this)
    })
    o(this, N, () => {
      var u
      ;(u = this.containerDiv.querySelector('#Confirm')) == null || u.remove()
      const t = this.containerDiv.querySelector('#unConfirm')
      t && t.remove()
      const e = document.createElement('span'),
        n = i(this, r).getBoundingClientRect()
      this.containerDiv.appendChild(e),
        (e.innerText = i(this, g)),
        (e.id = 'unConfirm'),
        (e.style.color = '#dc3545'),
        (e.style.position = 'absolute'),
        (e.style.top = n.top + n.height - 10 + 'px'),
        i(this, r).dir === 'ltr'
          ? (e.style.left = n.x + n.width - e.offsetWidth - 5 + 'px')
          : (e.style.left = n.x - 10 + 'px'),
        (e.style.backgroundColor = '#fff')
    })
    o(this, U, () => {
      var u
      ;(u = this.containerDiv.querySelector('#unConfirm')) == null || u.remove()
      const t = this.containerDiv.querySelector('#Confirm')
      t && t.remove()
      const e = document.createElement('span'),
        n = i(this, r).getBoundingClientRect()
      this.containerDiv.appendChild(e),
        (e.id = 'Confirm'),
        (e.innerText = 'Valid'),
        (e.style.position = 'absolute'),
        (e.style.top = n.top + n.height - 10 + 'px'),
        i(this, r).dir === 'ltr'
          ? (e.style.left = n.x + n.width - e.offsetWidth - 5 + 'px')
          : (e.style.left = n.x - 10 + 'px'),
        (e.style.color = '#198754'),
        (e.style.backgroundColor = '#fff')
    })
    o(this, z, (t) => {
      ;(i(this, r).style.borderColor = '#28a745'),
        (i(this, r).style.boxShadow = 'none'),
        (i(
          this,
          r
        ).style.backgroundImage = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e")`),
        (i(this, r).style.backgroundRepeat = 'no-repeat'),
        (i(this, r).style.backgroundPosition = `${
          t === 'ltr' ? 'right' : 'left'
        } calc(0.375em + 0.1875rem) center`),
        (i(this, r).style.backgroundSize =
          'calc(0.75em + 0.375rem) calc(0.75em + 0.375rem)')
    })
    o(this, j, (t) => {
      ;(i(this, r).style.borderColor = '#dc3545'),
        (i(this, r).style.boxShadow = 'none'),
        (i(
          this,
          r
        ).style.backgroundImage = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23dc3545' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e")`),
        (i(this, r).style.backgroundRepeat = 'no-repeat'),
        (i(this, r).style.backgroundPosition = `${
          t === 'ltr' ? 'right' : 'left'
        } calc(0.375em + 0.1875rem) center`),
        (i(this, r).style.backgroundSize =
          'calc(0.75em + 0.375rem) calc(0.75em + 0.375rem)')
    })
    if (t) l(this, d, t)
    else
      throw (
        (l(this, d, 'randomId'),
        new Error('Can not set id as null or empty or undefined!!!'))
      )
    l(this, f, !1),
      l(this, h, n),
      e(i(this, h)),
      l(this, c, document.createElement('div')),
      (i(this, c).id = `${i(this, d)}-container`),
      l(this, r, document.createElement('input')),
      l(this, y, new Q(this)),
      I(this, K, F).call(this),
      i(this, G).call(this)
  }
  get any() {
    return this
  }
  get id() {
    return i(this, d)
  }
  get containerDiv() {
    return i(this, c)
  }
  get inputElement() {
    return i(this, r)
  }
  get labelElement() {
    return i(this, m)
  }
  get amisaConfiguration() {
    return i(this, h)
  }
  get readonly() {
    return i(this, f)
  }
  set readonly(t) {
    l(this, f, t)
  }
  get keydownManager() {
    return i(this, y)
  }
  get lastError() {
    return i(this, g)
  }
  set lastError(t) {
    l(this, g, t), I(this, A, H).call(this)
  }
  get hasError() {
    return typeof i(this, g) == 'string' && i(this, g).length > 0
  }
}
;(p = new WeakMap()),
  (C = new WeakMap()),
  (d = new WeakMap()),
  (c = new WeakMap()),
  (r = new WeakMap()),
  (m = new WeakMap()),
  (h = new WeakMap()),
  (f = new WeakMap()),
  (y = new WeakMap()),
  (G = new WeakMap()),
  (K = new WeakSet()),
  (F = function () {
    ;(i(this, r).id = `${i(this, d)}-input`),
      (i(this, r).type = 'text'),
      i(this, h).placeHolder &&
        (this.inputElement.placeholder = i(this, h).placeHolder),
      i(this, h).inputDir
        ? (i(this, r).dir = i(this, h).inputDir)
        : (i(this, r).dir = 'rtl'),
      typeof i(this, h).required == 'boolean' && (i(this, r).required = !0),
      i(this, r).addEventListener('beforeinput', i(this, E)),
      i(this, r).addEventListener('input', i(this, D)),
      i(this, y).initialize(),
      i(this, c).append(this.inputElement)
  }),
  (E = new WeakMap()),
  (D = new WeakMap()),
  (g = new WeakMap()),
  (A = new WeakSet()),
  (H = function () {
    i(this, r).removeAttribute('style'),
      this.hasError
        ? (i(this, j).call(this, i(this, r).dir), i(this, N).call(this))
        : (i(this, z).call(this, i(this, r).dir), i(this, U).call(this))
  }),
  (N = new WeakMap()),
  (U = new WeakMap()),
  (z = new WeakMap()),
  (j = new WeakMap())
class at extends st {
  // #style: HTMLStyleElement;
  constructor(e, n, u) {
    super(e, n, new u())
    a(this, 'gotoNexControl', () => {})
    a(this, 'gotoPreviousControl', () => {})
    a(this, 'initAmisaValue', (e) => {
      this.initAmisaValueAsAny(e)
    })
    a(
      this,
      'onBaseBeforeValueChange',
      (e, n) => !!this.onBeforeValueChange(e, n)
    )
    a(this, 'onBaseValueChanged', (e, n, u) => {
      this.setAmisaValue(e), this.validate(), this.onValueChanged(e, n, u)
    })
    this.configuration.inputDir || (this.configuration.inputDir = 'ltr')
  }
  get amisaValue() {
    return this.getAmisaValue()
  }
  get amisaDefaultValue() {
    return this.getAmisaDefaultValue()
  }
  get configuration() {
    return this.amisaConfiguration
  }
  setDefaultValueAsAny(e) {
    this.setDefaultValue(e)
  }
}
var L, T, S, k, M
class rt {
  constructor() {
    o(this, L, void 0)
    o(this, T, void 0)
    o(this, S, void 0)
    o(this, k, void 0)
    o(this, M, void 0)
  }
  get any() {
    return this
  }
  get validationText() {
    return i(this, L)
  }
  set validationText(t) {
    l(this, L, t)
  }
  get inputDir() {
    return i(this, T)
  }
  set inputDir(t) {
    l(this, T, t)
  }
  get labelText() {
    return i(this, S)
  }
  set labelText(t) {
    l(this, S, t)
  }
  get placeHolder() {
    return i(this, k)
  }
  set placeHolder(t) {
    l(this, k, t)
  }
  get required() {
    return i(this, M)
  }
  set required(t) {
    l(this, M, t)
  }
}
;(L = new WeakMap()),
  (T = new WeakMap()),
  (S = new WeakMap()),
  (k = new WeakMap()),
  (M = new WeakMap())
class ot extends rt {
  constructor() {
    super(...arguments)
    a(this, 'onPasswordChanged')
  }
}
var P
class mt extends at {
  constructor(e, n) {
    super(e, n, ot)
    o(this, P, void 0)
    a(this, 'setDefaultValue', (e) => {
      ;(this.inputElement.value = e || ''), this.initAmisaValue(e)
    })
    a(this, 'getValidationSteps', (e) => e)
    l(this, P, lt('')),
      this.containerDiv.appendChild(i(this, P)),
      this.configuration.inputDir || (this.configuration.inputDir = 'ltr'),
      (this.inputElement.type = 'password'),
      (this.inputElement.required = !0),
      (this.inputElement.inputMode = 'text')
  }
  get password() {
    return this.amisaValue
  }
  onBeforeValueChange(e, n) {
    return !1
  }
  onValueChanged(e, n, u) {
    this.configuration.onPasswordChanged &&
      this.configuration.onPasswordChanged(n, this.amisaValue)
  }
}
P = new WeakMap()
function lt(s) {
  const t = document.createElement('style')
  return (t.textContent = s), t
}
const W = /=\s*amisa.createStyleElement\(['|"].*\.css['|"]\)/g
function gt() {
  return {
    name: 'amisa-css-plugin',
    // Name of the plugin
    transform(s, t) {
      let e
      return !t.includes('/dist/') && (e = W.exec(s)) !== null
        ? {
            code: ut(e, s, t)
          }
        : s
    }
  }
}
function ut(s, t, e) {
  const n = ht(s, e),
    u = dt(n),
    _ =
      'function AmisaStyle(amisaStyle) { const styleElemet = document.createElement("style"); styleElemet.textContent = amisaStyle;return styleElemet;}'
  return (
    t.replace(W, `= AmisaStyle(\`${u}\`);`) +
    `

` +
    _ +
    `

`
  )
}
function ht(s, t) {
  const e = s[0]
      .replace(/=\s*amisa.createStyleElement\(['|"]\.\//, '')
      .replace(/=\s*amisa.createStyleElement\(['|"]/, '')
      .replace(/["|']\)/, ''),
    n = require('path').dirname(t)
  return require('path').resolve(n, e)
}
function dt(s) {
  return require('fs').readFileSync(s).toString().replace(/\n\s*/g, ' ')
}
export {
  gt as AmisaCssTransformStylePlugin,
  mt as UserPasswordBox,
  ot as UserPasswordBoxConfig
}
